// src/components/common/Modal.jsx
export default function Modal({ isOpen, title, children, onClose, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/40 backdrop-blur-md transition-opacity duration-500">
      <div className={`${className || ''} bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-3xl border border-white/30 transition-transform duration-300 transform scale-95`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-purple-700 hover:text-purple-900 font-bold text-lg"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}