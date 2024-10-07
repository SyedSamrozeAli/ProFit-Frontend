import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './Layout/DashboardLayout'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/user',
      element: <DashboardLayout />,
      // children:[
      //   {
      //     path:"/dashboard"
      //   }
      // ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
