import { createBrowserRouter } from "react-router";
import Layout from "../layouts/layout";
import ErrorsPage from "../../pages/error/errors-page";
import HomePage from "../../pages/home/home-page";
import RegisterPage from "../../pages/register/register-page";
import LoginPage from "../../pages/login/login-page";
import SpacesDetailsPage from "../../pages/spaces/spaces-detail-page";
import SpacesPage from "../../pages/spaces/spaces-page";
import ProfilePage from "../../pages/profile/profile-page";
import MyBookingsPage from "../../pages/bookings/my-bookings-page";
import ManageBoookingsPage from "../../pages/bookings/manage-boolings-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorsPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/spaces/:id",
        element: <SpacesDetailsPage />,
      },
      {
        path: "/spaces",
        element: <SpacesPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/my-bookings",
        element: <MyBookingsPage />,
      },
      {
        path: "/manage-bookings",
        element: <ManageBoookingsPage />,
      },
    ],
  },
]);

export default router;
