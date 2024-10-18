import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black text-white p-4'>
      <h1 className='text-4xl md:text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl md:text-3xl mb-2'>Page Not Found</h2>
      <p className='text-base md:text-lg text-center mb-6'>
        The page you're looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/admin/dashboard")}
        className='bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm md:text-base transition duration-300'
      >
        Go Back to Dashboard
      </button>
    </div>
  );
}

export default ErrorPage;