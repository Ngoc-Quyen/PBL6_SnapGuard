import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './style.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { useAuth } from './hooks/useAuth';
import Friends from './pages/friends/Friends';
import ChatFull from './pages/chat/ChatFull';
import ChatLeft from './pages/chat/ChatLeft';
import ChatDetail from './pages/chat/ChatDetail';
import MyProfile from './pages/profile/MyProfile';
function App() {
    const { currentUser } = useAuth();

    const { darkMode } = useContext(DarkModeContext);

    const Layout = () => {
        const location = useLocation(); // Lấy pathname hiện tại
        const isChatPage = location.pathname.startsWith('/chat');
        return (
            <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
                <Navbar />
                <div style={{ display: 'flex' }}>
                    {isChatPage ? <ChatLeft /> : <LeftBar />}
                    <div style={{ flex: 6 }}>
                        <Outlet />
                    </div>
                    {/* <RightBar /> */}
                </div>
            </div>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/profile/:id',
                    element: <Profile />,
                },
                {
                    path: '/friends',
                    element: <Friends />,
                },
                {
                    path: '/chat',
                    element: <ChatFull />,
                },
                {
                    path: '/chat/:id',
                    element: <ChatDetail />,
                },
                {
                    path: '/:id',
                    element: <MyProfile />,
                },
            ],
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
