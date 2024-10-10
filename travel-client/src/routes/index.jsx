import { createBrowserRouter, redirect } from 'react-router-dom';
import AuthPage from '../pages/authPage';
import HomePage from '../pages/homePage';
import Layout from '../components/Layout';

const routes = createBrowserRouter([
    {
        path: '/login',
        element: <AuthPage />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/destinations');
            }
            return null;
        }
    },
    {
        path: '/register',
        element: <AuthPage />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/destinations');
            }
            return null;
        }
    },
    {
        path: '/logout',
        element: <AuthPage />,
        loader: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            return redirect('/');
        }

    },
    {
        path: '/',
        element: <Layout />,
        loader: () => {
            if (!localStorage.getItem('access_token')) {
                return redirect('/login');
            }
            return null;
        },
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/profile',
                element: <HomePage />,
            },
            {
                path: '/create-destination',
                element: <HomePage />,
            },
            {
                path: '/update-destination/:id',
                element: <HomePage />,
            },
            {
                path: '/delete-destination/:id',
                element: <HomePage />,
            },
            {
                path: '/destination/:id',
                element: <HomePage />,
            },
            {
                path: '/destination/:id/reviews',
                element: <HomePage />,
            },
            {
                path: '/destination/:id/reviews/:reviewId',
                element: <HomePage />,
            },
        ]
    }
]);

export default routes;