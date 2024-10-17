import { useNavigate } from "react-router-dom";
import Search from "/images/search.png";

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
        <div className='bg-gray-50 h-16 rounded-lg flex items-center '>
          <div className='px-6 md:px-10 lg:px-16 flex'>
            <input 
            className="p-1 md:p-1 lg:p-2 sm:w-40 md:w-60 lg:w-80 rounded-lg bg-no-repeat bg-right cursor-pointer outline-none"
            type='text'
            placeholder='Search'
            style={{ backgroundImage: `url(${Search})`,backgroundSize: '20px 20px'  }}>
            </input>
            
          </div>    
        </div>
      </div>
    </div>
    </>
  )
}
//hello
export default Trainer
