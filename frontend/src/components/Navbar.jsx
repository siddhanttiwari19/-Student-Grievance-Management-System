import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Grievance System</span>

      <div>
        {!token ? (
          <>
            <Link to="/" className="btn btn-light mx-2">Login</Link>
            <Link to="/register" className="btn btn-warning">Register</Link>
          </>
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}