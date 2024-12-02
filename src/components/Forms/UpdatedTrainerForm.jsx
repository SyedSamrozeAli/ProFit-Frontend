import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UpdatedTrainerForm({
  msg,
  profileImage,
  requestType,
  URL,
  initialTrainer,
  btnText,
}) {
  const token = localStorage.getItem("token");

  //this is the state for the updated data.
  const [updatedData, setUpdatedData] = useState({});
  const [trainer, setTrainer] = useState(initialTrainer);

  useEffect(() => {
    // Set initial values on mount
    setTrainer(initialTrainer);
  }, [initialTrainer]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: requestType,
      url: URL,
      data: updatedData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        const successToast = toast.success(`Trainer ${msg} successfully`);
        toast.update(successToast, {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data && error.response.data.errors) {
          const errorList = error.response.data.errors;
          errorList.forEach((msg) => {
            console.log("Error", msg);
            toast.error(msg);
          });
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainer((prevTrainer) => ({
      ...prevTrainer,
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
            src={profileImage}
            alt="profile"
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-2 border-gray-300"
          />
          <button type="button" className="mt-4 text-blue-500">
            Upload Photo
          </button>
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="trainer_name"
                value={trainer.trainer_name || " "} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={trainer.age || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter age"
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
                value={trainer.DOB || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Contact
              </label>
              <input
                type="text"
                name="phone_number"
                value={trainer.phone_number || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter contact"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="trainer_email"
                value={trainer.trainer_email || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                value={trainer.gender || ""} // Ensure the value is updated correctly
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
                CNIC
              </label>
              <input
                type="text"
                name="CNIC"
                value={trainer.CNIC || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter CNIC"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={trainer.experience || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter experience in years"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                name="trainer_address"
                value={trainer.trainer_address || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter address"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Salary (Rs)
              </label>
              <input
                type="text"
                name="salary"
                value={trainer.salary || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter salary"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default UpdatedTrainerForm;
