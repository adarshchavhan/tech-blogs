import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss';
import { signup } from '../../redux/actions/userActions';

const validationSchema = yup.object({
    name: yup.string().min(3).max(100).required(),
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(100).required()
});

const Signup = () => {
  const initialValues = { name: '', username: '', email: '', password: '', avatar: '' };

  const { error, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

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
      dispatch(signup(userData));
  }

  return (
      <div className="auth__page">
          <div className="box">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ values, setFieldValue }) => {
                      return (
                          <Form>
                              <h2 className="heading">Sign Up</h2>
                              {error && <div className='error__box'>{error}</div>}

                              <div className="field">
                                  <Field type='text' name='name' placeholder='Name' />
                                  <span className="error__msg">
                                      <ErrorMessage name='name' />
                                  </span>
                              </div>

                              <div className="field">
                                  <Field type='email' name='email' placeholder='Email' />
                                  <span className="error__msg">
                                      <ErrorMessage name='email' />
                                  </span>
                              </div>

                              <div className="field">
                                  <Field type='text' name='username' placeholder='Username' />
                                  <span className="error__msg">
                                      <ErrorMessage name='username' />
                                  </span>
                              </div>
                              
                              <div className="field">
                                  <Field type='password' name='password' placeholder='Password' />
                                  <span className="error__msg">
                                      <ErrorMessage name='password' />
                                  </span>
                              </div>

                              <div className="field image">
                                  <input id='file__input' type='file' accept='imgae/*' onChange={e => handleImage(e, setFieldValue)} />
                                  <div className='btn__wrapper'>
                                      <label className='file__label' htmlFor='file__input' >Choose Avatar</label>
                                      {values.image && <button type='button' className='remove__btn' onClick={() => handleRemoveFile(setFieldValue)}>Remove file</button>}
                                  </div>
                                  {values.image && <img src={values.image} />}
                              </div>

                              <div className="field">
                                  <button className='submit__btn' type='submit'>
                                      {loading ? <div className='loader'></div> : 'Signup'}
                                  </button>
                                  <p className='redirect'>Have an account? <Link to='/login'>click here</Link></p>
                              </div>
                          </Form>
                      )
                  }}
              </Formik>
          </div>
      </div>
  )
}

export default Signup