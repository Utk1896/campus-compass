import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px 15px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}
    >
      <input
        type="text"
        placeholder="Search a place"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          outline: 'none',
          width: '220px'
        }}
      />
      <button
        onClick={() => onSearch(query)}
        style={{
          padding: '8px 14px',
          backgroundColor: '#1d3557',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
