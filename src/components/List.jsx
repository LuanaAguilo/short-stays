import ListItem from "./ListItem.jsx";

function List({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default List;
