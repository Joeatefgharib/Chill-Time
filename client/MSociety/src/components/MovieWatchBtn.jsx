import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const QualitySelection = ({ onSelectQuality }) => {
  const [selectedQuality, setSelectedQuality] = useState("");
  const [error, setError] = useState(false);

  const handleSelectQuality = (quality) => {
    setSelectedQuality(quality);
    setError(false); // Reset error when a quality is selected
  };

  const handleConfirm = () => {
    if (selectedQuality) {
      onSelectQuality(selectedQuality);
    } else {
      setError(true); // Show error if no quality is selected
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-red-600 p-8 rounded-lg text-white">
        <h3 className="mb-4 text-lg flex px-4">اختار الجودة:</h3>
        <div className="flex justify-between items-center">
          <button
            className={`hover:bg-white hover:text-red-600 border border-white rounded-lg px-4 py-2 transition duration-300 ${
              selectedQuality === "480p" ? "bg-white text-red-600" : "bg-red-600 text-white"
            }`}
            onClick={() => handleSelectQuality("480p")}
          >
            480p
          </button>
          <button
            className={`hover:bg-white hover:text-red-600 border border-white rounded-lg px-4 py-2 transition duration-300 ${
              selectedQuality === "720p" ? "bg-white text-red-600" : "bg-red-600 text-white"
            }`}
            onClick={() => handleSelectQuality("720p")}
          >
            HD
          </button>
          <button
            className={`hover:bg-white hover:text-red-600 border border-white rounded-lg px-4 py-2 transition duration-300 ${
              selectedQuality === "1080p" ? "bg-white text-red-600" : "bg-red-600 text-white"
            }`}
            onClick={() => handleSelectQuality("1080p")}
          >
            FHD
          </button>
        </div>
        {error && <p className="text-white p-1 pt-2 mr-6">الرجاء اختيار الجودة</p>}
        <button
          className="mt-4 bg-white text-red-600 px-8 mr-8 py-2 rounded-lg"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

QualitySelection.propTypes = {
  onSelectQuality: PropTypes.func.isRequired,
};

const MovieWatchBtn = () => {
  const navigateRoute = useNavigate();
  const [showQualitySelection, setShowQualitySelection] = useState(false);

  const handleWatchNow = () => {
    setShowQualitySelection(true);
  };

  const handleSelectQuality = (quality) => {
    // Navigate to watch route with selected quality
    navigateRoute(`watch/${quality}`);
  };

  return (
    <>
      {showQualitySelection ? (
        <QualitySelection onSelectQuality={handleSelectQuality} />
      ) : (
        <button
          className={
            "w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 lg:ml-0 ml-10"
          }
          onClick={handleWatchNow}
        >
          شاهد الأن
        </button>
      )}
    </>
  );
};

export default MovieWatchBtn;
