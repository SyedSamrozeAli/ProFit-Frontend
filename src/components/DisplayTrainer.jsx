import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import TrainerTable from './TrainerTable';

function DisplayTrainer() {
    const [trainerData, setTrainerData] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          axios.get('http://profit-backend.test/api/trainer', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((response) => {
            setTrainerData(response.data.data); 
          })
          .catch((error) => {
              console.log(error);
              const errorMsg = "Error fetching the trainer details.";
              toast.error(errorMsg);
          });
      }
  }, []);
 
  const handleDeleteField = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.delete(`http://profit-backend.test/api/trainer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTrainerData(prevData => prevData.filter(trainer => trainer.id !== id));
        toast.success("Trainer deleted successfully.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error deleting the trainer.");
      });
    }
  };

  return (
    <>
      <TrainerTable trainerData={trainerData} handleDeleteField={handleDeleteField} />
    </>
  );
}

export default DisplayTrainer;
