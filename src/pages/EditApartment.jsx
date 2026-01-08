import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

function EditApartment({ items, onSave }) {
  const { id } = useParams();           // reads :id from /apartments/:id/edit
  const navigate = useNavigate();

  // Find the item based on the URL id
  const item = items.find((it) => String(it.id) === String(id));

  // If item doesn't exist, go to 404
  if (!item) return <Navigate to="*" />;

  // Controlled inputs (prefilled)
  const [title, setTitle] = useState(item.title ?? "");
  const [price, setPrice] = useState(item.price ?? "");
  const [isAvailable, setIsAvailable] = useState(Boolean(item.isAvailable));

  // If the user navigates between edit pages without remounting, keep values in sync
  useEffect(() => {
    setTitle(item.title ?? "");
    setPrice(item.price ?? "");
    setIsAvailable(Boolean(item.isAvailable));
  }, [id]); // runs when URL changes

  function handleSubmit(e) {
    e.preventDefault();

    // Build updated object keeping id
    const updatedItem = {
      ...item,
      title: title.trim(),
      price,
      isAvailable,
    };

    onSave(updatedItem);

    // After saving, go back to the details page
    navigate(`/apartments/${item.id}`);
  }

  return (
    <div>
      <h2>Edit Apartment</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Price
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Available
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditApartment;
