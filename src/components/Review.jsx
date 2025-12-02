"use client"

import "./Review.css"
import { useState } from "react"

export default function Review() {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      date: "2 weeks ago",
      text: "Amazing experience with Spring of Kerala! The vehicle was comfortable and the driver was very professional. Highly recommended for anyone visiting Kerala.",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Priya Singh",
      location: "Mumbai",
      rating: 5,
      date: "1 month ago",
      text: "Excellent service! The entire booking process was smooth and the vehicle quality exceeded our expectations. Definitely booking again for our next Kerala trip!",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Bangalore",
      rating: 4,
      date: "1 month ago",
      text: "Very good service with clean vehicles and courteous drivers. The only thing that could be improved is the availability of booking slots during peak season.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      location: "USA",
      rating: 5,
      date: "2 months ago",
      text: "Outstanding! The houseboat journey was magical and the rental process was hassle-free. The team made our Kerala experience unforgettable!",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Vikram Desai",
      location: "Pune",
      rating: 5,
      date: "2 months ago",
      text: "Best rental service in Kerala! The vehicles are well-maintained and the customer support is responsive. Worth every rupee spent!",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "Emma Thompson",
      location: "UK",
      rating: 4,
      date: "3 months ago",
      text: "Great experience overall. The vehicles are comfortable and the service was reliable. Minor delay in one pickup but quickly resolved.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
  })

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
            ★
          </span>
        ))}
      </div>
    )
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (formData.name && formData.location && formData.text) {
      const newReview = {
        id: reviews.length + 1,
        name: formData.name,
        location: formData.location,
        rating: formData.rating,
        date: "Just now",
        text: formData.text,
        image:
          "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      }
      setReviews([newReview, ...reviews])
      setFormData({ name: "", location: "", rating: 5, text: "" })
      setShowWriteReview(false)
    }
  }

  return (
    <section id="reviews" className="review-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="review-title">Customer Reviews</h2>
          <p className="review-subtitle">See what travelers say about our premium vehicle rental services</p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-12">
            <div className="rating-summary">
              <div className="rating-box">
                <div className="rating-number">{averageRating}</div>
                <div className="rating-stars">{renderStars(Math.round(averageRating))}</div>
                <div className="rating-count">Based on {reviews.length} reviews</div>
              </div>
              <button className="btn btn-write-review" onClick={() => setShowWriteReview(!showWriteReview)}>
                <i className="bi bi-pencil-square"></i> Write a Review
              </button>
            </div>
          </div>
        </div>

        {showWriteReview && (
          <div className="write-review-modal">
            <div className="write-review-form">
              <div className="form-header">
                <h3>Share Your Experience</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowWriteReview(false)}
                  style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="City or Country"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rating *</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${formData.rating >= star ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleFormChange}
                    placeholder="Share your experience with us..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success btn-submit">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="reviews-scroll-section">
          <h3 className="scroll-section-title">Latest Reviews</h3>
          <div className="reviews-horizontal-scroll">
            {reviews.map((review) => (
              <div key={review.id} className="review-card-horizontal">
                <div className="review-header">
                  <img src={review.image || "/placeholder.svg"} alt={review.name} className="reviewer-avatar" />
                  <div className="reviewer-info">
                    <h5 className="reviewer-name">{review.name}</h5>
                    <p className="reviewer-location">
                      <i className="bi bi-geo-alt-fill"></i> {review.location}
                    </p>
                  </div>
                </div>

                <div className="review-rating mb-2">{renderStars(review.rating)}</div>

                <p className="review-date">{review.date}</p>

                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {showAllReviews && (
          <div className="all-reviews-horizontal">
            <h3 className="all-reviews-title">All Customer Reviews</h3>
            <div className="reviews-horizontal-scroll-full">
              {reviews.map((review) => (
                <div key={review.id} className="review-card-horizontal">
                  <div className="review-header">
                    <img src={review.image || "/placeholder.svg"} alt={review.name} className="reviewer-avatar" />
                    <div className="reviewer-info">
                      <h5 className="reviewer-name">{review.name}</h5>
                      <p className="reviewer-location">
                        <i className="bi bi-geo-alt-fill"></i> {review.location}
                      </p>
                    </div>
                  </div>

                  <div className="review-rating mb-2">{renderStars(review.rating)}</div>

                  <p className="review-date">{review.date}</p>

                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="text-center mt-5">
            <button className="btn btn-success btn-lg px-5" onClick={() => setShowAllReviews(!showAllReviews)}>
              {showAllReviews ? "Show Less" : `View All Reviews (${reviews.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
