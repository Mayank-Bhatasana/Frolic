import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Groups() {
  const nextId = useRef(3);

  const [groups, setGroups] = useState([
    { id: 1, name: "Group A", event: "Tech Conference" },
    { id: 2, name: "Group B", event: "Business Meetup" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [editId, setEditId] = useState(null);

  const openModal = (grp = null) => {
    if (grp) {
      setEditId(grp.id);
      setName(grp.name);
      setEvent(grp.event);
    } else {
      setEditId(null);
      setName("");
      setEvent("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !event) return;

    if (editId) {
      setGroups(groups.map((g) => (g.id === editId ? { id: editId, name, event } : g)));
    } else {
      setGroups([...groups, { id: nextId.current++, name, event }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-pink-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-md">
              Groups
            </h1>
            <Button
              title="Add Group"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "event"]}
              data={groups}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Group" : "Add Group"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Enter event name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />

            <Button
              title={editId ? "Update Group" : "Add Group"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}