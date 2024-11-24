import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import welcome from '../../assets/images/welcome.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate('/')
        }
    }, []);

    const { login } = useAuth();
    const users = [
        { email: 'ngocquyenmon262@gmail.com', password: 'Tr@nngocquyen262' },
        { email: 'tranngocquyen262dc@gmail.com', password: 'Tr@nngocquyen262' },
    ];
    // Hàm Login
    const testLogin = (credentials) => {
        const { email, password } = credentials;
        const user = users.find((u) => u.email === email && u.password === password);
        const defaultProfilePic = 'https://i.pinimg.com/736x/63/50/95/635095b2a3c65527fffe9432c1d45363.jpg';
        const name = 'Ngọc Quyên';
        if (user) {
            const userWithProfilePic = {
                ...user,
                profilePic: defaultProfilePic,
                name: name,
            };
            // Nếu đăng nhập thành công, lưu thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(userWithProfilePic));
            localStorage.setItem('token', 'mocked-token'); // Tạo một token giả
            setUser(userWithProfilePic);
            console.log('Login successful:', userWithProfilePic);
            navigate('/');
            setItemWithExpiry('user', userWithProfilePic);
        } else {
            console.error('Login failed: Invalid username or password');
        }
    };
    // Hàm giả lập setUser (có thể là một hook hoặc một phương thức trong state)
    const setUser = (user) => {
        // Thực hiện các hành động khi đăng nhập thành công, ví dụ: cập nhật state
        console.log('User set:', user);
    };

    const handleLogin = async (values) => {
        const result = await login(values);

        if (result.success) {
            navigate('/');
        } else {
            // Nếu đăng ký thất bại, hiển thị thông báo lỗi cho người dùng
            alert(result.message || 'Login failed. Please try again.');
        }
    };
    const handleCheckUser = () => {
        const storedUser = getItemWithExpiry('user');
        if (storedUser) {
            console.log('User is logged in:', storedUser);
        } else {
            console.log('No user logged in or session expired');
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
                            <button type="submit">Đăng nhập</button>
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
