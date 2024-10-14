// import './App.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeGuess from './pages/homes/index';
import LogIn from './pages/authPage/index';
import HomeLayout from './pages/HomeLayout';
import LoginModal from './components/LoginModal';
import NavbarUser from './components/NavbarUser';
import Dashboard from './pages/homes/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                // element: <HomeGuess />,
                element: <Dashboard />,
            },
            {
                path: 'login',
                element: <LogIn />,
            },
            {
                path: 'sign-up',
                element: <LoginModal />,
            },
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
