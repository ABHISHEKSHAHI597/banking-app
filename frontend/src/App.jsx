import React from 'react'
import { RouterContextProvider, RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import UserProfile from './pages/UserProfile'
import UserPayment from './pages/UserPayment'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/userDashboard",
      element: <UserDashboard />
    },
    {
      path: "/adminDashboard",
      element: <AdminDashboard />
    },
    {
      path: "/userProfile",
      element: <UserProfile />
    },
    {
      path: "/userPayment",
      element: <UserPayment />
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  )
}

export default App