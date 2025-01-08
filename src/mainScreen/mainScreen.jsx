import React, { useState } from "react";
import SearchInterface from "../components/common/SearchInterface";
import { TiTickOutline } from "react-icons/ti";

export default function MainScreen() {
    const [selectedWords, setSelectedWords] = useState([null, null, null]);
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = () => {
        console.log(selectedWords)
        // Get the selected words or use placeholders
        const word1 = selectedWords[0]?.value || 'get';
        const word2 = selectedWords[1]?.value || 'your';
        const word3 = selectedWords[2]?.value || 'name';

        // Simulate different price tiers
        const domainName = `/// ${word1} . ${word2} . ${word3}`;

        // Simulate search results
        setSearchResults({
            exactMatch: {
                name: `${domainName} (Regular)`,
                price: "5.00 USDC"
            },
            suggestedResults: [
                {
                    name: `${domainName} (Regular)`,
                    price: "5.00 USDC"
                },
                {
                    name: `${domainName} (Premium)`,
                    price: "50.00 USDC"
                },
                {
                    name: `${domainName} (Ultra-Premium)`,
                    price: "500.00 USDC"
                },
                {
                    name: `/// ${word1} . ${word2} . random (Regular)`,
                    price: "5.00 USDC"
                },
                {
                    name: `/// ${word1} . cool . ${word3} (Regular)`,
                    price: "5.00 USDC"
                }
            ]
        });
    };

    return (
        <div className="flex flex-col items-center px-4 pt-20 pb-8 max-w-4xl mx-auto">
            <div className="w-full mb-8">
                <SearchInterface
                    selectedWords={selectedWords}
                    setSelectedWords={setSelectedWords}
                    onSearch={handleSearch}
                />
            </div>

            {searchResults && (
                <div className="w-full space-y-6">
                    {/* Exact Match Section */}
                    <div className="space-y-2">
                        <h2 className="text-gray-400 text-sm font-mono">Exact Match</h2>
                        <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center space-x-2 text-gray-300 font-mono">
                                <TiTickOutline className="h-5 w-5 text-green-500" /> {/* Added check icon */}
                                <span>{searchResults.exactMatch.name.replace('///', '')}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-400">{searchResults.exactMatch.price}</span>
                                <button className="px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Results Section */}
                    <div className="space-y-2">
                        <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
                        <div className="space-y-2">
                            {searchResults.suggestedResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="text-gray-300 font-mono">{result.name}</span>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-400">{result.price}</span>
                                        <button className="px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}