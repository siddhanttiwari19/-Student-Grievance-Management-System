export default function GrievanceCard({ data, onDelete, onEdit }) {
  return (
    <div className="card shadow-sm p-3 mb-3">
      <h5>{data.title}</h5>
      <p>{data.description}</p>

      <div className="d-flex justify-content-between">
        <span className="badge bg-info">{data.category}</span>
        <span className={`badge ${data.status === "Resolved" ? "bg-success" : "bg-warning"}`}>
          {data.status}
        </span>
      </div>

      <div className="mt-2">
        <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(data)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(data._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}