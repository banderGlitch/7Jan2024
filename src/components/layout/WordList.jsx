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
        {/* Main Word List Container */}
        <div className="w-64 bg-black border-l border-gray-800 flex flex-col h-full">
          {/* Header - Removed font-mono */}
          <div className="w-full bg-black px-4 py-2 border-b border-gray-800 flex justify-center items-center">
            <h3 className="text-lg text-white">Available Wordlist</h3>
          </div>
    
          {/* Content Container */}
          <div className="flex flex-1 min-h-0">
            {/* Word List - Removed font-mono */}
            <div className="flex-1 overflow-y-auto">
              {filteredWords.map((word, index) => (
                <div 
                  key={index}
                  className="px-4 py-1 text-gray-300 hover:text-white cursor-pointer"
                >
                  {word}
                </div>
              ))}
            </div>
    
            {/* Filter Strip - No changes needed */}
            <div className="w-6 bg-gray-800 overflow-y-auto">
              <div className="flex flex-col items-center py-1 space-y-[1px]">
                <button
                  onClick={handleReset}
                  className="w-3 h-3 rounded-sm flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700"
                  title="Reset filter"
                >
                  <GrPowerReset size={6} className="text-white" />
                </button>
                {filters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedFilter(letter)}
                    className={`w-3 h-3 rounded-sm flex items-center justify-center text-[8px] font-light
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
    
          {/* Footer - Removed font-mono */}
          <div className="w-full bg-black px-4 py-2 border-t border-gray-800 mt-auto">
            <span className="text-sm text-gray-400">
              Reference:{' '}
              <a 
                href="https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt#L1706"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-white underline"
              >
                BIP-31 wordlist
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }