import { useNavigate } from "react-router-dom";
import DisplayMember from "../components/Members/DisplayMember";
import NavBar from "../components/NavBar";

function Member() {

  const navigate = useNavigate();

  return (
    <>
    <NavBar title="Member" />
    <div className='w-full h-screen bg-white'>
      <div className='mx-6 md:mx-10 lg:mx-20 my-4'>
        <div className='flex justify-between items-center mb-5'>
          <p className='font-semibold text-lg'>Members Page</p>
          <button 
          className='bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm '
          onClick={() => navigate("/admin/members/addmembers")}>+  Add Member</button>
        </div>
        <DisplayMember />
      </div>
    </div>
    </>
  )
}
export default Member
