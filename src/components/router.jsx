import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Sigin from './Pages/Sigin';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        //  404 page component renders here
        errorElement: <h1>Error</h1>,
        children: [
            // home page renders here
            {
                path: '/',
                element: <Home />,
            },
            // login page renders here
            {
                path: '/signin',
                element: <Sigin />
            },
            // register page renders here
            {
                path: '/signup',
                element: <Signup />
            },
            // dashboard renders here
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    }
]);

export default router;