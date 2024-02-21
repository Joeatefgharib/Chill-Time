import React, { useState } from "react";
import axios from "axios"

const UploadMovieForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    type: "movie",
    lang: "",
    title: "",
    genre: "",
    year: "",
    description: "",
    poster: "",
    actors: [],
    qualities: [{
      type: "720p", link: "", download: "",
    },{
      type: "1080p", link: "", download: "",
    }],
    trending: "",
    trendpic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActorChange = (index, value) => {
    setFormData(prevData => {
      const updatedActors = [...prevData.actors];
      updatedActors[index] = value;
      return {
        ...prevData,
        actors: updatedActors,
      };
    });
  };

  const handleAddActor = () => {
    setFormData(prevData => ({
      ...prevData,
      actors: [...prevData.actors, ""],
    }));
  };

  const handleRemoveActor = (index) => {
    setFormData(prevData => ({
      ...prevData,
      actors: prevData.actors.filter((_, i) => i !== index),
    }));
  };

  const handleQualitiesChange = (index, key, value) => {
    setFormData(prevData => ({
      ...prevData,
      qualities: prevData.qualities.map((quality, i) => {
        if (i === index) {
          return {
            ...quality,
            [key]: value,
          };
        }
        return quality;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/addmovie",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Movie uploaded successfully!");
      } else {
        console.error("Failed to upload movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md p-4 text-black">
      <h2 className="text-xl font-semibold mb-4  text-white">Upload Movie</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="_id" className="block text-sm font-medium  text-white">
            _id:
          </label>
          <input
            type="text"
            id="_id"
            name="_id"
            value={formData._id}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium  text-white">
            اسم الفيلم:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium  text-white">
            اللغة:
          </label>
          <input
            type="text"
            id="lang"
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium  text-white">
            النوع:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium  text-white">
            السنه:
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium  text-white">
            وصف الفيلم:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="poster" className="block text-sm font-medium  text-white">
            البوستر:
          </label>
          <input
            type="text"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="actors" className="block text-sm font-medium  text-white">
            الممثلين:
          </label>
          {formData.actors.map((actor, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={actor}
                onChange={(e) => handleActorChange(index, e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveActor(index)}
                className="ml-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                احذف
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddActor}
            className="block py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            اضف ممثل
          </button>
        </div>
        <div>
          <label htmlFor="qualities" className="block text-xl font-medium  text-white">
            الجودات:
          </label>
          {formData.qualities.map((quality, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-white">{quality.type}</span>
              <input
                placeholder="link"
                type="text"
                value={quality.link}
                onChange={(e) => handleQualitiesChange(index, 'link', e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                placeholder="download"
                type="text"
                value={quality.download}
                onChange={(e) => handleQualitiesChange(index, 'download', e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="trending" className="block text-sm font-medium text-white">
            Trending:
          </label>
          <input
            type="text"
            id="trending"
            name="trending"
            value={formData.trending}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="trendpic" className="block text-sm font-medium  text-white">
            Trendpic:
          </label>
          <input
            type="text"
            id="trendpic"
            name="trendpic"
            value={formData.trendpic}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            ارفع
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMovieForm;
