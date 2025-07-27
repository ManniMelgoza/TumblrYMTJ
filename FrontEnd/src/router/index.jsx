import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import FollowsModal from '../components/FollowsModal/FollowsModal';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/profile/:userid",
        element: <ProfilePage /> 
      },
      {
        path: "/follows",
        element: <FollowsModal />
      }
    ],
  },
]);
