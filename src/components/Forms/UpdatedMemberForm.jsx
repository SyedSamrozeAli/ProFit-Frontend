import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UpdatedMemberForm({ msg, requestType, URL, initialMember, btnText }) {
  const token = localStorage.getItem("token");

  // This is the state for the updated data.
  const [updatedData, setUpdatedData] = useState({});
  const [member, setMember] = useState(initialMember);

  useEffect(() => {
    // Set initial values on mount
    setMember(initialMember);
  }, [initialMember]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //we will always send the height and weight as backend has to receive it if or not its updated .
    const dataToSend = {
      ...updatedData,
      weight: member.weight || updatedData.weight,
      height: member.height || updatedData.height,
      membership_duration:
        updatedData.membership_duration || member.membership_duration,
      membership_type: updatedData.membership_type || member.membership_type,
      trainer_id: updatedData.trainer_id || member.trainer_id,
      profile_image: updatedData.profile_image || member.profile_image,
    };

    axios({
      method: requestType,
      url: URL,
      data: dataToSend, // Send the form data with the image
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        const successToast = toast.success(`${msg} successfully`);
        toast.update(successToast, {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        if (error.response.data.message) {
          for (let field in error.response.data.message) {
            const errorMessages = error.response.data.message[field];
            console.log(errorMessages);
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => {
                toast.error(msg);
              });
            } else {
              toast.error(errorMessages);
            }
          }
        }
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
    // Update only changed fields
    setUpdatedData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={`http://profit-backend.test/images/member/${member.profile_image}`}
            alt="profile"
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-2 border-gray-300"
          />
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="member_name"
                value={member.member_name || ""}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Contact Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={member.phone_number || ""}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                value={member.DOB || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                value={member.gender || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="Other">other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="member_email"
                value={member.member_email || ""}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                MemberShip Type
              </label>
              <select
                name="membership_type"
                value={member.membership_type || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option>Select membership</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Membership Start Date
              </label>
              <input
                type="date"
                name="addmission_date"
                onChange={handleInputChange}
                value={member.addmission_date?.split(" ")[0] || ""}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Duration
              </label>
              <select
                name="membership_duration"
                value={member.membership_duration}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option>Select Duration</option>
                <option>3</option>
                <option>6</option>
                <option>12</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                CNIC
              </label>
              <input
                type="text"
                name="CNIC"
                value={member.CNIC || ""}
                onChange={handleInputChange}
                placeholder="Enter CNIC"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Health Issues (if any)
              </label>
              <input
                type="text"
                name="health_issues"
                value={member.health_issues || ""}
                onChange={handleInputChange}
                placeholder="Enter health issues"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Enter weight"
                value={member.weight || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Trainer (if any)
              </label>
              <input
                type="number"
                name="trainer_id"
                placeholder="Enter Trainer ID"
                value={member.trainer_id || ""}
                onChange={handleInputChange}
                disabled={member.membership_type === "Standard"}
                className={`mt-1 p-2 w-full border rounded-md ${
                  member.membership_type === "Standard"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                placeholder="Enter height"
                value={member.height || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default UpdatedMemberForm;
