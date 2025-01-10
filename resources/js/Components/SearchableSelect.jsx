import React, { useState } from "react";

const SearchableSelect = ({ options, placeholder, onChange, name, selected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected ? options.find((option) => option.value === selected.value)?.label : "");
  const [realValue, setRealValue] = useState(selected ? selected.value : '');

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    setSelectedValue(value.label);
    setRealValue(value.value);
    setSearchTerm("")
    if (onChange) {
        onChange(value);
    }
    setIsOpen(false);
  };

  const handleSearch = (value) => {
    setSelectedValue("")
    setSearchTerm(value)
  }

  const handleLostFocus = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }

  return (
    <div className="searchable-select w-full">
      <div className="dropdown">
        <input type="hidden" name={name} value={realValue} />
        <input
          type="text"
          placeholder={placeholder || "- Pilih Mahasiswa -"}
          value={selectedValue || searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={(e) => setIsOpen(true)}
          onBlur={handleLostFocus}
          className="text-md px-4 py-2 rounded-lg border-neutral-400 border-[1.5px] w-full"
        />
        {isOpen && (
          <ul className="dropdown-menu">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="dropdown-item"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="dropdown-item">No results found</li>
            )}
          </ul>
        )}
      </div>
      <style jsx>{`
        .searchable-select {
          position: relative;
        }
        .dropdown {
          position: relative;
        }
        .dropdown-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 200px;
          overflow-y: auto;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          z-index: 10;
          margin-top: 4px;
        }
        .dropdown-item {
          padding: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dropdown-item:hover {
          background: #f0f0f0;
        }
        .dropdown-item:active {
          background: #ddd;
        }
      `}</style>
    </div>
  );
};

export default SearchableSelect;
