export default function WhatsAppButton({
  vehicleName,
  price,
  description,
  phone = "918714191755",
  className = "btn btn-success btn-sm rounded-pill",
}) {
  const message = `I am interested in the following vehicle:

• Vehicle: ${vehicleName}
• Price: ₹${price}/day
• Description: ${description}`;

  const encodedMessage = encodeURIComponent(message);

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      WhatsApp Now
    </a>
  );
}
