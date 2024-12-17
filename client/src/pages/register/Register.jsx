import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './register.scss';
import welcome from '../../assets/images/welcome.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Register = () => {
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(4, 'Must have 4 or more characters').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        full_name: Yup.string().required('Required'),
    });
    const navigate = useNavigate();
    const { register } = useAuth();
    const handleRegister = async (values) => {
        try {
            const result = await register(values); // Đợi hàm register hoàn thành
            if (result.success) {
                navigate('/login'); // Chuyển đến trang login nếu đăng ký thành công
            } else {
                // Nếu đăng ký thất bại, hiển thị thông báo lỗi cho người dùng
                alert(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            // Xử lý lỗi bất ngờ
            console.error('Unexpected error during registration:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <img src={welcome} alt="img-welcome" />
                    <p>
                        Mạng xã hội đã trở thành một phần không thể thiếu trong cuộc sống hiện đại, nơi mọi người kết
                        nối, chia sẻ và tương tác với nhau một cách dễ dàng và nhanh chóng.
                    </p>
                    <div className="question-login">
                        <span>Bạn đã có tài khoản?</span>
                        <Link to="/login">
                            <button>Đăng nhập</button>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <h1>Đăng kí</h1>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            full_name: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Xóa confirmPassword trước khi gửi
                            const { confirmPassword, ...filteredValues } = values;
                            console.log('Form values without confirmPassword:', filteredValues);
                            handleRegister(filteredValues);
                        }}
                    >
                        <Form>
                            <div class="input-item">
                                <i class="fa-solid fa-user"></i>
                                <Field type="text" placeholder="Username" name="username"></Field>
                                <ErrorMessage name="username" component="div" className="errorMessage" />
                            </div>
                            <div class="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <Field type="email" placeholder="Email" name="email" />
                                <ErrorMessage name="email" component="div" className="errorMessage" />
                            </div>
                            <div class="input-item">
                                <i class="fa-solid fa-lock"></i>
                                <Field
                                    type={showPasswords.password ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                />
                                <i
                                    class={`fa-regular ${showPasswords.password ? 'fa-eye-slash' : 'fa-eye'} ml-4`}
                                    id="togglePassword"
                                    onClick={() => togglePasswordVisibility('password')}
                                ></i>
                                <ErrorMessage name="password" component="div" className="errorMessage" />
                            </div>
                            <div class="input-item">
                                <i class="fa-solid fa-lock"></i>
                                <Field
                                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                                    placeholder="Comfirm Password"
                                    name="confirmPassword"
                                />
                                <i
                                    class={`fa-regular ${
                                        showPasswords.confirmPassword ? 'fa-eye-slash' : 'fa-eye'
                                    } ml-4`}
                                    id="togglePassword"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                ></i>
                                <ErrorMessage name="confirmPassword" component="div" className="errorMessage" />
                            </div>
                            <div class="input-item">
                                <i class="fa-solid fa-user-tag"></i>
                                <Field type="text" placeholder="Name" name="full_name" />
                                <ErrorMessage name="full_name" component="div" className="errorMessage" />
                            </div>
                            <button type="submit" className="btnSubmit">
                                Đăng kí
                            </button>
                            <div className="btn btnGG">
                                <img
                                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                                    alt=""
                                    className="btnGG-img"
                                />
                                <span>Đăng kí bằng Google</span>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;
