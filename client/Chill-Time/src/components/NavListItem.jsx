import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavListItem = ({ nav }) => {
  const [showLanguages, setShowLanguages] = useState(false);

  const handleMouseEnter = () => {
    // Only show dropdown for IDs other than 1 and 4
    if (nav.id !== 1 && nav.id !== 4) {
      setShowLanguages(true);
    }
  };

  const handleMouseLeave = () => {
    if (nav.id !== 1 && nav.id !== 4) {
      setShowLanguages(false);
    }
  };

  return (
    <li className="relative">
      <Link
        className="ml-10 hover:text-red-600 duration-[.5s]"
        to={nav.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {nav.name}
      </Link>
      {(nav.id === 3 && showLanguages) && (
        <div
          className="absolute top-full bg-transparent border border-gray-300 rounded shadow p-1 w-48 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/series/trending">افضل مسلسلات الشهر</Link>
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/series/عربي">عربي</Link>
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/series/اجنبي">اجنبي</Link>
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/series/تركي">تركي</Link>
        </div>
      )}
      {/* Only show dropdown for IDs other than 1 and 4 */}
      {(nav.id !== 1 && nav.id !== 4 && nav.id !== 3 && showLanguages) && (
        <div
          className="absolute top-full bg-transparent border border-gray-300 rounded shadow p-1 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/movies/عربي">عربي</Link>
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/movies/اجنبي">اجنبي</Link>
          <Link className="block py-1 hover:text-red-600 duration-[.5s]" to="/movies/تركي">تركي</Link>
        </div>
      )}
    </li>
  );
};

export default NavListItem;
