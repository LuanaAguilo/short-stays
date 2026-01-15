import List from "../components/List.jsx";

function Home({ items = [], onDelete }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! Here is the list of available apartments:</p>
      <List items={items} onDelete={onDelete} />
    </div>
  );
}

export default Home;
