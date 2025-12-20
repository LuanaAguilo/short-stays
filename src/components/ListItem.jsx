function ListItem({ item, onDelete }) {
  const isExpensive = item.price >= 2500;

  return (
    <li style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
      <span style={{ width: "24px" }}>{isExpensive ? "✔️" : "❌"}</span>

      <div style={{ flex: 1 }}>
        <strong>{item.name}</strong> — ${item.price}
      </div>

      <button type="button" onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </li>
  );
}

export default ListItem;
