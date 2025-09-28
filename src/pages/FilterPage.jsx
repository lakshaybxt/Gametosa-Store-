import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const FilterPage = ({ onClose, onApply }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const brands = ["HyperX", "Boat", "Sony", "JBL"];
  const colors = ["Black", "Red", "White", "Blue"];
  const types = ["Wireless", "Wired"];

  const handleApply = () => {
    const filters = {
      brand: selectedBrand || null,
      color: selectedColor || null,
      type: selectedType || null,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
    };
    if (onApply) onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setSelectedBrand("");
    setSelectedColor("");
    setSelectedType("");
    setMinPrice("");
    setMaxPrice("");
  };

  const renderOptions = (options, selected, setSelected) => (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          onClick={() => setSelected(selected === item ? "" : item)}
          aria-pressed={selected === item}
          className={`text-xs px-3 py-1 rounded-full transition ${
            selected === item
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-900 w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-lg font-bold">Filters</h2>
        <button onClick={onClose} className="text-gray-400 text-2xl">
          <FiX />
        </button>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        {renderOptions(brands, selectedBrand, setSelectedBrand)}
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Color</h3>
        {renderOptions(colors, selectedColor, setSelectedColor)}
      </div>

      {/* Type */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Type</h3>
        {renderOptions(types, selectedType, setSelectedType)}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            aria-label="Minimum Price"
            className="w-1/2 bg-gray-800 rounded-lg p-2 text-xs focus:outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            aria-label="Maximum Price"
            className="w-1/2 bg-gray-800 rounded-lg p-2 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="w-1/2 bg-gray-700 text-white rounded-full py-3 font-semibold hover:bg-gray-600 transition"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="w-1/2 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPage;
