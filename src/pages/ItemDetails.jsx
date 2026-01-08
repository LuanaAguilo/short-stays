import { useParams, Link, useNavigate } from "react-router-dom";

const ItemDetails = ({ items = [], onDelete }) => {
  const { id } = useParams();               // gets the :id from the URL
  const navigate = useNavigate();

  // Find the item from the current app state (NOT from items.json)
  const item = items.find((it) => String(it.id) === String(id));

  // If item is not found, show a clean message
  if (!item) {
    return (
      <div>
        <h2>Apartment not found</h2>
        <p>No apartment exists with id: {id}</p>
        <Link to="/apartments">Back to Apartments</Link>
      </div>
    );
  }

  // Helper to render all key/value pairs (works for any dataset shape)
  const entries = Object.entries(item);

  function handleDeleteClick() {
    if (onDelete) onDelete(item.id);
    navigate("/apartments");
  }

  return (
    <div>
      <h2>Apartment Details</h2>

      {/* Day 4: must have Edit link */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
        <Link to="/apartments">Back</Link>
        <Link to={`/apartments/${item.id}/edit`}>Edit</Link>

        {/* Day 4: delete should work from details too */}
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>

      {/* Display all properties of the item */}
      <div style={{ display: "grid", gap: "8px" }}>
        {entries.map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
