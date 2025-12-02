"use client"

import { useState, useEffect } from "react"
import "./Gallery.css"

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Gallery images with different sizes for masonry layout
  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Kerala Backwaters",
      size: "large",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Tea Plantations",
      size: "small",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Houseboat Sunset",
      size: "small",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/3152128/pexels-photo-3152128.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Beach Paradise",
      size: "large",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Spice Markets",
      size: "small",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Local Culture",
      size: "small",
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/3152121/pexels-photo-3152121.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Mountain Views",
      size: "large",
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
      title: "Temple Architecture",
      size: "small",
    },
  ]

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [galleryImages.length])

  return (
    <section id="Gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">Experience the beauty of Kerala through our collection</p>

        <div className="gallery-carousel-wrapper">
          <div className="gallery-carousel">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`carousel-item ${index === currentIndex ? "active" : ""}`}
                onClick={() => {
                  setSelectedImage(image)
                  setCurrentIndex(index)
                }}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.title} />
                <div className="carousel-overlay">
                  <p className="carousel-title">{image.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-prev-btn" onClick={handlePrevious}>
            ❮
          </button>
          <button className="carousel-next-btn" onClick={handleNext}>
            ❯
          </button>

          {/* Dots Navigation */}
          <div className="carousel-dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {selectedImage && (
          <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedImage(null)}>
                ✕
              </button>
              <button className="nav-btn prev-btn" onClick={handlePrevious}>
                ❮
              </button>
              <img
                src={galleryImages[currentIndex].src || "/placeholder.svg"}
                alt={galleryImages[currentIndex].title}
              />
              <button className="nav-btn next-btn" onClick={handleNext}>
                ❯
              </button>
              <div className="modal-title">{galleryImages[currentIndex].title}</div>
              <div className="modal-counter">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
