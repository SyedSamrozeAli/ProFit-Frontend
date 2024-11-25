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
import Attendance from "./pages/Attendance";
import Inventory from "./pages/Inventory";
import AddInventory from "./components/Inventory/AddInventory";
import UpdateInventory from "./components/Inventory/UpdateInventory";
import Equipment from "./pages/Equipment";
import TrainerAttendance from "./pages/TrainerAttendance";
import MemberLayout from "./components/Members/MemberLayout";
import TrainerLayout from "./components/Trainers/TrainerLayout";
import MemberPayments from "./pages/MemberPayments";
import TrainerPayments from "./pages/TrainerPayments";
import MemberPaymentUpdate from "./components/Members/MemberPaymentUpdate";
import TrainerPaymentUpdate from "./components/Trainers/TrainerPaymentUpdate";
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

        //routes for members
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
          path:"member/details/:id",
          element:<MemberLayout />
        },
        {
          path:"member/payments",
          element:<MemberPayments />
        },
        {
          path:"member/paymentUpdate",
          element:<MemberPaymentUpdate />
        },

        //routes for trainers
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
          path:"trainer/details/:id",
          element:<TrainerLayout />
        },
        {
          path:"trainer/payments",
          element:<TrainerPayments/>
        },
        {  
          path:"trainer/trainer-payment-Update",
          element:<TrainerPaymentUpdate />
        },

        //attendance routes
        {
          path: "attendance",
          element: <Attendance/>,
        },
        {
          path:"trainerattendance",
          element:<TrainerAttendance />
        },

        //inventory routes
        {
          path: "inventory",
          element: <Inventory/>,
        },
        {
          path:"inventory/addinventory",
          element:<AddInventory/>
        },
        {
          path:"inventory/update/:id",
          element:<UpdateInventory />
        },

        //equipment routes
        {
          path: "equipment",
          element: <Equipment/>,
        },
        // {
        //   path: "finance",
        //   element: <div>helladsadao</div>,
        // },
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
