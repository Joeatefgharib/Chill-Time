import React, { useState } from 'react';
import axios from "axios"
const AddActorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    image: '',
    description: '',
    relatedmovies: [],
    relatedseries: [],
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
      const response = await axios.post('http://localhost:5000/addactor', formData);
      // Handle the response
      console.log('Actor added successfully:', response.data);
      // Reset the form data
      setFormData({
        _id: '',
        name: '',
        image: '',
        description: '',
        relatedmovies: [],
        relatedseries: [],
      });
    } catch (error) {
      // Handle any errors
      console.error('Error adding actor:', error);
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          اسم الممثل:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          رابط صورة الممثل:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          وصف الممثل:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="relatedmovies" className="block text-sm font-medium text-gray-700">
          الأفلام ذات الصلة:
        </label>
        <input
          type="text"
          id="relatedmovies"
          name="relatedmovies"
          value={formData.relatedmovies}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="relatedseries" className="block text-sm font-medium text-gray-700">
          المسلسلات ذات الصلة:
        </label>
        <input
          type="text"
          id="relatedseries"
          name="relatedseries"
          value={formData.relatedseries}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
      >
        إضافة الممثل
      </button>
    </form>
  );
};

export default AddActorForm;
