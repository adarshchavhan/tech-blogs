import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { Icon } from '@iconify/react';
import ReactQuill from 'react-quill';
import { formats, modules } from '../../utils/QuillOptions';
import 'react-quill/dist/quill.snow.css';
import './AddPost.scss'
import { addPost, clearError } from '../../redux/actions/postActions';
import { useEffect } from 'react';

const validationSchema = yup.object({
    title: yup.string().min(3).max(500).required(),
    desc: yup.string().min(200).max(100000).required(),
    category: yup.string().min(3).max(100).required(),
});

const AddPost = () => {
    const initialValues = { title: '', desc: '', category: '', image: '', topics: [] }

    const { loading, message, error, categories } = useSelector(state => state.post);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTags = (e, setFieldValue, oldTopics) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.value.length > 1) {
                setFieldValue('topics', [...oldTopics, e.target.value]);
                e.target.value = '';
            }
        }
    }

    const handleRemoveTags = (i, setFieldValue, oldTopics) => {
        setFieldValue('topics', oldTopics.filter((val, index) => index !== i));
    }

    const handleImage = (e, setFieldValue) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setFieldValue('image', reader.result);
                }
            }
        }
    }

    const handleRemoveFile = (setFieldValue) => {
        setFieldValue('image', '');
    }

    const handleSubmit = async (postData) => {
        dispatch(addPost(postData));
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearError());
            navigate('/me');
        }
    }, [message])

    return (
        <div className="addpost__page">
            <div className="container">
                <h2 className="heading">Add New Post</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form>
                                <div className="content">
                                    {error && <div className='error__box'>{error}</div>}

                                    <div className="field">
                                        <span className="name">Title*</span>
                                        <Field type='text' name='title' placeholder='Title' />
                                        <span className="error__msg">
                                            <ErrorMessage name='title' />
                                        </span>
                                    </div>

                                    <div className="field quill">
                                        <span className="name">Description*</span>
                                        <ReactQuill theme="snow" placeholder='Description' modules={modules} formats={formats} onChange={e => setFieldValue('desc', e)} />
                                        <span className="error__msg">
                                            <ErrorMessage name='desc' />
                                        </span>
                                    </div>
                                </div>


                                <div className="menu">
                                    <div className="field topics">
                                        <span className="name">Topics</span>
                                        <div className="inner__container">
                                            {values.topics.map((topic, i) => (
                                                <div className="topic__item" key={i}>
                                                    <p className='text'>{topic}</p>
                                                    <span>
                                                        <button type='button' className='clear-btn' onClick={() => handleRemoveTags(i, setFieldValue, values.topics)}>×</button>
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="topic__input">
                                                <input type="text" placeholder='Add topics..' onKeyDown={e => handleAddTags(e, setFieldValue, values.topics)} />
                                            </div>
                                        </div>
                                        <span className="error__msg">
                                            <ErrorMessage name='topics' />
                                        </span>
                                    </div>

                                    <div className="field">
                                        <span className="name">Category</span>
                                        <div className="select__container">
                                            <Field as='select' name='category'>
                                                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                                            </Field>
                                            <div className="icon">
                                                <span className="down"><Icon icon="ic:baseline-arrow-drop-down" /></span>
                                                <span className="up"><Icon icon="ic:baseline-arrow-drop-up" /></span>
                                            </div>
                                        </div>
                                        <span className="error__msg">
                                            <ErrorMessage name='category' />
                                        </span>
                                    </div>

                                    <div className="field image">
                                        <input id='file__input' type='file' accept='imgae/*' onChange={e => handleImage(e, setFieldValue)} />
                                        <div className='btn__wrapper'>
                                            <label className='file__label' htmlFor='file__input' >Choose Banner Image</label>
                                            {values.image && <button type='button' className='remove__btn' onClick={() => handleRemoveFile(setFieldValue)}>Remove file</button>}
                                        </div>
                                        {values.image && <img src={values.image} />}
                                    </div>

                                    <div className="field">
                                        <button className='submit__btn' type='submit'>
                                            {loading ? <div className='loader'></div> : 'Add Post'}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    )
}

export default AddPost