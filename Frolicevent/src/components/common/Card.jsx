function Card({ title, value }) {
  return (
    <div className="bg-white shadow p-6 rounded w-52">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Card;