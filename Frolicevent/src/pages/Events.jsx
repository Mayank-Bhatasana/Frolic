import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Events() {
  const nextId = useRef(3);

  const [events, setEvents] = useState([
    { id: 1, name: "Tech Conference", date: "2026-05-01" },
    { id: 2, name: "Business Meetup", date: "2026-05-15" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  const openModal = (ev = null) => {
    if (ev) {
      setEditId(ev.id);
      setName(ev.name);
      setDate(ev.date);
    } else {
      setEditId(null);
      setName("");
      setDate("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !date) return;

    if (editId) {
      setEvents(events.map((ev) => (ev.id === editId ? { id: editId, name, date } : ev)));
    } else {
      setEvents([...events, { id: nextId.current++, name, date }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-pink-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-md">
              Events
            </h1>
            <Button
              title="Add Event"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>

          {/* Table Glass Card */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "date"]}
              data={events}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          {/* Modal Glass Effect */}
          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Event" : "Add Event"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Event Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Button
              title={editId ? "Update Event" : "Add Event"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}