import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import welcome from '../../assets/images/welcome.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, []);

    const { login, googleAuth } = useAuth();

    const handleLogin = async (values) => {
        const result = await login(values);

        if (result.success) {
            navigate('/');
        } else {
            // Nếu đăng ký thất bại, hiển thị thông báo lỗi cho người dùng
            alert(result.message || 'Login failed. Please try again.');
        }
    };
    const handleSuccess = async (credentialsResponse) => {
        try {
            const result = await googleAuth(credentialsResponse.credential);
            if (result.success) {
                navigate('/');
            } else {
                // Nếu đăng ký thất bại, hiển thị thông báo lỗi cho người dùng
                alert(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            alert(error || 'Login failed. Please try again.');
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        // password: Yup.string()
        //     .min(8, 'Password must be at least 8 characters')
        //     .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        //     .matches(/[0-9]/, 'Password must contain at least one number')
        //     .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        //     .required('Required'),
    });
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <img src={welcome} alt="img-welcome" />
                </div>
                <div className="right">
                    <h1>Đăng nhập</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleLogin(values);
                        }}
                    >
                        <Form>
                            <div class="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <Field type="email" placeholder="Email" name="email" />
                                <ErrorMessage name="email" component="div" className="errorMessage" />
                            </div>
                            <div class="input-item">
                                <i class="fa-solid fa-lock"></i>
                                <Field
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                />
                                <i
                                    class={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ml-4`}
                                    id="togglePassword"
                                    onClick={togglePasswordVisibility}
                                ></i>
                                <ErrorMessage name="password" component="div" className="errorMessage" />
                            </div>
                            <button type="submit" className="btn btnSubmit">
                                Đăng nhập
                            </button>
                            <GoogleLogin
                                className="btn btnGG"
                                onSuccess={handleSuccess}
                                onError={() => {
                                    alert('Login failed. Please try again.');
                                }}
                            >
                                <img
                                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                                    alt=""
                                    className="btnGG-img"
                                />
                                <span>Đăng nhập bằng Google</span>
                            </GoogleLogin>
                        </Form>
                    </Formik>

                    <div class="footer">
                        <p>Bạn chưa có tài khoản?</p>
                        <Link to="/register">
                            <button>Đăng kí</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
