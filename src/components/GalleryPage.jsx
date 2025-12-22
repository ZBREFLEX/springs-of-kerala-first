"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/client"
import "./Gallery1.css"

const GalleryPage = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

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

  const handleGoBack = () => {
    navigate("/")
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="gallery-page">
      <div className="gallery-page-header">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Home
        </button>

        <h1 className="gallery-page-title">Full Gallery</h1>
        <p className="gallery-page-subtitle">
          Browse all our destination pictures
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading gallery...</p>
      ) : gallery.length === 0 ? (
        <p style={{ textAlign: "center" }}>No images found</p>
      ) : (
        <div className="gallery-page-grid">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="gallery-page-card"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image_url}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />

              <div className="gallery-page-overlay">
                <h3 className="gallery-page-card-name">{item.name}</h3>
                <p className="gallery-page-card-tours">
                  {item.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- MODAL ---------------- */}
      {selectedImage && (
        <div
          className="gallery-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            <img
              src={selectedImage.image_url}
              alt={selectedImage.name}
            />

            <div className="modal-title">{selectedImage.name}</div>
            <div className="modal-subtitle">
              {selectedImage.duration}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
