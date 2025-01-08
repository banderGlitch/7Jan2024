export default function SearchInterface() {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-mono text-gray-300">/// get . your . name</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-mono">///</span>
            <select className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600 w-32">
              <option value="">word1</option>
              {/* Add more options as needed */}
            </select>
          </div>
  
          <span className="text-gray-500">.</span>
  
          <select className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600 w-32">
            <option value="">word2</option>
            {/* Add more options as needed */}
          </select>
  
          <span className="text-gray-500">.</span>
  
          <select className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600 w-32">
            <option value="">word3</option>
            {/* Add more options as needed */}
          </select>
  
          <button className="bg-green-100 text-green-800 px-6 py-2 rounded-md hover:bg-green-200 transition-colors">
            Search
          </button>
        </div>
      </div>
    );
  }