import "./Vehicle.css"

const vehicles = [
  {
    id: 1,
    name: "Toyota Etios",
    type: "Sedan",
    capacity: "4 Passengers",
    pricePerDay: "₹1,500",
    image: "https://cdni.autocarindia.com/ExtraImages/20140327112642_etios.jpg?w=728&q=75",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  },
   {
    id: 2,
    name: " Maruti Suzuki Dzire",
    type: "Sedan",
    capacity: "4 Passengers",
    pricePerDay: "₹1,500",
    image: "https://imgd.aeplcdn.com/642x361/n/cw/ec/46045/marutisuzuki-dzire-exterior0.jpeg?wm=1&q=80",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  },
  {
    id: 3,
    name: " Maruti Suzuki Ertiga",
    type: "MPV",
    capacity: "7 Passengers",
    pricePerDay: "₹1,500",
    image: "https://auto.hindustantimes.com/cms-images/marutisuzuki_ertiga/images/exterior_marutisuzuki-ertiga2022_front-left-side_1150x666.jpeg?imwidth=930",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  },
  {
    id: 4,
    name: " Toyota Innova ",
    type: "MPV",
    capacity: "7 Passengers",
    pricePerDay: "₹1,500",
    image: "https://5.imimg.com/data5/VE/FU/VN/SELLER-102887681/innova-touring-sport-toyota-car-1000x1000.jpg",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  },
  {
    id: 5,
    name: " Toyota Innova Crysta ",
    type: "MPV",
    capacity: "7 Passengers",
    pricePerDay: "₹1,500",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-3.png?isig=0&q=80",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  },
  {
    id: 6,
    name: " Toyota Innova Hycross ",
    type: "MPV",
    capacity: "7 Passengers",
    pricePerDay: "₹1,500",
    image: "https://imgd.aeplcdn.com/642x361/n/cw/ec/202089/innova-hycross-exterior-left-front-three-quarter.jpeg?isig=0&q=80",
    features: ["Air Conditioning", "Power Steering", "Insurance Included", "GPS Navigation"],
    description: "Perfect for solo travelers and couples. Fuel-efficient and comfortable for city tours.",
    available: true,
  }
]

export default function Vehicle() {
  return (
    <section id="vehicle" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Our Services</h2>
          <p className="lead text-muted">Choose the perfect vehicle for your Kerala adventure</p>
        </div>

        <div className="row g-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="col-lg-4 col-md-6">
              <div className={`card vehicle-card h-100`}>
                <div className="vehicle-image-wrapper">
                  <img src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} className="vehicle-image" />
                  {vehicle.available && (
                    <div className="vehicle-badge">
                      <span className="badge bg-success">{vehicle.type}</span>
                    </div>
                  )}
                </div>

                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-2">{vehicle.name}</h3>
                  <p className="text-muted mb-3 small">{vehicle.description}</p>

                  <div className="capacity-info mb-4 pb-4 border-bottom">
                    <i className="bi bi-people-fill text-success me-2"></i>
                    <span className="fw-semibold">{vehicle.capacity}</span>
                  </div>

                  <ul className="list-unstyled mb-4">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span className="small">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="price-section mb-4 pb-4 border-bottom">
                    <span className="h3 fw-bold text-success">{vehicle.pricePerDay}</span>
                    <span className="text-muted small">/day</span>
                  </div>

                  <button className="btn btn-success w-100 rounded-pill py-2 fw-bold">Whatsapp Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
