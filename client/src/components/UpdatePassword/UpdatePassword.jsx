import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import './UpdatePassword.scss'
import { updatePassword } from '../../redux/actions/userActions';

const validationSchema = yup.object({
  newPassword: yup.string().min(8).max(100).required(),
  oldPassword: yup.string().min(8).max(100).required()
});

const UpdatePassword = ({ handleUpdatePassword }) => {
  const initialValues = { newPassword: '', oldPassword: '' };

  const { error, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (passwordData) => {
    dispatch(updatePassword(passwordData));
  }

  return (
    <div className="update__password">
      <div className="backdrop" onClick={handleUpdatePassword}></div>
      <div className="model">
        <div className="top"><h2 className="heading">Update Password</h2><button onClick={handleUpdatePassword}>×</button></div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            {error && <div className='error__box'>{error}</div>}

            <div className="field">
              <Field type='password' name='newPassword' placeholder='New Password' />
              <span className="error__msg">
                <ErrorMessage name='newPassword' />
              </span>
            </div>

            <div className="field">
              <Field type='password' name='oldPassword' placeholder='Old Password' />
              <span className="error__msg">
                <ErrorMessage name='oldPassword' />
              </span>
            </div>

            <div className="field">
              <button className='submit__btn' type='submit'>
                {loading ? <div className='loader'></div> : 'Update Password'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default UpdatePassword