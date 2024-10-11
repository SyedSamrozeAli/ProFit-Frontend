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
      path: '/admin',
      element: <DashboardLayout/>,
      children:[
        {
          path:"dashboard",
          element:<div className='pink'>Dashboard Content</div>
        },
        {
          path:"members",
          element:<div>hellsbdnsadnmsao</div>
        },
        {
          path:"trainers",
          element:<div>hesdsadlsallo</div>
        },
        {
          path:"attendance",
          element:<div>headssadasllo</div>
        },
        {
          path:"inventory",
          element:<div>helasdasdaslo</div>
        },
        {
          path:"finance",
          element:<div>helladsadao</div>
        },
        {
          path:"settings",
          element:<div>hellocdafda</div>
        }
      ]
    }
  ])
  return (
    <>
      
      
      <RouterProvider router={router} />
    </>
  )
}

export default App
