import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Participants() {
  const nextId = useRef(3);

  const [participants, setParticipants] = useState([
    { id: 1, name: "John Doe", group: "Group A" },
    { id: 2, name: "Jane Smith", group: "Group B" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [editId, setEditId] = useState(null);

  const openModal = (p = null) => {
    if (p) {
      setEditId(p.id);
      setName(p.name);
      setGroup(p.group);
    } else {
      setEditId(null);
      setName("");
      setGroup("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !group) return;

    if (editId) {
      setParticipants(
        participants.map((p) => (p.id === editId ? { id: editId, name, group } : p))
      );
    } else {
      setParticipants([...participants, { id: nextId.current++, name, group }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-pink-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-md">
              Participants
            </h1>
            <Button
              title="Add Participant"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "group"]}
              data={participants}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Participant" : "Add Participant"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Participant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter participant name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Enter group"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />

            <Button
              title={editId ? "Update Participant" : "Add Participant"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}