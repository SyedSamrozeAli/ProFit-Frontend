import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EquipmentTable from './EquipmentTable';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import 'react-circular-progressbar/dist/styles.css';

function DisplayEquipment() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(false);

  // This will start the progress bar animation when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Fetch the equipment data once when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setLoading(true);
      axios
        .get('http://profit-backend.test/api/equipment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if(response.data.status == false){
            console.log("status error");
          }
          else{
            setEquipmentData(response.data.data);
          }
          setLoading(false);
          setLoadingProgress(100); 
        })
        .catch((error) => {
          console.log(error.response);

          // Set error state to true and handle unauthorized error (401)
          setError(true);
          setLoading(false);
          setLoadingProgress(0); // Reset progress on error

          if(error.response &&  error.response.data.status_code == 404 ){
            setError(false);
          }
          else if (error.response?.status === 401) {
            toast.error('Unauthorized access. Please log in again.');
          } else {
            console.log(error);
            toast.error('Error fetching the Equipment details.');
          }
        });
    } else {
      // No token found
      setError(true);
      setLoading(false);
    }
  }, []); // This will run only once when the component mounts

  const handleDeleteField = (id) => {
    const token = localStorage.getItem('token');
    
    const deleteEquipment = () => {
      axios
        .delete(`http://profit-backend.test/api/equipment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
            setEquipmentData((prevData) =>
            prevData.filter((equipment) => equipment.equipment_id !== id)
          );
          toast.success('Selected Equipment deleted successfully.');
        })
        .catch((error) => {
          console.error(error);
          toast.error('Error deleting the Equipment.');
        });
    };
  
    // Show the custom confirmation dialog
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this Equipment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEquipment(),
          className: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all'
        },
        {
          label: 'No',
          onClick: () => {}, // Optional action for "No"
          className: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-all'
        }
      ],
      overlayClassName: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center", // Overlay styling
      customUI: ({ title, message, buttons, onClose }) => ( // Added onClose prop
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
      )
    });
  ;
  };
  

  return (
    <>
      {loading ? (
        // Loading state with progress bar
        <div className="flex items-center justify-center h-screen">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={loadingProgress}
              text={`${loadingProgress}%`}
              styles={buildStyles({
                textColor: '#000', 
                pathColor: '#ff0000',
                trailColor: '#ffffff', 
              })}
            />
          </div>
        </div>
      ) : (
        // If not loading and no error occurred, render data or show "No trainer found"
        !error && (
        equipmentData.length === 0 ? (
            <div class="flex flex-col items-center justify-center pt-20 ">
                <img src='/images/notrainer.png' alt='no trainer image' className='h-80'/>
            </div>
          ) : (
            <EquipmentTable
              equipmentData={equipmentData}
              handleDeleteField={handleDeleteField}
            />
          )
        )
      )}
    </>
  );
}

export default DisplayEquipment;
