import { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import UpdatePassword from '../../components/UpdatePassword/UpdatePassword'
import './EditProfile.scss'
import { loadUser, updateUser } from '../../redux/actions/userActions';

const validationSchema = yup.object({
  name: yup.string().min(3).max(100).required(),
  username: yup.string().min(3).max(100).required(),
  email: yup.string().email().required(),
  desc: yup.string().min(150).required(),
});

const EditProfile = () => {
  const [initialValues, setIntitalValues] = useState({
    name: '', username: '', email: '', avatar: '', desc: '', social: {
      linkedIn: '',
      twitter: '',
      instagram: ''
    }
  });

  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const { loading, error, currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    setShowUpdatePassword(!showUpdatePassword)
  }

  const handleImage = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFieldValue('avatar', reader.result);
        }
      }
    }
  }

  const handleRemoveFile = (setFieldValue) => {
    setFieldValue('avatar', '');
  }

  const handleSubmit = async (userData) => {
    dispatch(updateUser(userData));
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { name, username, email, avatar, desc, social } = currentUser;
      setIntitalValues({
        name: name ? name : '',
        username: username ? username : '',
        email: email ? email : '',
        avatar: avatar?.secure_url ? avatar.secure_url : '',
        desc: desc ? desc : '',
        social: {
          linkedIn: social?.linkedIn ? social.linkedIn : '',
          twitter: social?.twitter ? social.twitter : '',
          instagram: social?.instagram ? social.instagram : ''
        }
      });
    }

    fetchUser();
  }, [])

  return (
    <div className="editprofile__page">
      <div className="container">
        <h2 className="heading">Edit Profile</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <div className="content">
                  {error && <div className='error__box'>{error}</div>}

                  <div className="field">
                    <span className="name">Name*</span>
                    <Field type='text' name='name' placeholder='Name' />
                    <span className="error__msg">
                      <ErrorMessage name='name' />
                    </span>
                  </div>

                  <div className="field">
                    <span className="name">Email*</span>
                    <Field type='email' name='email' placeholder='Email' />
                    <span className="error__msg">
                      <ErrorMessage name='email' />
                    </span>
                  </div>

                  <div className="field">
                    <span className="name">Username*</span>
                    <Field type='text' name='username' placeholder='Username' />
                    <span className="error__msg">
                      <ErrorMessage name='username' />
                    </span>
                  </div>

                  <div className="field">
                    <span className="name">Description*</span>
                    <Field rows={8} as='textarea' name='desc' placeholder='brief about yourself' />
                    <span className="error__msg">
                      <ErrorMessage name='desc' />
                    </span>
                  </div>


                </div>


                <div className="menu">
                  <h3 className="sub__heading">Social Accounts</h3>
                  <div className="field">
                    <span className="name">LinkedIn</span>
                    <Field type='text' name='social.linkedIn' placeholder='LinkedIn' />
                    <span className="error__msg">
                      <ErrorMessage name='social.linkedIn' />
                    </span>
                  </div>

                  <div className="field">
                    <span className="name">Twitter</span>
                    <Field type='text' name='social.twitter' placeholder='Twitter' />
                    <span className="error__msg">
                      <ErrorMessage name='social.twitter' />
                    </span>
                  </div>

                  <div className="field">
                    <span className="name">Instagram</span>
                    <Field type='text' name='social.instagram' placeholder='Instagram' />
                    <span className="error__msg">
                      <ErrorMessage name='social.instagram' />
                    </span>
                  </div>

                  <div className="field image">
                    <input id='file__input' type='file' accept='imgae/*' onChange={e => handleImage(e, setFieldValue)} />
                    <div className='btn__wrapper'>
                      <label className='file__label' htmlFor='file__input' >Choose Avatar</label>
                      {values.avatar && <button type='button' className='remove__btn' onClick={() => handleRemoveFile(setFieldValue)}>Remove file</button>}
                    </div>
                    {values.avatar && <img src={values.avatar} />}
                  </div>

                  <div className="field">
                    <button className='submit__btn' type='submit'>
                      {loading ? <div className='loader'></div> : 'Edit Profile'}
                    </button>
                    <p className='redirect'>Update password? <button type='button' onClick={handleUpdatePassword}>click here</button></p>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>

      {showUpdatePassword && <UpdatePassword {...{ handleUpdatePassword }} />}
    </div>
  )
}

export default EditProfile