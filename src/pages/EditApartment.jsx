import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

function EditApartment({ items, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = items.find((it) => String(it.id) === String(id));

  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState(item?.price ?? "");

  if (!item) return <Navigate to="*" />;

  function handleSubmit(e) {
    e.preventDefault();

    const updatedItem = {
      ...item,
      name: name.trim(),
      price: Number(price),
    };

    onSave(updatedItem);
    navigate(`/apartments/${item.id}`);
  }

  return (
    <div>
      <h2>Edit Apartment</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
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
