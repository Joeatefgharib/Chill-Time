import React, { useState } from "react";
import UploadMovieForm from "../forms/UploadMovieForm.jsx";
import UploadSeriesForm from "../forms/UploadSeriesForm.jsx";
import AddActorForm from "../forms/AddActorForm.jsx";
import AddGenreForm from "../forms/AddGenreForm.jsx";
import AddYearForm from "../forms/AddYearForm.jsx";

const AdminPage = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderForm = () => {
    switch (selectedItem) {
      case "رفع فيلم":
        return <UploadMovieForm />;
      case "رفع مسلسل":
        return <UploadSeriesForm />;
      case "اضافة ممثل":
        return <AddActorForm />;
      case "اضافة نوع":
        return <AddGenreForm />;
      case "اضافة سنه":
        return <AddYearForm />;
      default:
        return null;
    }
  };

  return (
    <div className=" text-white">
      <div className="flex h-full bg-gray-800 ">
        <div className="flex flex-col w-64 bg-gray-900">
          <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <span className="text-white">Admin</span>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4">
              <li
                className="text-gray-400 hover:text-white cursor-pointer mb-4"
                onClick={() => handleItemClick("رفع فيلم")}
              >
                رفع فيلم
              </li>
              <li
                className="text-gray-400 hover:text-white cursor-pointer mb-4"
                onClick={() => handleItemClick("رفع مسلسل")}
              >
                رفع مسلسل
              </li>
              <li
                className="text-gray-400 hover:text-white cursor-pointer mb-4"
                onClick={() => handleItemClick("اضافة ممثل")}
              >
                اضافة ممثل
              </li>
              <li
                className="text-gray-400 hover:text-white cursor-pointer mb-4"
                onClick={() => handleItemClick("اضافة نوع")}
              >
                اضافة نوع
              </li>
              <li
                className="text-gray-400 hover:text-white cursor-pointer mb-4"
                onClick={() => handleItemClick("اضافة سنه")}
              >
                اضافة سنه
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-1">{renderForm()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
