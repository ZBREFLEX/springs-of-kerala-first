import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import "./vehicle.css";

export default function VehicleManager() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
const [filterAvailability, setFilterAvailability] = useState("all");


  const [vehicleData, setVehicleData] = useState({
    name: "",
    capacity: "",
    price: "",
    category_id: "",
    imageUrl: "",
    imageFile: null,
    features: "",
    description: "",
    available: true,
  });

  /* ---------------- FETCH ---------------- */

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("vehicle_categories")
      .select("*")
      .order("name");
    setCategories(data || []);
  };

  const fetchVehicles = async () => {
    const { data } = await supabase
      .from("vehicles")
      .select(`
  id,
  name,
  capacity,
  price,
  image,
  features,
  description,
  available,
  category_id,
  vehicle_categories(name)
`)

      .order("created_at", { ascending: false });

    setVehicles(data || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchVehicles();
  }, []);

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImage = async () => {
    if (!vehicleData.imageFile) return vehicleData.imageUrl;

    const ext = vehicleData.imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("vehicle-images")
      .upload(fileName, vehicleData.imageFile);

    if (error) {
      alert("Image upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("vehicle-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  /* ---------------- ADD / UPDATE ---------------- */

  const saveVehicle = async (e) => {
  e.preventDefault();

  

  const {
    name,
    capacity,
    price,
    category_id,
    imageUrl,
    features,
    description,
    available,
  } = vehicleData;

  if (!name || !capacity || !price || !category_id) {
    alert("Fill all required fields");
    return;
  }

  let image = imageUrl;
  if (vehicleData.imageFile) {
    image = await uploadImage();
  }

  const payload = {
    name,
    capacity,
    price: price.toString(), // ✅ FIX
    category_id,
    image,
    features: features
      ? features.split(",").map((f) => f.trim())
      : [],
    description,
    available,
  };

  

  let error;

  if (editingId) {
    ({ error } = await supabase
      .from("vehicles")
      .update(payload)
      .eq("id", String(editingId))); // ✅ FIX
  } else {
    ({ error } = await supabase.from("vehicles").insert([payload]));
  }

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  resetForm();
  fetchVehicles();
};

  /* ---------------- EDIT ---------------- */

  const editVehicle = (v) => {

  setEditingId(v.id);
  setShowForm(true);

  setVehicleData({
    name: v.name || "",
    capacity: v.capacity || "",
    price: v.price || "",
    category_id: v.category_id || "",
    imageUrl: v.image || "",
    imageFile: null,
    features: v.features ? v.features.join(", ") : "",
    description: v.description || "",
    available: v.available ?? true,
  });
};



  /* ---------------- DELETE ---------------- */

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    fetchVehicles();
  };

  /* ---------------- RESET ---------------- */

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setVehicleData({
      name: "",
      capacity: "",
      price: "",
      category_id: "",
      imageUrl: "",
      imageFile: null,
      features: "",
      description: "",
      available: true,
    });
  };
const filteredVehicles = vehicles.filter((v) => {
  const categoryMatch =
    filterCategory === "all" || v.category_id === filterCategory;

  const availabilityMatch =
    filterAvailability === "all" ||
    (filterAvailability === "available" && v.available) ||
    (filterAvailability === "unavailable" && !v.available);

  return categoryMatch && availabilityMatch;
});

  /* ---------------- UI ---------------- */

  return (
    <>
      <h1 className="page-title">Vehicles</h1>
      <p className="page-subtitle">Manage vehicles</p>

      <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
        {editingId ? "Edit Vehicle" : "+ Add Vehicle"}
      </button>

      {showForm && (
        <div className="section-box">
          <h3>{editingId ? "Edit Vehicle" : "Add Vehicle"}</h3>

          <form onSubmit={saveVehicle} className="form-grid">
            <input
              placeholder="Vehicle Name"
              value={vehicleData.name}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, name: e.target.value })
              }
            />

            <input
              placeholder="Capacity"
              value={vehicleData.capacity}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, capacity: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price per day"
              value={vehicleData.price}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, price: e.target.value })
              }
            />

            <select
              value={vehicleData.category_id}
              onChange={(e) =>
                setVehicleData({
                  ...vehicleData,
                  category_id: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Image URL"
              value={vehicleData.imageUrl}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, imageUrl: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setVehicleData({
                  ...vehicleData,
                  imageFile: e.target.files[0],
                })
              }
            />

            <input
              placeholder="Features (comma separated)"
              value={vehicleData.features}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, features: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={vehicleData.description}
              onChange={(e) =>
                setVehicleData({
                  ...vehicleData,
                  description: e.target.value,
                })
              }
            />

            <label>
              <input
                type="checkbox"
                checked={vehicleData.available}
                onChange={(e) =>
                  setVehicleData({
                    ...vehicleData,
                    available: e.target.checked,
                  })
                }
              />{" "}
              Available
            </label>

            <button className="primary-btn">
              {editingId ? "Update Vehicle" : "Save Vehicle"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      {/* VEHICLE LIST */}
      {/* FILTER BAR */}
<div className="filter-bar">
  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
  >
    <option value="all">All Categories</option>
    {categories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>

  <select
    value={filterAvailability}
    onChange={(e) => setFilterAvailability(e.target.value)}
  >
    <option value="all">All Status</option>
    <option value="available">Available</option>
    <option value="unavailable">Not Available</option>
  </select>
</div>

      {/* VEHICLE LIST */}
<div className="card-grid">
  {vehicles.map((v) => (
    <div className="card" key={v.id}>
      {/* IMAGE */}
      {v.image && (
        <img
          src={v.image}
          alt={v.name}
          className="vehicle-image"
        />
      )}

      {/* NAME */}
      <h3>{v.name}</h3>

      {/* BASIC INFO */}
      <p><strong>Capacity:</strong> {v.capacity}</p>
      <p><strong>Price:</strong> ₹ {v.price} / day</p>
      <p><strong>Category:</strong> {v.vehicle_categories?.name}</p>

      {/* AVAILABILITY */}
      <p className="status">
  Status: {v.available ? "Available ✅" : "Not Available ❌"}
</p>


      {/* FEATURES */}
      {v.features && v.features.length > 0 && (
        <div className="features">
          <strong>Features:</strong>
          <ul>
            {v.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* DESCRIPTION */}
      {v.description && (
        <p className="description">
          <strong>Description:</strong> {v.description}
        </p>
      )}

      {/* ACTIONS */}
      <div className="card-actions">
        <button
          className="secondary-btn"
          onClick={() => editVehicle(v)}
        >
          Edit
        </button>

        <button
          className="danger-btn"
          onClick={() => deleteVehicle(v.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </>
  );
}
