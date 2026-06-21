import React from 'react'
import { RouterContextProvider, RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

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
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App