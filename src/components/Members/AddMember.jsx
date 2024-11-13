import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "/images/backbutton.png";
import profileImage from "/images/profile.png";
import MemberForm from "../Forms/MemberForm";
import NavBar from "../NavBar";

function AddMember() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/admin/members");
  };

  const [member, setMember] = useState({
    name:' ',
    member_email:' ',
    CNIC:' ',
    weight:' ',
    height:' ',
    address:' ',
    gender:' ',
    health_issues:' ',
    phone_number: ' ',
    DOB: ' ',
    profile_image: ' ',
    membership_type: ' ',
    trainer_id: ' ',
    addmission_date: ' ',
    membership_duration: ' '
  });

  return (
    <>
      <NavBar title={"Member"} />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img
              src={back}
              alt="back button"
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </button>
          <p className="text-xl font-semibold">Add Member Details</p>
        </div>
        <MemberForm
          msg={"Added"}
          requestType={"post"}
          URL={"http://profit-backend.test/api/member"}
          profileImage={profileImage}
          member={member}
          setMember={setMember}
        />
      </div>
    </>
  );
}

export default AddMember;
