import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Episode = ({ episodeNumber, title, description, img }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleSelectQuality = (quality) => {
        setSelectedQuality(quality);
        setError(false); // Reset error when a quality is selected
    };

    const handleConfirm = () => {
        if (selectedQuality) {
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/episodes'));
            navigate(`${basePath}/${episodeNumber}/watch/${selectedQuality}`);
        } else {
            setError(true); // Show error if no quality is selected
        }
    };

    return (
        <>
            <div className="lg:flex lg:items-center gap-[50px] pb-[40px]">
                <img
                    onClick={toggleMenu}
                    className="lg:w-[320px] lg:h-[190px] rounded-2xl cursor-pointer"
                    id="img"
                    alt={episodeNumber}
                    src={img}
                />
                <div>
                    <h2 onClick={toggleMenu} className="text-white text-2xl cursor-pointer">{title}</h2>
                    <p className="text-gray-600 w-10/12">{description}</p>
                </div>
            </div>
            {showMenu && (
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
            )}
        </>
    );
};

Episode.propTypes = {
    episodeNumber: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Episode;
