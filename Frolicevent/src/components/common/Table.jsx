// src/components/common/Table.jsx
function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30">
        <thead className="text-left text-purple-800 border-b border-white/30">
          <tr>
            {columns.map((col) => <th key={col} className="p-3">{col.toUpperCase()}</th>)}
            {(onEdit || onDelete) && <th className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-white/30 transition-all duration-300 rounded-xl">
              {columns.map((col) => <td key={col} className="p-3">{row[col]}</td>)}
              {(onEdit || onDelete) && (
                <td className="p-3 flex space-x-2">
                  {onEdit && <button onClick={() => onEdit(row)} className="px-3 py-1 bg-yellow-400/70 hover:bg-yellow-500/70 rounded-xl shadow-lg transition-all duration-300">Edit</button>}
                  {onDelete && <button onClick={() => onDelete(row.id)} className="px-3 py-1 bg-red-500/70 hover:bg-red-600/70 rounded-xl shadow-lg transition-all duration-300">Delete</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;