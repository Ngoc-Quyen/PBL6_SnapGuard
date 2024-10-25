import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    // Hàm register
    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, userData);
            setCurrentUser(response.data.user); // Cập nhật thông tin user sau khi đăng ký thành công
            return { success: true };
        } catch (error) {
            console.error('Registration failed:', error);
            return { success: false, message: error.message };
        }
    };
    // Hàm Login
    const login = async (credentials) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, credentials);
            const user = response.data.token.user;
            const token = response.data.token.token;
            // Lưu thông tin user và token vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            setCurrentUser(user);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: error.message };
        }
    };

    // hàm logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Nếu cần, xóa token trong header của axios
        delete axios.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                // Kiểm tra dữ liệu JSON trước khi parse
                const parsedUser = JSON.parse(storedUser);
                setCurrentUser(parsedUser);

                // Cấu hình token nếu parse thành công
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } catch (error) {
                console.error("Invalid JSON data in localStorage for 'user':", error);
                localStorage.removeItem('user'); // Xóa dữ liệu lỗi khỏi localStorage
            }
        }
    }, []);

    return <AuthContext.Provider value={{ currentUser, register, login, logout }}>{children}</AuthContext.Provider>;
};
