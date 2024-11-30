import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/ContextAuth";
import { Loader2 } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
    };

    axios
      .post(
        "http://profit-backend.test/api/admin/auth/forgott-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          console.log("Email sent Successful: ", response);

          const token = response.data.data.token;
          localStorage.setItem("token", token);

          setIsAuthenticated("true");

          setEmail("");
          const successToast = toast.success("Email sent successfully");
          toast.update(successToast, {
            autoClose: 1500,
          });

          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const emailError = error.response.data.message.email
            ? error.response.data.message.email[0]
            : null;

          const errorMsg =
            emailError || "Invalid Credentials, Please Enter Correct Details";
          toast.error(errorMsg);
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
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            placeholder="abc@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              "Request Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
