import React, { useEffect , useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";

function TrainerForm({
  msg,
  profileImage,
  requestType,
  URL,
  trainer,
  setTrainer,
  btnText,
}) {
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    Object.keys(trainer).forEach((key) => {
      dataForm.append(key, trainer[key]);
    });
    if (selectedImage) {
      dataForm.append("trainer_profile_image", selectedImage);
    }

    axios({
      method: requestType,
      url: URL,
      data: dataForm,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  // for handling the input through forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainer((prevTrainer) => ({
      ...prevTrainer,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setSelectedImage(file);

      // Use FileReader for image preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Set the preview image as base64 data URL
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewImage("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col md:flex-row md:space-x-10">
      <div className="flex-shrink-0 mb-6 md:mb-0 text-center">
          <img
            src={previewImage || profileImage}
            alt="profile"
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-2 border-gray-300 mx-auto"
          />

          <label>Upload Profile Image</label>
          <input
            type="file"
            name="trainer_profile_image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full text-sm text-gray-500 border rounded-md"
            // required
          />
          <button type="submit" className="mt-4 text-blue-500">
            <i className="fas fa-camera"></i>
          </button>
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                required
                type="text"
                name="trainer_name"
                value={trainer.trainer_name} // Ensure the value is updated correctly
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
                type="text"
                name="salary"
                value={trainer.salary || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter salary"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Rating
              </label>
              <input
                required
                type="number"
                name="rating"
                value={trainer.rating || ""} // Ensure the value is updated correctly
                onChange={handleInputChange}
                placeholder="Enter Rating"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 mb-4">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default TrainerForm;
