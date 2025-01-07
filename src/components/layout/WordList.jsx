import { useState } from 'react';
import { words } from '../../assets/words';


export default function WordList() {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const filteredWords = selectedFilter
        ? words.filter(word =>
            word.toUpperCase().startsWith(selectedFilter.toUpperCase())
        )
        : words;

    const filters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    return (
        <div className="fixed right-0 top-[64px] bottom-[48px] flex"> {/* Added bottom offset */}
            {/* Word List Drawer */}
            <div className="w-64 bg-black h-full p-4 border-l border-gray-800">
                <div className="flex flex-col h-full">
                    <h3 className="text-lg font-bold mb-4">Available Wordlist</h3>
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
                    <div className="text-sm text-gray-400 pt-4">
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
            <div className="w-8 bg-gray-800 h-full flex flex-col items-center py-4 overflow-y-auto">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`w-6 h-6 mb-2 rounded flex items-center justify-center text-sm
              ${selectedFilter === filter
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}