import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Winners() {
  const nextId = useRef(3);

  const [winners, setWinners] = useState([
    { id: 1, name: "John Doe", position: "1st" },
    { id: 2, name: "Jane Smith", position: "2nd" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [editId, setEditId] = useState(null);

  const openModal = (w = null) => {
    if (w) {
      setEditId(w.id);
      setName(w.name);
      setPosition(w.position);
    } else {
      setEditId(null);
      setName("");
      setPosition("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !position) return;

    if (editId) {
      setWinners(
        winners.map((w) => (w.id === editId ? { id: editId, name, position } : w))
      );
    } else {
      setWinners([...winners, { id: nextId.current++, name, position }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setWinners(winners.filter((w) => w.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-pink-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-md">
              Winners
            </h1>
            <Button
              title="Add Winner"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "position"]}
              data={winners}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Winner" : "Add Winner"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Winner Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter winner name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />

            <Button
              title={editId ? "Update Winner" : "Add Winner"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}