import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../NavBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ChevronLeft } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function MemberLayout() {
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // For navigation
  const { id } = useParams(); // Get member ID from the URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`http://profit-backend.test/api/member/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status === false) {
            setError(true);
          } else {
            setMemberData(response.data.data);
          }
          setLoading(false);
          setLoadingProgress(100);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          toast.error("Error fetching the Member details.");
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [id, token]);

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
    navigate("/admin/members");
  };

  const handleDeleteField = (id) => {
    const deleteMember = () => {
      axios
        .delete(`http://profit-backend.test/api/member/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Member deleted successfully.");
          navigate("/admin/members"); // Redirect to trainers page
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting the member.");
        });
    };

    // Show the custom confirmation dialog
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this member?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteMember(),
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
      <NavBar title="Manage Members" />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={loadingProgress}
              text={`${loadingProgress}%`}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#ff0000",
                trailColor: "#ffffff",
              })}
            />
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <p>Error loading member data.</p>
        </div>
      ) : (
        <div className="max-w-full mx-6 bg-white min-h-screen">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b">
            <button onClick={handleBackClick} className="text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium">Member Profile</h1>
            <div className="ml-auto flex gap-2">
              <button
                className="p-2 bg-red-500 rounded-md"
                onClick={() => handleDeleteField(memberData.member_id)}
              >
                <span className="sr-only">Delete</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trash"
                  color="white"
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
              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={`http://profit-backend.test/images/member/${memberData.profile_image}`}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h2 className="text-2xl font-semibold">
                  {memberData.member_name}
                </h2>
              </div>
              <div className="hidden sm:block w-px h-20 bg-gray-200 mx-2"></div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-center sm:text-left">
                <div>
                  <div className="text-sm text-gray-500">Member ID:</div>
                  <div>{memberData.member_id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email:</div>
                  <div className="break-all">{memberData.member_email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Admission Date:</div>
                  <div>{formatDate(memberData.addmission_date)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact:</div>
                  <div>{memberData.phone_number}</div>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-sm text-gray-500">Age:</div>
                <div>{memberData.age}</div>
                <div className="mt-6">
                  <span
                    className={`px-2 py-1 text-sm rounded font-semibold ${
                      memberData.member_status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {memberData.member_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="p-4 sm:p-6 space-y-6 md:space-y-0 md:flex md:gap-6 border-b">
            {/* Body Metrics */}
            <section className="md:w-1/2 border-r">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Body Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Height (Ft)</div>
                  <div>{memberData.height}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Body Mass Index</div>
                  <div>{memberData.BMI}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Weight (Kg)</div>
                  <div>{memberData.weight}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Health Issues</div>
                  <div>{memberData.health_issues}</div>
                </div>
              </div>
            </section>

            {/* Personal Information */}
            <section className="md:w-1/2 ">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Gender</div>
                  <div>{memberData.gender}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date of Birth</div>
                  <div>{memberData.DOB}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">NIC</div>
                  <div>{memberData.CNIC}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div>{memberData.member_address}</div>
                </div>
              </div>
            </section>
          </div>

          {/* Membership Information */}
          <div className="p-4 sm:p-6">
            <section>
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Membership Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Membership ID</div>
                  <div>{memberData.member_id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Membership Type:</div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded ${
                        memberData.membership_type === "Standard"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {memberData.membership_type.charAt(0).toUpperCase() +
                        memberData.membership_type.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Trainer</div>
                  <div>
                    {memberData.trainer_name == null
                      ? "Not Applicable"
                      : memberData.trainer_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div>{memberData.price}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Start Date:</div>
                  <div>{formatDate(memberData.start_date)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">End Date:</div>
                  <div>{formatDate(memberData.end_date)}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberLayout;
