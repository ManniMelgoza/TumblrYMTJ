import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import Layout from './Layout';
import PostDetailPage from "../components/PostDetailPage/PostDetailPage";
import TestLike from "../components/LikeButton/TestLike";
import PostFormModal from '../components/PostFormModal/PostFormModal';

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
        path: "test-like",
        element: <TestLike />,
      }, //added by tj just to test like functionality. can be removed or commented out later
      {
        path: "/posts/:postId",
        element: <PostDetailPage />
      },
      {
        path: "/create",
        element: <PostFormModal />
      },
      // Test for profile page
      {
        path: "/profile",
        element: <PostDetailPage />
      }

    ],
  },
]);
