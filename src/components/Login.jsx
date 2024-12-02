import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/ContextAuth";
import { Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleCaptchaChange = (token) => {
    setRecaptchaToken(token); // Store the reCAPTCHA token
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password,
      recaptchaToken,
    };

    axios
      .post("http://profit-backend.test/api/admin/auth/login", data)
      .then((response) => {
        if (response.data.success) {
          console.log("Login Successful: ", response);
          const token = response.data.data.token;
          localStorage.setItem("token", token);
          setIsAuthenticated("true");

          setEmail("");
          setPassword("");
          const successToast = toast.success("Logged In Successfully");
          toast.update(successToast, { autoClose: 1000 });
          navigate("/admin/dashboard");
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
          const passError = error.response.data.message
            ? error.response.data.message[0]
            : null;

          const errorMsg =
            emailError ||
            passError ||
            "Invalid Credentials, Please Enter Correct Details";
          toast.error(errorMsg);
        } else {
          toast.error("Invalid Response, Please Try Again Later!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
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
        {/* Password Field */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="abc12345"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-gray-500 mt-1 block w-full px-2 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-black-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Forgot Password */}
        <div className="mb-5">
          <p
            className="text-white text-sm hover:text-red-600 cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
        </div>
        {/* reCAPTCHA */}
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LfKXI4qAAAAAH2j7Taq967pOmsJVOtyaHVoz6fp"
            onChange={handleCaptchaChange}
          />
        </div>
        {/* Submit Button */}
        <div className="mb-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-800 text-md text-white py-2 mt-3 rounded-lg cursor-pointer w-full transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
