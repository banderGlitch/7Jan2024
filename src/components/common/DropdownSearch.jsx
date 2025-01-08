import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';

const CHUNK_SIZE = 500; // Load 500 options at a time

export default function DropdownSearch({ placeholder, words }) {
  const [options, setOptions] = useState([]);
  const [loadedChunks, setLoadedChunks] = useState(1);

  // Load initial options and chunk handling
  useEffect(() => {
    const loadChunk = () => {
      const newChunk = words
        .slice(0, CHUNK_SIZE * loadedChunks)
        .map((word) => ({ value: word, label: word }));
      setOptions(newChunk);
    };

    loadChunk();
  }, [loadedChunks, words]);

  // Load more chunks when scrolled to the bottom
  const loadMoreChunks = () => {
    if (loadedChunks * CHUNK_SIZE < words.length) {
      setLoadedChunks((prev) => prev + 1);
    }
  };

  // Custom MenuList for virtualization
  const MenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 35;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={35} // Adjust height of each item
        initialScrollOffset={initialOffset}
        onScroll={({ scrollOffset, scrollHeight }) => {
          if (scrollOffset + maxHeight >= scrollHeight - 50) {
            loadMoreChunks(); // Load more chunks when near the bottom
          }
        }}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>{children[index]}</div>
        )}
      </List>
    );
  };

  // Custom styles for dropdown
  const customStyles = {
    control: (base) => ({
      ...base,
      background: '#1f2937',
      borderColor: '#374151',
      color: '#D1D5DB',
      boxShadow: 'none',
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
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? '#059669'
        : isFocused
        ? '#374151'
        : '#1f2937',
      color: '#D1D5DB',
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      components={{ MenuList }}
      placeholder={placeholder || 'Search...'}
      isClearable
      isSearchable
    />
  );
}

// import React from 'react';
// import Select from 'react-select';
// import { words } from '../../assets/words'; // Import words array

// export default function DropdownSearch({ placeholder, onChange }) {
//     // Format words for react-select
//     const options = words.map((word) => ({
//         value: word,
//         label: word,
//     }));

//     // Custom styles for react-select
//     const customStyles = {
//         control: (base) => ({
//             ...base,
//             background: '#1f2937',
//             borderColor: '#374151',
//             color: '#D1D5DB',
//             boxShadow: 'none',
//             '&:hover': {
//                 borderColor: '#4B5563',
//             },
//         }),
//         menu: (base) => ({
//             ...base,
//             background: '#1f2937',
//             border: '1px solid #374151',
//             zIndex: 1050, // Ensure it is above other elements
//             position: 'absolute', // Ensure it renders properly
//         }),
//         option: (base, { isFocused, isSelected }) => ({
//             ...base,
//             backgroundColor: isSelected
//                 ? '#059669'
//                 : isFocused
//                     ? '#374151'
//                     : '#1f2937',
//             color: '#D1D5DB',
//             '&:active': {
//                 backgroundColor: '#059669',
//             },
//         }),
//         input: (base) => ({
//             ...base,
//             color: '#D1D5DB',
//         }),
//         singleValue: (base) => ({
//             ...base,
//             color: '#D1D5DB',
//         }),
//         dropdownIndicator: (base) => ({
//             ...base,
//             color: '#6B7280',
//             '&:hover': {
//                 color: '#9CA3AF',
//             },
//         }),
//         clearIndicator: (base) => ({
//             ...base,
//             color: '#6B7280',
//             '&:hover': {
//                 color: '#9CA3AF',
//             },
//         }),
//     };

//     // Highlight matched text in the dropdown options
//     const formatOptionLabel = ({ label }, { inputValue }) => {
//         if (!inputValue) return label;

//         const index = label.toLowerCase().indexOf(inputValue.toLowerCase());
//         if (index === -1) return label;

//         return (
//             <>
//                 {label.slice(0, index)}
//                 <span className="text-blue-400 font-medium">
//                     {label.slice(index, index + inputValue.length)}
//                 </span>
//                 {label.slice(index + inputValue.length)}
//             </>
//         );
//     };

//     return (
//         <Select
//             options={options}
//             onChange={onChange}
//             styles={customStyles}
//             formatOptionLabel={formatOptionLabel}
//             placeholder={placeholder || 'Search...'}
//             isClearable
//             isSearchable
//             components={{
//                 IndicatorSeparator: () => null, // Remove separator
//             }}
//         />
//     );
// }
