import { useEffect, useState } from "react";
import API from "../api/api";
import GrievanceCard from "../components/GrievanceCard";

export default function Dashboard() {
  const [form, setForm] = useState({});
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await API.get("/grievances");
    setList(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (editId) {
      await API.put(`/grievances/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/grievances", form);
    }
    setForm({});
    load();
  };

  const deleteItem = async (id) => {
    await API.delete(`/grievances/${id}`);
    load();
  };

  const searchData = async () => {
    const res = await API.get(`/grievances/search?title=${search}`);
    setList(res.data);
  };

  const editItem = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  return (
    <div className="container mt-4">

      {/* FORM */}
      <div className="card p-3 mb-3 shadow">
        <h4>{editId ? "Update Grievance" : "Submit Grievance"}</h4>

        <input className="form-control my-2" placeholder="Title"
          value={form.title || ""}
          onChange={e => setForm({...form, title:e.target.value})} />

        <textarea className="form-control my-2" placeholder="Description"
          value={form.description || ""}
          onChange={e => setForm({...form, description:e.target.value})} />

        <select className="form-control my-2"
          value={form.category || ""}
          onChange={e => setForm({...form, category:e.target.value})}>
          <option value="">Select Category</option>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <select className="form-control my-2"
          value={form.status || "Pending"}
          onChange={e => setForm({...form, status:e.target.value})}>
          <option>Pending</option>
          <option>Resolved</option>
        </select>

        <button className="btn btn-primary" onClick={submit}>
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="d-flex mb-3">
        <input className="form-control me-2"
          placeholder="Search grievance..."
          onChange={e => setSearch(e.target.value)} />

        <button className="btn btn-info" onClick={searchData}>
          Search
        </button>

        <button className="btn btn-secondary ms-2" onClick={load}>
          Reset
        </button>
      </div>

      {/* LIST */}
      {list.map(item => (
        <GrievanceCard
          key={item._id}
          data={item}
          onDelete={deleteItem}
          onEdit={editItem}
        />
      ))}
    </div>
  );
}