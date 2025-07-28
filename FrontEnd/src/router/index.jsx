import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import Layout from './Layout';
import PostDetailPage from "../components/PostDetailPage/PostDetailPage";
import TestLike from "../components/LikeButton/TestLike";
import PostFormModal from '../components/PostFormModal/PostFormModal';
import EditPostModal from '../components/EditPostModal/EditPostModal';
// import OwnerPostPage from '../components/OwnerPostPage/OwnerPostPage';

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
      {
        path: "/profile/:userId",
        element: <ProfilePage />
      },
      {
        path: "/:postId/edit",
        element: <EditPostModal />
      }
    ],
  },
]);
