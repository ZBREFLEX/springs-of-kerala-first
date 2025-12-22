import './About.css';

export default function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">About KeralaPath</h2>
            <p className="lead mb-4">
              For over a decade, KeralaPath has been crafting unforgettable journeys through
              God's Own Country. We are passionate about showcasing the rich cultural heritage,
              pristine natural beauty, and warm hospitality that Kerala is renowned for.
            </p>
            <p className="mb-4">
              Our team of experienced travel experts ensures every trip is personalized to your
              preferences, whether you seek adventure in the Western Ghats, tranquility in the
              backwaters, or cultural immersion in historic towns.
            </p>

            <div className="row g-4 mt-4">
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">10+</h3>
                  <p className="text-muted">Years Experience</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">50+</h3>
                  <p className="text-muted">Destinations</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">5000+</h3>
                  <p className="text-muted">Happy Travelers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src="https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Kerala Tourism"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
