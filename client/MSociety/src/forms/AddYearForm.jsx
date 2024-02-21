import React, { useState } from 'react';
import axios from 'axios';

const AddYearForm = () => {
  const [formData, setFormData] = useState({
    _id: '',
    year: '',
    movies: [],
    series: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the server using axios post request
      const response = await axios.post('http://localhost:5000/api/year', formData);
      // Handle the response
      console.log('Year added successfully:', response.data);
      // Reset the form data
      setFormData({
        _id: '',
        year: '',
        movies: [],
        series: [],
      });
    } catch (error) {
      // Handle any errors
      console.error('Error adding year:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-black">
      <div className="mb-4">
        <label htmlFor="_id" className="block text-sm font-medium text-gray-700">
          _id:
        </label>
        <input
          type="text"
          id="_id"
          name="_id"
          value={formData._id}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year:
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="movies" className="block text-sm font-medium text-gray-700">
          Movies:
        </label>
        <input
          type="text"
          id="movies"
          name="movies"
          value={formData.movies}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="series" className="block text-sm font-medium text-gray-700">
          Series:
        </label>
        <input
          type="text"
          id="series"
          name="series"
          value={formData.series}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
      >
        Add Year
      </button>
    </form>
  );
};

export default AddYearForm;
