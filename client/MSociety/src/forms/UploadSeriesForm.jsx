import React, { useState } from "react";
import axios from "axios";

const UploadSeriesForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    type: "series",
    title: "",
    genre: "",
    year: "",
    description: "",
    poster: "",
    lang: "",
    actors: [],
    seasons: [
      {
        seasonNumber: "",
        seasonPoster: "",
        episodes: [
          {
            episodeNumber: "",
            title: "",
            img: "",
            qualities: [
              { type: "720p", link: "" },
              { type: "1080p", link: "" },
            ],
          },
        ],
      },
    ],
    trending: "",
    trendpic: "",
  });

  const [seasons, setSeasons] = useState(formData.seasons);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddActor = () => {
    setFormData((prevData) => ({
      ...prevData,
      actors: [...prevData.actors, ""],
    }));
  };

  const handleActorChange = (e, index) => {
    const newActors = [...formData.actors];
    newActors[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      actors: newActors,
    }));
  };
  
  

  const handleAddSeason = () => {
    setFormData((prevData) => ({
      ...prevData,
      seasons: [
        ...prevData.seasons,
        {
          seasonNumber: "",
          seasonPoster: "",
          episodes: [
            {
              episodeNumber: "",
              title: "",
              img: "",
              qualities: [
                { type: "720p", link: "", download: "" },
                { type: "1080p", link: "", download: "" },
              ],
            },
          ],
        },
      ],
    }));
  };;

  const handleAddEpisode = (seasonIndex) => {
    setFormData((prevData) => {
      const newSeasons = [...prevData.seasons];
      newSeasons[seasonIndex].episodes.push({
        episodeNumber: "",
        title: "",
        img: "",
        qualities: [
          { type: "720p", link: "", download: "" },
          { type: "1080p", link: "", download: "" },
        ],
      });
      return { ...prevData, seasons: newSeasons };
    });
  };

  const handleInputChange = (e, seasonIndex, episodeIndex, qualityIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newSeasons = [...prevData.seasons];
      if (name.startsWith("episodeNumber")) {
        newSeasons[seasonIndex].episodes[episodeIndex][name] = value;
      } else if (name.startsWith("title")) {
        newSeasons[seasonIndex].episodes[episodeIndex][name] = value;
      } else if (name.startsWith("img")) {
        newSeasons[seasonIndex].episodes[episodeIndex][name] = value;
      } else if (name.startsWith("link")) {
        newSeasons[seasonIndex].episodes[episodeIndex].qualities[
          qualityIndex
        ][name] = value;
      } else if (name.startsWith("download")) {
        newSeasons[seasonIndex].episodes[episodeIndex].qualities[
          qualityIndex
        ][name] = value;
      }
      return { ...prevData, seasons: newSeasons };
    });
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/addseries",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Series uploaded successfully!");
      } else {
        console.error("Failed to upload series");
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
          <label
            htmlFor="_id"
            className="block text-sm font-medium  text-white"
          >
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
          <label
            htmlFor="title"
            className="block text-sm font-medium  text-white"
          >
            اسم المسلسل:
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
          <label
            htmlFor="lang"
            className="block text-sm font-medium  text-white"
          >
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
          <label
            htmlFor="genre"
            className="block text-sm font-medium  text-white"
          >
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
          <label
            htmlFor="year"
            className="block text-sm font-medium  text-white"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium  text-white"
          >
            وصف المسلسل:
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
          <label
            htmlFor="poster"
            className="block text-sm font-medium  text-white"
          >
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
  <label
    htmlFor="actors"
    className="block text-sm font-medium  text-white"
  >
    الممثلين:
  </label>
{formData.actors.map((actor, index) => (
  <div key={index}>
    <input
      type="text"
      value={actor}
      onChange={(e) => handleActorChange(e, index)}
      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
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
          <label
            htmlFor="qualities"
            className="block text-xl font-medium  text-white"
          >
            الجودات:
          </label>
          {seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="mb-8 border rounded-md p-4 ">
              <label htmlFor={`seasonNumber_${seasonIndex}`}>
                Season Number:
              </label>
              <input
                type="text"
                name={`seasonNumber_${seasonIndex}`}
                value={season.seasonNumber}
                onChange={(e) => handleInputChange(e, seasonIndex)}
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <label
                htmlFor={`seasonPoster_${seasonIndex}`}
                className="block mt-4"
              >
                Season Poster:
              </label>
              <input
                type="text"
                name={`seasonPoster_${seasonIndex}`}
                value={season.seasonPoster}
                onChange={(e) => handleInputChange(e, seasonIndex)}
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
              />
              <div className="mt-4">
                <label className="block">Episodes:</label>
                {season &&
                  season.episodes &&
                  season.episodes.map((episode, episodeIndex) => (
                    <div
                      key={episodeIndex}
                      className="border rounded-md p-4 mb-4"
                    >
                      <label
                        htmlFor={`episodeNumber_${seasonIndex}_${episodeIndex}`}
                      >
                        Episode Number:
                      </label>
                      <input
                        type="text"
                        name={`episodeNumber_${seasonIndex}_${episodeIndex}`}
                        value={episode.episodeNumber}
                        onChange={(e) =>
                          handleInputChange(e, seasonIndex, episodeIndex)
                        }
                        required
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                      />
                      <label
                        htmlFor={`title_${seasonIndex}_${episodeIndex}`}
                        className="block mt-2"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        name={`title_${seasonIndex}_${episodeIndex}`}
                        value={episode.title}
                        onChange={(e) =>
                          handleInputChange(e, seasonIndex, episodeIndex)
                        }
                        required
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                      />
                      <label
                        htmlFor={`img_${seasonIndex}_${episodeIndex}`}
                        className="block mt-2"
                      >
                        Image:
                      </label>
                      <input
                        type="text"
                        name={`img_${seasonIndex}_${episodeIndex}`}
                        value={episode.img}
                        onChange={(e) =>
                          handleInputChange(e, seasonIndex, episodeIndex)
                        }
                        required
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                      />
                      <div className="mt-2">
                        <label className="block">Qualities:</label>
                        {episode.qualities.map((quality, qualityIndex) => (
                          <div key={qualityIndex} className="flex mt-2">
                            <label
                              htmlFor={`link_${seasonIndex}_${episodeIndex}_${qualityIndex}`}
                              className="block w-1/2 text-gray-700"
                            >
                              {quality.type} Link:
                            </label>
                            <input
                              type="text"
                              name={`link_${seasonIndex}_${episodeIndex}_${qualityIndex}`}
                              value={quality.link}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  seasonIndex,
                                  episodeIndex,
                                  qualityIndex
                                )
                              }
                              required
                              className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                              placeholder="Link"
                            />
                            <label
                              htmlFor={`download_${seasonIndex}_${episodeIndex}_${qualityIndex}`}
                              className="block w-1/2 ml-2 text-gray-700"
                            >
                              {quality.type} Download:
                            </label>
                            <input
                              type="text"
                              name={`download_${seasonIndex}_${episodeIndex}_${qualityIndex}`}
                              value={quality.download}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  seasonIndex,
                                  episodeIndex,
                                  qualityIndex
                                )
                              }
                              required
                              className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                              placeholder="Download"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => handleAddEpisode(seasonIndex)}
                  className="block mt-2"
                >
                  Add Episode
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSeason}
            className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Season
          </button>
          <button
            type="submit"
            className="block mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <div>
          <label
            htmlFor="trending"
            className="block text-sm font-medium text-white"
          >
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
          <label
            htmlFor="trendpic"
            className="block text-sm font-medium  text-white"
          >
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

export default UploadSeriesForm;
