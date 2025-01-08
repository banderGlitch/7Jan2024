import { useState } from 'react';
import DropdownSearch from './DropdownSearch'; // Import your reusable dropdown component
import { words } from '../../assets/words';

export default function SearchInterface() {
  const [selectedWords, setSelectedWords] = useState([null, null, null]);

  const handleDropdownChange = (selectedOption, index) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords[index] = selectedOption;
    setSelectedWords(newSelectedWords);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 relative">
      <h1 className="text-2xl font-mono text-gray-300">/// get . your . name</h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-mono">///</span>

          {[0, 1, 2].map((index) => (
            <div key={index} className="relative">
              <div className="flex items-center">
                {index > 0 && <span className="text-gray-500 mx-2">.</span>}
                <div className="w-32">
                  {/* Use the reusable dropdown component */}
                  <DropdownSearch
                    placeholder={`word${index + 1}`}
                    words={words}
                    onChange={(option) => handleDropdownChange(option, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-green-100 text-green-800 px-6 py-2 rounded-md hover:bg-green-200 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}
