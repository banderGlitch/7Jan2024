import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';

const CHUNK_SIZE = 3000; // Number of items to load per chunk

export default function DropdownSearch({ placeholder, words, onChange }) {
  const [options, setOptions] = useState([]); // Options to display
  const [loadedChunks, setLoadedChunks] = useState(1); // Number of chunks loaded

  // Load initial options
  useEffect(() => {
    loadMoreOptions();
  }, []);

  const loadMoreOptions = () => {
    const nextChunk = words
      .slice(0, loadedChunks * CHUNK_SIZE)
      .map((word) => ({ value: word, label: word }));

    setOptions(nextChunk);
    setLoadedChunks((prev) => prev + 1);
  };

  // Handle search input
  const handleInputChange = (inputValue) => {
    if (!inputValue) {
      // Reset to default when input is cleared
      setOptions(
        words.slice(0, CHUNK_SIZE).map((word) => ({ value: word, label: word }))
      );
      setLoadedChunks(1);
      return;
    }

    // Filter options based on input
    const filtered = words
      .filter((word) => word.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 500); // Limit search results to 500 for performance

    setOptions(filtered.map((word) => ({ value: word, label: word })));
  };

  // Custom MenuList with virtualization
  const MenuList = (props) => {
    const { options, children, maxHeight } = props;

    return (
      <List
        height={maxHeight}
        itemCount={options.length}
        itemSize={35} // Adjust height of each item
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            {children[index]} {/* Virtualized child rendering */}
          </div>
        )}
      </List>
    );
  };

  // Custom styles for the dropdown
  const customStyles = {
    control: (base) => ({
      ...base,
      background: '#1f2937',
      borderColor: '#374151',
      color: '#D1D5DB',
      boxShadow: 'none',
      width: '180px', // Uniform width for dropdowns
      height: '40px', // Consistent height
      borderRadius: '8px', // Rounded corners for a softer look
      fontSize: '14px', // Uniform font size
      '&:hover': {
        borderColor: '#4B5563',
      },
    }),
    menu: (base) => ({
      ...base,
      background: '#1f2937',
      border: '1px solid #374151',
      zIndex: 1050,
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? '#059669' // Selected background color
       // Focused background color
        : '#1f2937',
      color: isSelected ? '#ffffff' : '#D1D5DB', // Selected text color
    }),
    singleValue: (base) => ({
      ...base,
      color: '#ffffff', // Ensure selected text is visible
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      components={{
        MenuList, // Override default MenuList
      }}
      placeholder={placeholder || 'Search...'}
      isClearable
      isSearchable
      onInputChange={handleInputChange} // Custom input handler
      onChange={onChange}
    />
  );
}

