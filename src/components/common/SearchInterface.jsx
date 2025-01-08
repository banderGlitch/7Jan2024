import React, { useState } from 'react';
import DropdownSearch from './DropdownSearch';
import { words } from '../../assets/words'; // Import your 20,000 words

export default function SearchInterface({ selectedWords, setSelectedWords, onSearch }) {
  const handleDropdownChange = (selectedOption, index) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords[index] = selectedOption;
    setSelectedWords(newSelectedWords);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-mono text-gray-300 mb-4">/// get . your . name</h1>

      <div className="flex items-center space-x-1">
        <span className="text-gray-500 font-mono">///</span>

        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center">
            <DropdownSearch
              placeholder={`word${index + 1}`}
              words={words} // Pass full word list
              onChange={(option) => handleDropdownChange(option, index)}
            />
            {/* Add dots between the fields */}
            {index < 2 && <span className="text-gray-500 font-mono mx-2">.</span>}
          </div>
        ))}

        <button className="bg-green-100 text-green-800 px-6 py-2 rounded-md hover:bg-green-200 transition-colors ml-4" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}