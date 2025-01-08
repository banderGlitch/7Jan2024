import { useState } from 'react';
import { words } from '../../assets/words';
import { GrPowerReset } from "react-icons/gr";
export default function WordList() {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filteredWords = selectedFilter
    ? words.filter(word => word.toUpperCase().startsWith(selectedFilter))
    : words;

  const filters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const handleReset = () => {
    setSelectedFilter(null);
  };



  return (
    <div className="fixed right-0 top-[64px] bottom-[48px] flex">
      {/* Word List Drawer */}
      <div className="w-64 bg-black h-full p-4 border-l border-gray-800">
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-bold mb-4 text-white">Available Wordlist</h3>
          <div className="space-y-2 flex-grow overflow-y-auto">
            {filteredWords.map((word, index) => (
              <div 
                key={index}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                {word}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-400 pt-4 z-100">
            Reference: {' '}
            <a 
              href="https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt#L1706"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              BEP-31 wordlist
            </a>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="w-8 bg-gray-800 h-full flex flex-col">
        {/* Title Section */}
        <div className="w-full bg-black py-4 border-b border-gray-700">
            <GrPowerReset className="text-white text-center font-bold cursor-pointer" onClick={handleReset}/>
        </div>
         {/* Filters Section */}
         <div className="flex-grow py-1 flex flex-col items-center"> {/* Reduced padding */}
          {filters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedFilter(letter)}
              className={`w-4 h-4 mb-[2px] rounded flex items-center justify-center text-[10px] 
                ${selectedFilter === letter 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}