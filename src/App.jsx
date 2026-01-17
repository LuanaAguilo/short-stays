import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import apartmentsData from "./data/items.json";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Apartments from "./pages/Apartments.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditApartment from "./pages/EditApartment.jsx";

function App() {
  const [items, setItems] = useState(apartmentsData);
  const [editingItem, setEditingItem] = useState(null);

  function handleAdd(item) {
    setItems((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(),
      },
    ]);
  }

  function handleEdit(updatedItem) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === updatedItem.id ? updatedItem : it
      )
    );
    setEditingItem(null);
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function startEditing(id) {
    const foundItem = items.find((it) => it.id === id);
    setEditingItem(foundItem ?? null);
  }

  return (
    <div className="app-container">
      <Navbar />

      <div className="content">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<Home items={items} onDelete={handleDelete} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/apartments"
              element={
                <Apartments
                  items={items}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  onStartEdit={startEditing}
                />
              }
            />
            <Route
              path="/apartments/:id"
              element={
                <ItemDetails
                  items={items}
                  onDelete={handleDelete}
                />
              }
            />
            <Route
              path="/apartments/:id/edit"
              element={
                <EditApartment
                  items={items}
                  editingItem={editingItem}
                  onStartEdit={startEditing}
                  onSave={handleEdit}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
