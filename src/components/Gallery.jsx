"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/client"

import "./Gallery.css"

const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  /* ---------------- FETCH GALLERY ---------------- */
  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("gallery")
      .select("id, name, duration, image_url")
      .order("created_at", { ascending: false })

    if (!error) {
      setGallery(data || [])
    }

    setLoading(false)
  }

  /* ---------------- SCROLL ---------------- */
  const scroll = (direction) => {
    const container = document.querySelector(".gallery-grid-scroll")
    if (!container) return

    const scrollAmount = 400
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const handleViewGallery = () => {
    navigate("/gallery")
  }

  /* ---------------- UI ---------------- */
  return (
    <section id="Gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">
          Experience the beauty of Kerala through our collection
        </p>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading gallery...</p>
        ) : gallery.length === 0 ? (
          <p style={{ textAlign: "center" }}>No gallery items found</p>
        ) : (
          <div className="gallery-carousel-container">
            <button
              className="scroll-arrow scroll-left"
              onClick={() => scroll("left")}
            >
              ❮
            </button>

            <div className="gallery-grid-scroll">
              {gallery.map((item) => (
                <div key={item.id} className="destination-card">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />

                  <div className="destination-overlay">
                    <h3 className="destination-name">{item.name}</h3>
                    <p className="destination-tours">{item.duration}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-arrow scroll-right"
              onClick={() => scroll("right")}
            >
              ❯
            </button>
          </div>
        )}

        <div className="gallery-button-container">
          <button className="view-gallery-btn" onClick={handleViewGallery}>
            View Gallery
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
