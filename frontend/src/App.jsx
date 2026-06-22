import React from 'react'
import { RouterContextProvider, RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import UserDashboard from './pages/UserDashboard'
import UserProfile from './pages/UserProfile'
import UserPayment from './pages/UserPayment'
import { ToastContainer } from 'react-toastify'
import UserTransaction from './pages/UserTransaction'

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
      path: "/userProfile",
      element: <UserProfile />
    },
    {
      path: "/userPayment",
      element: <UserPayment />
    },
    {
      path: "/UserTransaction",
      element: <UserTransaction />
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