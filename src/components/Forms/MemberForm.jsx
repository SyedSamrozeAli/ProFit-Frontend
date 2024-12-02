import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

function MemberForm({
  msg,
  profileImage,
  requestType,
  URL,
  member,
  setMember,
  btnText,
}) {
  //getting the login token
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    const dataForm = new FormData();
    Object.keys(member).forEach((key) => {
      dataForm.append(key, member[key]);
    });
    if (selectedImage) {
      dataForm.append("profile_image", selectedImage);
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
        const successToast = toast.success(`Member ${msg} successfully`);
        toast.update(successToast, {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        if (error.response.data.message) {
          console.log("heelo");
          console.log(typeof error.response.data.message);

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
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  //handling form submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
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
    <form onSubmit={handleFormSubmit} className="space-y-6">
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
            name="profile_image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full text-sm text-gray-500 border rounded-md"
            required
          />
          <button type="submit" className="mt-4 text-blue-500">
            <i className="fas fa-camera"></i>
          </button>
        </div>

        <div className="flex-grow grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={member.name || " "}
                onChange={handleInputChange}
                placeholder="Enter Full Name"
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
                value={member.phone_number || " "}
                onChange={handleInputChange}
                placeholder="Enter contact"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                required
                type="date"
                name="DOB"
                onChange={handleInputChange}
                value={member.DOB}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                value={member.gender}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option>Select gender</option>
                <option>male</option>
                <option>female</option>
                <option>other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Membership Type
              </label>
              <select
                name="membership_type"
                value={member.membership_type}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option>Select membership</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                required
                type="email"
                name="member_email"
                value={member.member_email || " "}
                placeholder="Enter email"
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Membership Start Date
              </label>
              <input
                required
                type="date"
                name="addmission_date"
                onChange={handleInputChange}
                value={member.addmission_date || " "}
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
                required
                type="text"
                name="CNIC"
                value={member.CNIC || " "}
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
                required
                type="text"
                name="health_issues"
                value={member.health_issues || " "}
                placeholder="Enter health issues"
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Weight (kg)
              </label>
              <input
                required
                type="number"
                name="weight"
                placeholder="Enter weight"
                value={member.weight || " "}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Trainer (if any)
              </label>
              <input
                required
                type="number"
                name="trainer_id"
                placeholder="Enter Trainer ID"
                value={member.trainer_id || " "}
                onChange={handleInputChange}
                disabled={member.membership_type === "Standard"}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Height (ft)
              </label>
              <input
                required
                type="number"
                name="height"
                placeholder="Enter Height"
                value={member.height || " "}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                value={member.address || ""}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 py-2 px-6">
        <button
          type="submit"
          disabled={isSubmitLoading}
          className="bg-red-600 hover:bg-red-700 text-md text-white px-6 py-2  rounded-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
        >
          {isSubmitLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}

export default MemberForm;
