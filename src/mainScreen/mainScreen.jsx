import React, { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import SearchInterface from "../components/common/SearchInterface";
import { words } from "../assets/words";

export default function MainScreen() {
  const [selectedWords, setSelectedWords] = useState([null, null, null]);
  const [searchResults, setSearchResults] = useState(null);

  const getTierIcon = (tier) => {
    switch (tier) {
      case "Premium":
        return <p className="text-yellow-500">Premium</p>;
      case "Ultra-Premium":
        return <p className="text-purple-500">Ultra-Premium</p>;
      default:
        return null;
    }
  };

  const getTier = (words) => {
    const uniqueWords = new Set(words);
    if (uniqueWords.size === 1) return "Ultra-Premium";
    if (uniqueWords.size === 2) return "Premium";
    return "Regular";
  };

  const getRandomWordsPool = (exclude = [], size = 200) => {
    const uniqueWords = new Set();
    while (uniqueWords.size < size) {
      const word = words[Math.floor(Math.random() * words.length)];
      if (!exclude.includes(word)) {
        uniqueWords.add(word);
      }
    }
    return Array.from(uniqueWords);
  };

  const generateRandomSuggestions = (count, pool) => {
    const suggestions = [];
    while (suggestions.length < count) {
      const randomWords = Array(3)
        .fill(null)
        .map(() => pool[Math.floor(Math.random() * pool.length)]);
      suggestions.push({
        words: randomWords,
        price: "5.00 USDC",
        tier: getTier(randomWords),
        available: true, // Always available
      });
    }
    return suggestions;
  };

  const generateSuggestions = (count, userWords, pool) => {
    const suggestions = [];
    while (suggestions.length < count) {
      const suggestionWords = userWords.map((w, i) => (w ? w : pool[Math.floor(Math.random() * pool.length)]));
      suggestions.push({
        words: suggestionWords,
        price: "5.00 USDC",
        tier: getTier(suggestionWords),
        available: true,
      });
    }
    return suggestions;
  };

  const handleSearch = () => {
    const userWords = selectedWords.map((w) => w?.value || null);
    const excludeWords = userWords.filter(Boolean);

    // Pre-filter random words pool to optimize performance
    const randomWordsPool = getRandomWordsPool(excludeWords, 200);

    let exactMatch = null;
    if (userWords.filter(Boolean).length === 3) {
      exactMatch = {
        name: `/// ${userWords.join(" . ")}`,
        price: "50.00 USDC",
        tier: getTier(userWords),
        available: Math.random() > 0.5, // Randomly assign availability
      };
    }

    const randomSuggestionsForExactMatch = generateRandomSuggestions(5, randomWordsPool);
    const suggestions = userWords.filter(Boolean).length < 3 ? generateSuggestions(5, userWords, randomWordsPool) : [];

    setSearchResults({
      exactMatch,
      randomSuggestionsForExactMatch,
      suggestedResults: suggestions.map((s) => ({
        name: `/// ${s.words.join(" . ")}`,
        price: s.price,
        tier: s.tier,
        available: s.available,
      })),
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
          {searchResults.exactMatch && (
            <div className="space-y-2">
              <h2 className="text-gray-400 text-sm font-mono">Exact Match</h2>
              <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-2 text-gray-300 font-mono">
                  {searchResults.exactMatch.available ? (
                    <TiTickOutline className="h-5 w-5 text-green-500" />
                  ) : (
                    <RxCrossCircled className="h-5 w-5 text-red-500" />
                  )}
                  <span>{searchResults.exactMatch.name.replace("///", "")}</span>
                  {getTierIcon(searchResults.exactMatch.tier)}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">{searchResults.exactMatch.price}</span>
                  <button
                    className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
                      ${searchResults.exactMatch.available ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"}`}
                    disabled={!searchResults.exactMatch.available}
                  >
                    {searchResults.exactMatch.available ? "Select" : "Taken"}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
                <div className="space-y-2">
                  {searchResults.randomSuggestionsForExactMatch.map((suggestion, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-300 font-mono">
                        <TiTickOutline className="h-5 w-5 text-green-500" />
                        <span>{suggestion.words.join(" . ")}</span>
                        {getTierIcon(suggestion.tier)}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400">{suggestion.price}</span>
                        <button
                          className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700`}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchResults.suggestedResults.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
              <div className="space-y-2">
                {searchResults.suggestedResults.map((result, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 text-gray-300 font-mono">
                      {result.available ? (
                        <TiTickOutline className="h-5 w-5 text-green-500" />
                      ) : (
                        <RxCrossCircled className="h-5 w-5 text-red-500" />
                      )}
                      <span>{result.name.replace("///", "")}</span>
                      {getTierIcon(result.tier)}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">{result.price}</span>
                      <button
                        className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
                          ${result.available ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"}`}
                        disabled={!result.available}
                      >
                        {result.available ? "Select" : "Taken"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// import React, { useState } from "react";
// import { TiTickOutline } from "react-icons/ti";
// import { RxCrossCircled } from "react-icons/rx";
// import { AiFillStar, AiFillCrown } from "react-icons/ai";
// import SearchInterface from "../components/common/SearchInterface";
// import { words } from "../assets/words";
// import exactMatches from "../assets/exactMatches.json";

// export default function MainScreen() {
//   const [selectedWords, setSelectedWords] = useState([null, null, null]);
//   const [searchResults, setSearchResults] = useState(null);


//   const getTierIcon = (tier) => {
//     switch (tier) {
//       case "Premium":
//         return <AiFillStar className="h-5 w-5 text-yellow-500" />;
//       case "Ultra-Premium":
//         return <AiFillCrown className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   const generateRandomWord = (exclude = []) => {
//     let randomWord;
//     do {
//       randomWord = words[Math.floor(Math.random() * words.length)];
//     } while (exclude.includes(randomWord));
//     return randomWord;
//   };

//   const generateSuggestions = (count, userWords) => {
//     const suggestions = [];
//     while (suggestions.length < count) {
//       const suggestionWords = userWords.map((w, i) => (w ? w : generateRandomWord(userWords.concat(suggestions.flatMap(s => s.words)))));
//       suggestions.push({
//         words: suggestionWords,
//         price: "5.00 USDC",
//         tier: "Regular",
//         available: true,
//       });
//     }
//     return suggestions;
//   };

//   const handleSearch = () => {
//     const userWords = selectedWords.map((w) => w?.value || null);

//     let exactMatch = null;
//     if (userWords.filter(Boolean).length === 3) {
//       exactMatch = {
//         name: `/// ${userWords.join(" . ")}`,
//         price: "50.00 USDC",
//         tier: "Premium",
//         available: Math.random() > 0.5, // Randomly assign availability
//       };
//     }

//     const suggestions = generateSuggestions(5, userWords);

//     console.log("suggestions", suggestions);

//     setSearchResults({
//       exactMatch,
//       suggestedResults: suggestions.map((s) => ({
//         name: `/// ${s.words.join(" . ")}`,
//         price: s.price,
//         tier: s.tier,
//         available: s.available,
//       })),
//     });
//   };

//   return (
//     <div className="flex flex-col items-center px-4 pt-20 pb-8 max-w-4xl mx-auto">
//       <div className="w-full mb-8">
//         <SearchInterface
//           selectedWords={selectedWords}
//           setSelectedWords={setSelectedWords}
//           onSearch={handleSearch}
//         />
//       </div>

//       {searchResults && (
//         <div className="w-full space-y-6">
//           {searchResults.exactMatch && (
//             <div className="space-y-2">
//               <h2 className="text-gray-400 text-sm font-mono">Exact Match</h2>
//               <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors">
//                 <div className="flex items-center space-x-2 text-gray-300 font-mono">
//                   {searchResults.exactMatch.available ? (
//                     <TiTickOutline className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <RxCrossCircled className="h-5 w-5 text-red-500" />
//                   )}
//                   <span>{searchResults.exactMatch.name.replace("///", "")}</span>
//                   {getTierIcon(searchResults.exactMatch.tier)}
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-400">{searchResults.exactMatch.price}</span>
//                   <button
//                     className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
//                       ${searchResults.exactMatch.available ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"}`}
//                     disabled={!searchResults.exactMatch.available}
//                   >
//                     {searchResults.exactMatch.available ? "Select" : "Taken"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
//             <div className="space-y-2">
//               {searchResults.suggestedResults.map((result, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-2 text-gray-300 font-mono">
//                     {result.available ? (
//                       <TiTickOutline className="h-5 w-5 text-green-500" />
//                     ) : (
//                       <RxCrossCircled className="h-5 w-5 text-red-500" />
//                     )}
//                     <span>{result.name.replace("///", "")}</span>
//                     {getTierIcon(result.tier)}
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <span className="text-gray-400">{result.price}</span>
//                     <button
//                       className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
//                         ${result.available ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"}`}
//                       disabled={!result.available}
//                     >
//                       {result.available ? "Select" : "Taken"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { TiTickOutline } from "react-icons/ti";
// import { RxCrossCircled } from "react-icons/rx";
// import SearchInterface from "../components/common/SearchInterface";
// import { words } from "../assets/words";
// import exactMatches from "../assets/exactMatches.json";

// export default function MainScreen() {
//     const [selectedWords, setSelectedWords] = useState([null, null, null]);
//     const [searchResults, setSearchResults] = useState(null);
  
//     // Helper function to check if words are repeating
//     const getWordRepetitionCount = (words) => {
//       const uniqueWords = new Set(words);
//       return 3 - uniqueWords.size;
//     };
  
//     // Helper function to determine price tier based on repetition
//     const getPriceTier = (words) => {
//       const repetitions = getWordRepetitionCount(words);
//       if (repetitions === 2) return { tier: "Ultra-Premium", price: "500.00 USDC" };
//       if (repetitions === 1) return { tier: "Premium", price: "50.00 USDC" };
//       return { tier: "Regular", price: "5.00 USDC" };
//     };
  
//     // Helper function to generate random suggestions
//     const generateSuggestions = (count, selectedWordValues) => {
//       const suggestions = [];
//       const existingExactMatches = new Set(
//         exactMatches.matches.map(match => match.words.join('.'))
//       );
  
//       // Add selected words combination to excluded set if all words are selected
//       if (selectedWordValues.every(word => word)) {
//         existingExactMatches.add(selectedWordValues.join('.'));
//       }
  
//       while (suggestions.length < count) {
//         const randomWords = Array(3).fill().map(() => 
//           words[Math.floor(Math.random() * words.length)]
//         );
        
//         // Skip if this combination exists in exactMatches.json
//         // or matches the user's selected combination
//         if (existingExactMatches.has(randomWords.join('.'))) {
//           continue;
//         }
  
//         const { tier, price } = getPriceTier(randomWords);
//         suggestions.push({
//           words: randomWords,
//           price,
//           tier,
//           available: Math.random() > 0.3 // 70% chance of being available
//         });
//       }
//       return suggestions;
//     };
  
//     const handleSearch = () => {
//       const selectedWordValues = selectedWords.map(w => w?.value || '');
      
//       // Check for exact matches
//       const exactMatch = exactMatches.matches.find(match => 
//         match.words.every((word, index) => word === selectedWordValues[index])
//       );
  
  
//       // Generate suggested results with selected words
//       const suggestions = generateSuggestions(5, selectedWordValues);
  
//       setSearchResults({
//         exactMatch: exactMatch ? {
//           name: `/// ${exactMatch.words.join(' . ')} (${exactMatch.tier})`,
//           price: exactMatch.price,
//           available: exactMatch.available
//         } : null,
//         suggestedResults: suggestions.map(suggestion => ({
//           name: `/// ${suggestion.words.join(' . ')} (${suggestion.tier})`,
//           price: suggestion.price,
//           available: suggestion.available
//         }))
//       });
//     };

//   return (
//     <div className="flex flex-col items-center px-4 pt-20 pb-8 max-w-4xl mx-auto">
//       <div className="w-full mb-8">
//         <SearchInterface 
//           selectedWords={selectedWords} 
//           setSelectedWords={setSelectedWords}
//           onSearch={handleSearch}
//         />
//       </div>

//       {searchResults && (
//         <div className="w-full space-y-6">
//           {/* Exact Match Section */}
//           {searchResults.exactMatch && (
//             <div className="space-y-2">
//               <h2 className="text-gray-400 text-sm font-mono">Exact Match</h2>
//               <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors">
//                 <div className="flex items-center space-x-2 text-gray-300 font-mono">
//                   {searchResults.exactMatch.available ? (
//                     <TiTickOutline className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <RxCrossCircled className="h-5 w-5 text-red-500" />
//                   )}
//                   <span>{searchResults.exactMatch.name.replace('///', '')}</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-400">{searchResults.exactMatch.price}</span>
//                   <button 
//                     className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
//                       ${searchResults.exactMatch.available ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
//                     disabled={!searchResults.exactMatch.available}
//                   >
//                     {searchResults.exactMatch.available ? 'Select' : 'Taken'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Suggested Results Section */}
//           <div className="space-y-2">
//             <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
//             <div className="space-y-2">
//               {searchResults.suggestedResults.map((result, index) => (
//                 <div 
//                   key={index}
//                   className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-2 text-gray-300 font-mono">
//                     {result.available ? (
//                       <TiTickOutline className="h-5 w-5 text-green-500" />
//                     ) : (
//                       <RxCrossCircled className="h-5 w-5 text-red-500" />
//                     )}
//                     <span>{result.name.replace('///', '')}</span>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <span className="text-gray-400">{result.price}</span>
//                     <button 
//                       className={`px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md 
//                         ${result.available ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
//                       disabled={!result.available}
//                     >
//                       {result.available ? 'Select' : 'Taken'}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// Don't delete this code

// import React, { useState } from "react";
// import SearchInterface from "../components/common/SearchInterface";
// import { TiTickOutline } from "react-icons/ti";

// export default function MainScreen() {
//     const [selectedWords, setSelectedWords] = useState([null, null, null]);
//     const [searchResults, setSearchResults] = useState(null);

//     const handleSearch = () => {

//         const word1 = selectedWords[0]?.value || 'get';
//         const word2 = selectedWords[1]?.value || 'your';
//         const word3 = selectedWords[2]?.value || 'name';

//         // Simulate different price tiers
//         const domainName = `/// ${word1} . ${word2} . ${word3}`;

//         // Simulate search results
//         setSearchResults({
//             exactMatch: {
//                 name: `${domainName} (Regular)`,
//                 price: "5.00 USDC"
//             },
//             suggestedResults: [
//                 {
//                     name: `${domainName} (Regular)`,
//                     price: "5.00 USDC"
//                 },
//                 {
//                     name: `${domainName} (Premium)`,
//                     price: "50.00 USDC"
//                 },
//                 {
//                     name: `${domainName} (Ultra-Premium)`,
//                     price: "500.00 USDC"
//                 },
//                 {
//                     name: `/// ${word1} . ${word2} . random (Regular)`,
//                     price: "5.00 USDC"
//                 },
//                 {
//                     name: `/// ${word1} . cool . ${word3} (Regular)`,
//                     price: "5.00 USDC"
//                 }
//             ]
//         });
//     };

//     return (
//         <div className="flex flex-col items-center px-4 pt-20 pb-8 max-w-4xl mx-auto">
//             <div className="w-full mb-8">
//                 <SearchInterface
//                     selectedWords={selectedWords}
//                     setSelectedWords={setSelectedWords}
//                     onSearch={handleSearch}
//                 />
//             </div>

//             {searchResults && (
//                 <div className="w-full space-y-6">
//                     {/* Exact Match Section */}
//                     <div className="space-y-2">
//                         <h2 className="text-gray-400 text-sm font-mono">Exact Match</h2>
//                         <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors">
//                             <div className="flex items-center space-x-2 text-gray-300 font-mono">
//                                 <TiTickOutline className="h-5 w-5 text-green-500" /> {/* Added check icon */}
//                                 <span>{searchResults.exactMatch.name.replace('///', '')}</span>
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <span className="text-gray-400">{searchResults.exactMatch.price}</span>
//                                 <button className="px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
//                                     Select
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Suggested Results Section */}
//                     <div className="space-y-2">
//                         <h2 className="text-gray-400 text-sm font-mono">Suggested Results</h2>
//                         <div className="space-y-2">
//                             {searchResults.suggestedResults.map((result, index) => (
//                                 <div
//                                     key={index}
//                                     className="border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
//                                 >
//                                     <span className="text-gray-300 font-mono">{result.name}</span>
//                                     <div className="flex items-center space-x-4">
//                                         <span className="text-gray-400">{result.price}</span>
//                                         <button className="px-4 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
//                                             Select
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }