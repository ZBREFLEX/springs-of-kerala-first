import "./admin.css";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ setActive }) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">Admin Panel</div>

      <nav className="admin-nav">
        <button onClick={() => setActive("home")}>Dashboard</button>
        <button onClick={() => setActive("gallery")}>Gallery</button>
        <button onClick={() => setActive("vehicles")}>Vehicles</button>
        <button onClick={() => setActive("categories")}>Categories</button>
      </nav>

      <button className="admin-nav admin-logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}
