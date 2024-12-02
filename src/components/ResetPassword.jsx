import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Auth/ContextAuth";
import { Loader2 } from "lucide-react";

function Login() {
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("token");
  console.log(resetToken);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      password: password,
      password_confirmation: confirmationPassword,
      token: resetToken,
    };

    axios
      .post(`http://profit-backend.test/api/admin/auth/reset-password`, data)
      .then((response) => {
        if (response.data.success) {
          console.log("reset Successful: ", response);

          const token = response.data.data.token;
          localStorage.setItem("token", token);

          setIsAuthenticated("true");

          setPassword("");
          setConfirmationPassword("");
          const successToast = toast.success("Password Reset Successfully");
          toast.update(successToast, {
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const passError = error.response.data.message.password
            ? error.response.data.message.password[0]
            : null;

          const confirmPassError = error.response.data.message
            .password_confirmation
            ? error.response.data.message.password_confirmation[0]
            : null;

          const errorMsg =
            passError ||
            confirmPassError ||
            "Invalid Credentials, Please Enter Correct Details";
          const errorToast = toast.error(errorMsg);
          toast.update(errorToast, {
            autoClose: 1500,
          });
        } else {
          toast.error("Invalid Response, Please Try Again Later!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-white">
            New Password
          </label>
          <input
            type="password"
            required
            name="pasword"
            onChange={(e) => setPassword(e.target.value)}
            className="text-gray-500 mt-1 block w-full px-2 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-black-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            type="password"
            required
            name="password_confirmation"
            onChange={(e) => setConfirmationPassword(e.target.value)}
            className="text-gray-500 mt-1 block w-full px-2 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-black-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-800 text-md text-white py-2 mt-3 rounded-lg cursor-pointer w-full transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
