import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post("/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch {
      alert("Duplicate email!");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow">
        <h3 className="text-center">Register</h3>

        <input className="form-control my-2" placeholder="Name"
          onChange={e => setForm({...form, name:e.target.value})} />

        <input className="form-control my-2" placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})} />

        <input type="password" className="form-control my-2" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})} />

        <button className="btn btn-primary w-100 mt-2" onClick={submit}>
          Register
        </button>
      </div>
    </div>
  );
}