import Logo from "/images/profit-logo.png";
import ForgotPassword from "../components/ForgotPassword.jsx";

function ForgotPasswordPage() {
  return (
    <div
      className="relative w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: "url('../public/images/3d-gym-equipment.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-lg"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-xs sm:max-w-md flex justify-center">
          <img src={Logo} alt="ProFit logo" className="h-16 sm:h-20 mb-5" />
        </div>
        <div className="bg-black bg-opacity-20 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xs sm:max-w-md backdrop-blur-lg">
          <p className="w-full flex flex-wrap justify-center text-white pb-7 text-sm sm:text-md">
            Forgot Password
          </p>
          <ForgotPassword />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
