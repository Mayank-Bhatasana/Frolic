
export default function Button({ title, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}
    >
      {title}
    </button>
  );
}