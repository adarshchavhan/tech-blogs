import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss';
import { login } from '../../redux/actions/userActions';
import { useEffect } from 'react';

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(100).required()
});

const Login = () => {
    const initialValues = { email: '', password: '' };

    const { error, loading, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (userData) => {
      dispatch(login(userData));
    }

    useEffect(()=>{
        if(message){
          navigate('/');
        }
    },[message])

    return (
        <div className="auth__page">
            <div className="box">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <h2 className="heading">Log In</h2>
                        {error && <div className='error__box'>{error}</div>}

                        <div className="field">
                            <Field type='email' name='email' placeholder='Email' />
                            <span className="error__msg">
                                <ErrorMessage name='email' />
                            </span>
                        </div>
                        
                        <div className="field">
                            <Field type='password' name='password' placeholder='Password' />
                            <span className="error__msg">
                                <ErrorMessage name='password' />
                            </span>
                        </div>
                        
                        <div className="field">
                            <button className='submit__btn' type='submit'>
                                {loading ? <div className='loader'></div> : 'Login'}
                            </button>
                            <p className='redirect'>Don't have an account? <Link to='/signup'>click here</Link></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login