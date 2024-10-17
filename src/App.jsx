import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import Trainer from "./pages/Trainer";
import AddTrainer from "./components/AddTrainer";
import ErrorPage from "./components/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <div className="pink">Dashboard Content</div>,
        },
        {
          path: "members",
          element: <div>headssadasllo</div>,
        },
        {
          path: "trainers",
          element: <Trainer />,
          // children:[
          //   {
          //     path:"addtrainers",
          //     element:<div className="bg-black">heelo</div>
          //   }
          // ]
        },
        {
          path: "trainers/addtrainers",
          element:<AddTrainer />
        },
        {
          path: "attendance",
          element: <div>headssadasllo</div>,
        },
        {
          path: "inventory",
          element: <div>helasdasdaslo</div>,
        },
        {
          path: "finance",
          element: <div>helladsadao</div>,
        },
        {
          path: "settings",
          element: <div>hellocdafda</div>,
        },
      ],
    },
    {
      path:"*",
      element:<ErrorPage />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
