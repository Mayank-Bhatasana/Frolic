import { useEffect, useRef, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { getInstitutes } from "../api/services";

export default function Institutes() {
  const nextId = useRef(3);

  const [institutes, setInstitutes] = useState([
    { id: 1, name: "Engineering College", location: "New York" },
    { id: 2, name: "Business School", location: "California" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await getInstitutes();
        const fetchedInstitutes = (response.data?.institutes || []).map((institute) => ({
          id: institute._id,
          name: institute.InstituteName,
          location: institute.InstituteLocation || "-",
        }));
        setInstitutes(fetchedInstitutes);
        setFetchError("");
      } catch (error) {
        setFetchError("Could not load institutes from server. Showing local data.");
        console.error("Failed to fetch institutes", error);
      }
    };

    fetchInstitutes();
  }, []);

  const openModal = (ins = null) => {
    if (ins) {
      setEditId(ins.id);
      setName(ins.name);
      setLocation(ins.location);
    } else {
      setEditId(null);
      setName("");
      setLocation("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !location) return;

    if (editId) {
      setInstitutes(
        institutes.map((ins) =>
          ins.id === editId ? { id: editId, name, location } : ins
        )
      );
    } else {
      setInstitutes([...institutes, { id: nextId.current++, name, location }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setInstitutes(institutes.filter((ins) => ins.id !== id));
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
              Institutes
            </h1>
            <Button
              title="Add Institute"
              onClick={() => openModal()}
              className="px-6 py-2 rounded-3xl bg-linear-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 shadow-lg text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            />
          </div>
          {fetchError && (
            <p className="mb-4 text-sm text-red-600">{fetchError}</p>
          )}

          {/* Table Glass Card */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-500 hover:shadow-2xl">
            <Table
              columns={["id", "name", "location"]}
              data={institutes}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          </div>

          {/* Modal Glass Effect */}
          <Modal
            isOpen={modalOpen}
            title={editId ? "Edit Institute" : "Add Institute"}
            onClose={() => setModalOpen(false)}
            className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-transform duration-500 transform scale-100"
          >
            <Input
              label="Institute Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter institute name"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-400"
            />
            <Button
              title={editId ? "Update Institute" : "Add Institute"}
              onClick={handleSave}
              className="w-full h-10 rounded-3xl bg-linear-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mt-4"
            />
          </Modal>

        </div>
      </div>
    </div>
  );
}
