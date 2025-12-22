import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import "./vehicle.css";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("vehicle_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const { error } = await supabase
      .from("vehicle_categories")
      .insert([{ name: categoryName }]);

    if (!error) {
      setCategoryName("");
      fetchCategories();
    }
  };

  const deleteCategory = async (id) => {
  const confirmDelete = window.confirm(
    "Deleting this category will remove all vehicles under it. Continue?"
  );
  if (!confirmDelete) return;

  // 1. delete vehicles
  await supabase.from("vehicles").delete().eq("category_id", id);

  // 2. delete category
  const { error } = await supabase
    .from("vehicle_categories")
    .delete()
    .eq("id", id);

  if (!error) fetchCategories();
};


  return (
    <>
      <h1 className="page-title">Vehicle Categories</h1>
      <p className="page-subtitle">Add or remove vehicle categories</p>

      <div className="section-box">
        <h3>Add Category</h3>
        <form onSubmit={addCategory} className="form-grid">
          <input
            type="text"
            placeholder="Category name (SUV, Sedan...)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className="primary-btn">Save Category</button>
        </form>
      </div>

      <div className="section-box">
        <h3>Categories</h3>

        <div className="category-list">
          {categories.map((cat) => (
            <div key={cat.id} className="category-row">
              <span>{cat.name}</span>
              <button
                className="danger-btn"
                onClick={() => deleteCategory(cat.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
