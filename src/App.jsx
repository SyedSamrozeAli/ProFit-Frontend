import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import Trainer from "./pages/Trainer";
import AddTrainer from "./components/Trainers/AddTrainer";
import ErrorPage from "./components/ErrorPage";
import UpdateTrainer from "./components/Trainers/UpdateTrainer";
import Member from "./pages/Member";
import AddMember from "./components/Members/AddMember";
import { AuthProvider } from "./Auth/ContextAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateMember from "./components/Members/UpdateMember";
import AttendanceTable from "./pages/Attendance";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute element={<DashboardLayout />} />
      ),
      children: [
        {
          path: "dashboard",
          element: <div className="pink">Dashboard Content</div>,
        },
        {
          path: "members",
          element: <Member />,
        },
        {
          path: "members/addmembers",
          element: <AddMember />,
        },
        {
          path: "member/update/:id",
          element: <UpdateMember/>,
        },
        {
          path: "trainers",
          element: <Trainer />,
        },
        {
          path: "trainers/addtrainers",
          element: <AddTrainer />,
        },
        {
          path: "trainers/update/:id",
          element: <UpdateTrainer />,
        },
        {
          path: "attendance",
          element: <AttendanceTable/>,
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
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
