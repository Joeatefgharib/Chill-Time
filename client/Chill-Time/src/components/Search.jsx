import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const formattedSearchTerm = searchTerm.trim().replace(/\s+/g, '-');
    if (formattedSearchTerm !== '') {
      window.location.href = `/search/${formattedSearchTerm}`;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className=" relative w-[300px] h-[40px]">
      <input
      className=' absolute left-0 top-0 w-full h-full text-white bg-transparent border-[1px] border-solid border-white outline-none rounded pr-[10px] backdrop:blur-[10px]'
        type="text"
        placeholder="أبحث عما تريد..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Search;
