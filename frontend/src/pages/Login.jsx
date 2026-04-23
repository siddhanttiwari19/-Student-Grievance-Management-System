import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow">
        <h3 className="text-center">Login</h3>

        <input className="form-control my-2" placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})} />

        <input type="password" className="form-control my-2" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})} />

        <button className="btn btn-success w-100 mt-2" onClick={submit}>
          Login
        </button>
      </div>
    </div>
  );
}