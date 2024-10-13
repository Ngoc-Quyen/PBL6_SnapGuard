import { AuthProvider } from './contexts/auth-context';
import { RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom';

import HomwGess from './pages/homes/index';
import SignIn from './pages/AuthPage/SignIn';
import { element } from 'prop-types';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomwGess />,
        children: [
            {
                path: '/sign-in',
                element: <SignIn />,
            },
        ],
    },
]);
function App() {
    return (
        <div>
            <AuthProvider>
                {/* <Routes>
                    <Route path="/" elemet={<HomwGess />}></Route>
                    <Route path="/sing-in" elemet={<SignIn />}></Route>
                </Routes> */}
                <HomwGess></HomwGess>
            </AuthProvider>
        </div>
        // <RouterProvider router={router} />
    );
}

export default App;
