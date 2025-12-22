import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10">
            <h1 className="display-3 fw-bold text-white mb-4 hero-title">
              Discover God's Own Country
            </h1>
            <h3 className="display-7 fw-bold text-white mb-4 hero-title typing-text">
              Welcome to Kerala Path Tours and Travels
            </h3>
            {/* <p className="lead text-white mb-5 hero-subtitle">
              Kerala Path Tours & Travels delivers dependable, fully-covered travel services across Kerala, 
              offering taxi packages, car rentals, and Tempo Travellers for every type of trip. Our vehicles 
              are maintained and sanitized regularly to ensure safety and comfort in all conditions. We operate
               with our own fleet and trained drivers who understand Kerala’s routes, culture, and major destinations,
                making your travel smooth and efficient. Backed by a support team available around the clock, Kerala 
                Path Tours & Travels focuses on reliable service, transparent pricing, and a hassle-free travel 
                experience for customers exploring any part of Kerala.
            </p> */}
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href="#Vehicle" className="btn btn-light btn-lg px-5 rounded-pill">
                Vehicle Services
              </a>
              <a href="#contact" className="btn btn-outline-light btn-lg px-5 rounded-pill">
                Plan Your Trip
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
