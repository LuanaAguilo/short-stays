import { useState } from "react";
import apartmentsData from "../data/items.json";
import List from "../components/List.jsx";

function Apartments() {
  const [apartments, setApartments] = useState(apartmentsData);

  function handleDelete(apartmentId) {
    const filteredApartments = apartments.filter((apt) => apt.id !== apartmentId);
    setApartments(filteredApartments);
  }

  return (
    <div>
      <h2>Apartments</h2>
      <p>Loaded from src/data/items.json</p>

      <List items={apartments} onDelete={handleDelete} />
    </div>
  );
}

export default Apartments;
