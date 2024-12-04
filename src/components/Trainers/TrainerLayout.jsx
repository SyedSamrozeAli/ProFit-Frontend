import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../NavBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ChevronLeft, Pencil, Star, Loader2 } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function TrainerLayout() {
  const [trainerData, setTrainerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(false);

  const { id } = useParams(); // Get trainer ID from the URL
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // For navigation

  // Fetch the trainer data once when the component mounts
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`http://profit-backend.test/api/trainer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status === false) {
            console.log("status error");
          } else {
            setTrainerData(response.data.data);
            console.log(response.data.data);
          }
          setLoading(false);
          setLoadingProgress(100);
        })
        .catch((error) => {
          console.log(error.response);

          // Set error state to true and handle unauthorized error (401)
          setError(true);
          setLoading(false);
          setLoadingProgress(0); // Reset progress on error

          if (error.response && error.response.data.status_code === 404) {
            setError(false);
          } else if (error.response?.status === 401) {
            toast.error("Unauthorized access. Please log in again.");
          } else {
            console.log(error);
            toast.error("Error fetching the Trainer details.");
          }
        });
    } else {
      // No token found
      setError(true);
      setLoading(false);
    }
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name
    const year = date.getFullYear();

    // Determine the ordinal suffix
    const ordinal = (n) =>
      n + (["st", "nd", "rd"][(n % 10) - 1] || "th").replace(/1[123]th/, "th");

    return `${ordinal(day)}-${month}-${year}`;
  }

  const handleBackClick = () => {
    navigate("/admin/trainers"); // Navigate to the desired URL
  };

  const handleDeleteField = (id) => {
    const deleteTrainer = () => {
      axios
        .delete(`http://profit-backend.test/api/trainer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Trainer deleted successfully.");
          navigate("/admin/trainers"); // Redirect to trainers page
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting the trainer.");
        });
    };

    // Show the custom confirmation dialog
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this trainer?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTrainer(),
          className:
            "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all",
        },
        {
          label: "No",
          onClick: () => {}, // Optional action for "No"
          className:
            "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-all",
        },
      ],
      overlayClassName:
        "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center", // Overlay styling
      customUI: ({ title, message, buttons, onClose }) => (
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="mt-4 text-gray-600">{message}</p>
          <div className="mt-6 flex justify-end space-x-4">
            {buttons.map((button, idx) => (
              <button
                key={idx}
                className={button.className}
                onClick={() => {
                  button.onClick();
                  onClose(); // Ensure the modal closes on button click
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      <NavBar title="Manage Trainers" />
      {loading ? (
        // Loading state with progress bar
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
        </div>
      ) : (
        // If not loading and no error occurred, render data or show "No trainer found"
        !error &&
        (trainerData?.trainer_name ? (
          // Render trainer details
          <div className="max-w-full mx-16 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b">
              <button onClick={handleBackClick} className="text-gray-600">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-medium">Trainer Profile</h1>
              <div className="ml-auto flex gap-2">
                <button
                  className="p-2 bg-red-500 rounded-md"
                  onClick={() => handleDeleteField(trainerData.trainer_id)}
                >
                  <span className="sr-only">Delete</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="relative">
                  <img
                    src={`http://profit-backend.test/images/trainer/${trainerData.trainer_profile_image}`}
                    alt="Trainer Profile"
                    width={160}
                    height={160}
                    className="rounded-md"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-center sm:text-left">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-semibold">
                      {trainerData.trainer_name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="break-all font-semibold">
                      {trainerData.trainer_email}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Trainer ID</div>
                    <div className="font-semibold">
                      {trainerData.trainer_id}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">
                      Availability
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 text-sm font-semibold ${
                          trainerData.status === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {trainerData.status === 1
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-sm text-gray-500">Age</div>
                  <div className="font-semibold">{trainerData.age}</div>
                  <div className="text-sm text-gray-500 ml-2 mt-8">Rating</div>
                  <div className="mt-1 flex items-center justify-center sm:justify-end">
                    <div className="flex">
                      {[1, 2, 3, 4].map((_, index) => (
                        <Star
                          key={index}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="p-4 sm:p-6">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-600">
                    Professional Information
                  </h2>
                  <button>
                    <Pencil className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="font-semibold">
                      {trainerData.gender || "N/A"}
                    </div>
                  </div>

                  {/* NIC */}
                  <div>
                    <div className="text-sm text-gray-500">NIC</div>
                    <div className="font-semibold">
                      {trainerData.CNIC || "N/A"}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="text-sm text-gray-500">Experience</div>
                    <div className="font-semibold">
                      {trainerData.experience || "N/A"} Years
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <div className="text-sm text-gray-500">Salary</div>
                    <div className="font-semibold">
                      {trainerData.salary || "N/A"}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold">
                      {trainerData.phone_number || "N/A"}
                    </div>
                  </div>

                  {/* Hire Date */}
                  <div>
                    <div className="text-sm text-gray-500">Hire Date</div>
                    <div className="font-semibold">
                      {trainerData.hire_date
                        ? formatDate(trainerData.hire_date)
                        : "N/A"}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <div className="text-sm text-gray-500">Date of Birth</div>
                    <div className="font-semibold">
                      {trainerData.DOB ? formatDate(trainerData.DOB) : "N/A"}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="text-sm font-semibold">
                      {trainerData.trainer_address || "N/A"}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center text-lg font-medium text-gray-600">
            No trainer found.
          </div>
        ))
      )}
    </>
  );
}

export default TrainerLayout;
