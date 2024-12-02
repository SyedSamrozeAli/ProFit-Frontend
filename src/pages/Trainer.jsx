import { useNavigate } from "react-router-dom";
import DisplayTrainer from "../components/Trainers/DisplayTrainer";
import NavBar from "../components/NavBar";
function Trainer() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar title="Trainer" />
      <div className="w-full  bg-white">
        <div className="mx-6 md:mx-10 lg:mx-20 my-4">
          <div className="flex justify-between items-center mb-5">
            <p className="font-semibold text-lg">Trainers Page</p>
            <button
              className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm "
              onClick={() => navigate("/admin/trainers/addtrainers")}
            >
              + Add Trainer
            </button>
          </div>
          <DisplayTrainer />
        </div>
      </div>
    </>
  );
}
export default Trainer;
