import "./admin.css";

export default function DashboardHome() {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Manage your website content and data
      </p>

      <div className="card-grid">
        <div className="card">
          <h3>Gallery</h3>
          <p>Manage website images</p>
        </div>

        <div className="card">
          <h3>Vehicles</h3>
          <p>Update vehicle pricing</p>
        </div>

        <div className="card">
          <h3>Packages</h3>
          <p>Edit tour packages</p>
        </div>
      </div>
    </>
  );
}
