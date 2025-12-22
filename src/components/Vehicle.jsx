import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import WhatsAppButton from "./WhatsAppButton";
import "./Vehicle.css";

export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchVehicles();
    fetchCategories();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("vehicles")
      .select(
        `
        id,
        name,
        capacity,
        price,
        image,
        available,
        features,
        description,
        vehicle_categories ( name )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
    } else {
      setVehicles(data || []);
    }

    setLoading(false);
  };
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("vehicle_categories")
      .select("id, name")
      .order("name");

    if (error) {
      console.error("Category fetch error:", error);
    } else {
      setCategories(data || []);
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const typeName = v.vehicle_categories?.name;

    const typeMatch = selectedType === "All" || typeName === selectedType;

    const availabilityMatch = !showAvailableOnly || v.available === true;

    return typeMatch && availabilityMatch;
  });

  return (
    <section id="vehicle" className="py-5 bg-white">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="display-5 fw-bold">Our Services</h2>
          <p className="text-muted">
            Choose the perfect vehicle for your Kerala adventure
          </p>
        </div>

        {/* Filters */}
        {/* Category Filters */}
        {/* Filters */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {/* ALL */}
          <button
            className={`btn btn-sm rounded-pill ${
              selectedType === "All" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedType("All")}
          >
            All
          </button>

          {/* CATEGORY BUTTONS */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn btn-sm rounded-pill ${
                selectedType === cat.name
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setSelectedType(cat.name)}
            >
              {cat.name}
            </button>
          ))}

          {/* AVAILABLE ONLY */}
          <button
            className={`btn btn-sm rounded-pill ${
              showAvailableOnly ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          >
            Available Only
          </button>
        </div>

        {/* Vehicles */}
        <div className="row g-4">
          {loading && <p className="text-center">Loading vehicles...</p>}

          {!loading &&
            filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="col-lg-4 col-md-6">
                <div className="card vehicle-card h-100">
                  <div className="vehicle-image-wrapper position-relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="vehicle-image"
                    />
                    <span className="badge bg-success position-absolute top-0 end-0 m-2">
                      {vehicle.vehicle_categories?.name}
                    </span>
                  </div>

                  <div className="card-body p-4">
                    <h5 className="fw-bold">{vehicle.name}</h5>

                    <p className="small text-muted">{vehicle.description}</p>

                    <p className="fw-semibold mb-2">👥 {vehicle.capacity}</p>

                    {vehicle.features?.length > 0 && (
                      <ul className="list-unstyled small mb-3">
                        {vehicle.features.map((f, i) => (
                          <li key={i}>✔ {f}</li>
                        ))}
                      </ul>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">
                        ₹{vehicle.price}/day
                      </span>

                      <WhatsAppButton
                        vehicleName={vehicle.name}
                        price={vehicle.price}
                        description={vehicle.description}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {!loading && filteredVehicles.length === 0 && (
            <p className="text-center text-muted">No vehicles found</p>
          )}
        </div>
      </div>
    </section>
  );
}
