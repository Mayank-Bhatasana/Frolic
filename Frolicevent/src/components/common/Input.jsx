// src/components/common/Input.jsx
export default function Input({ label, value, onChange, placeholder, className }) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="text-purple-700 font-semibold mb-1">{label}</label>
      <input 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} px-4 py-2 outline-none text-purple-800`}
      />
    </div>
  );
}