import { useNavigate } from "react-router-dom";
import DisplayTrainer from "../components/DisplayTrainer";

function Trainer() {

  const navigate = useNavigate();

  return (
    <>
    <div className='w-full h-screen bg-white'>
      <div className='mx-6 md:mx-10 lg:mx-20 my-4'>
        <div className='flex justify-between items-center mb-5'>
          <p className='font-semibold text-lg'>Trainers Page</p>
          <button 
          className='bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm '
          onClick={() => navigate("/admin/trainers/addtrainers")}>+  Add Trainer</button>
        </div>
        <DisplayTrainer />
      </div>
    </div>
    </>
  )
}
//hello
export default Trainer
