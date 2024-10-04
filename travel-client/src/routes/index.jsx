import { createBrowserRouter, redirect } from 'react-router-dom';
import AuthPage from '../pages/authPage';
import HomePage from '../pages/homePage';
import Layout from '../components/Layout';

const routes = createBrowserRouter([
    {
        path: '/auth/google',
        element: <AuthPage />,
    },
    {
        path: '/register',
        element: <AuthPage />,
    },
    {
        path: '/login',
        element: <AuthPage />,
        loader: () => {
            if (localStorage.getItem('token')) {
                return redirect('/');
            }
            return null;
        }
    },
    {
        path: '/logout',
        element: <AuthPage />,
        loader: () => {
            localStorage.removeItem('token');
            return redirect('/');
        }

    },
    {
        path: '/',
        element: <Layout />,
        loader: () => {
            if (!localStorage.getItem('token')) {
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
            {
                path: '/destination/:id/reviews/:reviewId/edit',
                element: <HomePage />,
            },
            {
                path: '/destination/:id/reviews/:reviewId/delete',
                element: <HomePage />,
            }
        ]
    }
]);

export default routes;