import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Departments() {
  const nextId = useRef(3);

  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Engineering", institute: "Engineering College" },
    { id: 2, name: "Mechanical Engineering", institute: "Engineering College" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [editId, setEditId] = useState(null);

  const openModal = (dep = null) => {
    if (dep) {
      setEditId(dep.id);
      setName(dep.name);
      setInstitute(dep.institute);
    } else {
      setEditId(null);
      setName("");
      setInstitute("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !institute) return;

    if (editId) {
      setDepartments(
        departments.map((dep) =>
          dep.id === editId ? { id: editId, name, institute } : dep
        )
      );
    } else {
      setDepartments([...departments, { id: nextId.current++, name, institute }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((dep) => dep.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-pink-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow-md">
              Departments
            </h1>
            <Button
              title="Add Department"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>

          {/* Table Glass Card */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "institute"]}
              data={departments}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          {/* Modal Glass Effect */}
          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Department" : "Add Department"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Department Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter department name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Institute"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              placeholder="Enter institute name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Button
              title={editId ? "Update Department" : "Add Department"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}