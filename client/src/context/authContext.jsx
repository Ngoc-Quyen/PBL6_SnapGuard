// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [socket, setSocket] = useState(null); // State để lưu socket connection
//     const [isConnected, setIsConnected] = useState(false); // Trạng thái kết nối

//     const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
//     // Hàm register
//     const register = async (userData) => {
//         try {
//             const response = await axios.post(`${API_ENDPOINT}/auth/register`, userData);
//             setCurrentUser(response.data.user); // Cập nhật thông tin user sau khi đăng ký thành công
//             return { success: true };
//         } catch (error) {
//             console.error('Registration failed:', error);
//             return { success: false, message: error.message };
//         }
//     };
//     // Hàm Login
//     const login = async (credentials) => {
//         try {
//             const response = await axios.post(`${API_ENDPOINT}/auth/login`, credentials);
//             const user = response.data.token.user;
//             const token = response.data.token.token;
//             // Lưu thông tin user và token vào localStorage
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('token', token);
//             setCurrentUser(user);

//             // Kết nối socket khi login thành công
//             const socketConnection = io(API_ENDPOINT, {
//                 query: { userId: user.id },
//                 auth: {
//                     token: token,
//                 },
//             });
//             setSocket(socketConnection);

//             // Lắng nghe sự kiện connectSuccess
//             socketConnection.on("connectSuccess", (data) => {
//                 console.log("Server message:", data.message); // Hiển thị tin nhắn từ server
//             });

//             // Lắng nghe sự kiện connect thành công
//             socketConnection.on('connect', () => {
//                 console.log('Socket connected: ', socketConnection.id);
//                 setIsConnected(true); // Cập nhật trạng thái kết nối
//             });

//             // Lắng nghe sự kiện disconnect (khi ngắt kết nối)
//             socketConnection.on('disconnect', () => {
//                 console.log('Socket disconnected', socketConnection.id);
//                 setIsConnected(false);
//             });

//             socketConnection.on('newMessage', (message) => {
//                 console.log('New message received:', message);
//                 // Cập nhật state hoặc thực hiện các hành động khác khi nhận tin nhắn mới
//                 // Ví dụ: setMessages([...messages, message]);
//             });

//             return { success: true };
//         } catch (error) {
//             console.error('Login failed:', error);
//             return { success: false, message: error.message };
//         }
//     };

//     // hàm logout
//     const logout = async () => {
//         try {
//             const response = await axios.post(`${API_ENDPOINT}/auth/logout`);
//             console.log(response);
//             setCurrentUser(null);
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');

//             if (socket) {
//                 socket.disconnect();
//                 setSocket(null);
//             }
//             delete axios.defaults.headers.common['Authorization'];
//             setIsConnected(false); // Cập nhật trạng thái khi logout
//         } catch (error) {
//             console.error('Logout failed:', error);
//             return { success: false, message: error.message };
//         }


//     };


//     const updateAvatar = (newAvatarUrl) => {
//         setCurrentUser((prevUser) => ({
//             ...prevUser,
//             avatar_url: newAvatarUrl,
//         }));
//         localStorage.setItem('user', JSON.stringify({ ...currentUser, avatar_url: newAvatarUrl }));
//     };

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         const storedToken = localStorage.getItem('token');

//         if (storedUser && storedToken) {
//             try {
//                 // Kiểm tra dữ liệu JSON trước khi parse
//                 const parsedUser = JSON.parse(storedUser);
//                 setCurrentUser(parsedUser);

//                 // Cấu hình token nếu parse thành công
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//             } catch (error) {
//                 console.error("Invalid JSON data in localStorage for 'user':", error);
//                 localStorage.removeItem('user'); // Xóa dữ liệu lỗi khỏi localStorage
//             }
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ currentUser, register, login, logout, updateAvatar, socket, isConnected }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };



import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [socket, setSocket] = useState(null); // State để lưu socket connection
    const [isConnected, setIsConnected] = useState(false); // Trạng thái kết nối

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

            // Kết nối socket khi login thành công
            const socketConnection = io(API_ENDPOINT, {
                query: { userId: user.id },

            });
            socketConnection.connect();

            setSocket(socketConnection);

            // Lắng nghe sự kiện connectSuccess
            socketConnection.on("connectSuccess", (data) => {
                console.log("Server message:", data.message); // Hiển thị tin nhắn từ server
            });

            // Lắng nghe sự kiện connect thành công
            socketConnection.on('connect', () => {
                console.log('Socket connected: ', socketConnection.id);
                setIsConnected(true); // Cập nhật trạng thái kết nối
            });

            // Lắng nghe sự kiện disconnect (khi ngắt kết nối)
            socketConnection.on('disconnect', () => {
                console.log('Socket disconnected', socketConnection.id);
                setIsConnected(false);
            });

            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: error.message };
        }
    };

    // Hàm logout
    const logout = async () => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/logout`);
            console.log(response);
            setCurrentUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            delete axios.defaults.headers.common['Authorization'];
            setIsConnected(false); // Cập nhật trạng thái khi logout
        } catch (error) {
            console.error('Logout failed:', error);
            return { success: false, message: error.message };
        }
    };

    const updateAvatar = (newAvatarUrl) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            avatar_url: newAvatarUrl,
        }));
        localStorage.setItem('user', JSON.stringify({ ...currentUser, avatar_url: newAvatarUrl }));
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

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, updateAvatar, socket, isConnected }}>
            {children}
        </AuthContext.Provider>
    );
};