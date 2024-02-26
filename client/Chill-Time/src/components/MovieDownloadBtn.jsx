import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const QualitySelectionModal = ({ qualities, onSelectQuality }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-red-600 p-8 rounded-lg text-white">
        <h3 className="mb-4 text-lg flex px-9">اختار الجودة:</h3>
        <div className="flex flex-wrap justify-center">
          {qualities.map((quality) => (
            <button
              key={quality._id}
              className="hover:bg-white hover:text-red-600 border border-white rounded-lg px-4 py-2 mb-2 mr-2 transition duration-300 bg-red-600 text-white"
              onClick={() => onSelectQuality(quality.download)}
            >
              {quality.type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

QualitySelectionModal.propTypes = {
  qualities: PropTypes.array.isRequired,
  onSelectQuality: PropTypes.func.isRequired,
};

const MovieDownloadBtn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [showQualitySelection, setShowQualitySelection] = useState(false);

  const handleDownloadNow = () => {
    setLoading(true);
    axios
      .get(`http://89.116.110.212:5000/api/movies/${id}/qualities`)
      .then((response) => {
        const fetchedQualities = response.data;
        if (fetchedQualities.length > 0) {
          setQualities(fetchedQualities);
          setShowQualitySelection(true);
        } else {
          console.error("No qualities available for download.");
        }
      })
      .catch((error) => {
        console.error("Error fetching qualities:", error);
        // Handle error while fetching qualities
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelectQuality = (downloadLink) => {
    setShowQualitySelection(false); // Close the quality selection modal
    window.open(downloadLink, "_blank"); // Open the download link in a new tab
  };

  return (
    <>
      {showQualitySelection && (
        <QualitySelectionModal
          qualities={qualities}
          onSelectQuality={handleSelectQuality}
        />
      )}
      <button
        className="w-[100px] bg-white text-red-600 rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-red-600 hover:text-white lg:ml-0 ml-10"
        onClick={handleDownloadNow}
        disabled={loading}
      >
        {loading ? "جاري التحميل..." : "حمل الآن"}
      </button>
    </>
  );
};

export default MovieDownloadBtn;
