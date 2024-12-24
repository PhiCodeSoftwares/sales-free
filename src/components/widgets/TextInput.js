import React from "react";

const TextInput = ({ label, type, name, value, onChange, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
        required={required}
      />
    </div>
  );
};

export default TextInput;
