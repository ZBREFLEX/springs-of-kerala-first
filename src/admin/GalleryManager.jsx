import { useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import "./Gallery.css"

export default function GalleryManager() {
  const [gallery, setGallery] = useState([])
  const [useUpload, setUseUpload] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    image: "",
    file: null,
  })

  /* ---------------- LOAD GALLERY ---------------- */
  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setGallery(data || [])
  }

  /* ---------------- HANDLE INPUTS ---------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "file") {
      setFormData((prev) => ({
        ...prev,
        file: files?.[0] || null,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value ?? "",
      }))
    }
  }

  /* ---------------- ADD IMAGE ---------------- */
  const handleAddImage = async () => {
    if (!formData.name.trim() || !formData.duration.trim()) {
      alert("Name and duration are required")
      return
    }

    if (!useUpload && !formData.image.trim()) {
      alert("Image URL is required")
      return
    }

    if (useUpload && !formData.file) {
      alert("Please select an image file")
      return
    }

    setLoading(true)
    let imageUrl = ""

    try {
      /* ---- Upload to Supabase Storage ---- */
      if (useUpload) {
        const fileExt = formData.file.name.split(".").pop()
        const safeFileName = `${Date.now()}.${fileExt}`
        const filePath = `images/${safeFileName}`

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, formData.file, {
            cacheControl: "3600",
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from("gallery")
          .getPublicUrl(filePath)

        imageUrl = data.publicUrl
      } else {
        imageUrl = formData.image.trim()
      }

      /* ---- Insert DB Record ---- */
      const { error } = await supabase.from("gallery").insert([
        {
          name: formData.name.trim(),
          duration: formData.duration.trim(),
          image_url: imageUrl,
        },
      ])

      if (error) throw error

      /* ---- Reset Form ---- */
      setFormData({
        name: "",
        duration: "",
        image: "",
        file: null,
      })

      setUseUpload(false)
      fetchGallery()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- DELETE ITEM ---------------- */
  const handleDelete = async (id) => {
    await supabase.from("gallery").delete().eq("id", id)
    fetchGallery()
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <h1 className="page-title">Gallery Manager</h1>
      <p className="page-subtitle">Manage destination gallery</p>

      <div className="section-box">
        <h3>Add Destination</h3>

        <div className="toggle-row">
          <button
            type="button"
            className={!useUpload ? "toggle-btn active" : "toggle-btn"}
            onClick={() => {
              setUseUpload(false)
              setFormData((p) => ({ ...p, file: null }))
            }}
          >
            Image URL
          </button>

          <button
            type="button"
            className={useUpload ? "toggle-btn active" : "toggle-btn"}
            onClick={() => {
              setUseUpload(true)
              setFormData((p) => ({ ...p, image: "" }))
            }}
          >
            Upload Image
          </button>
        </div>

        <div className="form-grid">
          <input
            name="name"
            placeholder="Destination Name"
            value={formData.name ?? ""}
            onChange={handleChange}
          />

          <input
            name="duration"
            placeholder="Duration (e.g. 3 Days / 2 Nights)"
            value={formData.duration ?? ""}
            onChange={handleChange}
          />

          {!useUpload ? (
            <input
              key="image-url"
              name="image"
              placeholder="Image URL"
              value={formData.image ?? ""}
              onChange={handleChange}
            />
          ) : (
            <input
              key="image-file"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
            />
          )}

          <button
            className="primary-btn"
            onClick={handleAddImage}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Image"}
          </button>
        </div>
      </div>

      <div className="section-box">
        <h3>Gallery Items</h3>

        <div className="gallery-admin-grid">
          {gallery.map((item) => (
            <div key={item.id} className="gallery-admin-card">
              <img
                src={item.image_url}
                alt={item.name}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />

              <div className="gallery-admin-info">
                <h4>{item.name}</h4>
                <p>{item.duration}</p>
              </div>

              <button
                className="danger-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
