// Global CSS for the App layout
import "./App.css";

// React hook used to create and manage component state
import { useState } from "react";

// React Router components used for client-side routing
import { Routes, Route } from "react-router-dom";

// Layout components (always visible)
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

// Page components rendered based on route
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Apartments from "./pages/Apartments.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

// Page for Day 4: Update/Edit form
import EditApartment from "./pages/EditApartment.jsx";

function App() {
  /**
   * items
   * -----
   * This state holds the FULL list of apartments/items.
   * This is the "single source of truth" for the app.
   * Any page that needs items receives them via props.
   */
  const [items, setItems] = useState([]);

  /**
   * editingItem
   * -----------
   * Stores the item currently being edited.
   * This is optional but useful if you want to preload
   * the edit form or track which item is active.
   */
  const [editingItem, setEditingItem] = useState(null);

  /**
   * handleAdd
   * ---------
   * Adds a new item to the items array.
   * - Receives an item object from the Create form
   * - Adds a unique id (Date.now())
   * - Updates state immutably (required in React)
   */
  function handleAdd(item) {
    setItems((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(), // unique id for routing + rendering
      },
    ]);
  }

  /**
   * handleEdit
   * ----------
   * Updates an existing item.
   * - Loops through items
   * - Replaces the item with matching id
   * - Leaves all other items unchanged
   */
  function handleEdit(updatedItem) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === updatedItem.id ? updatedItem : it
      )
    );

    // Clear editing state after save
    setEditingItem(null);
  }

  /**
   * handleDelete
   * ------------
   * Removes an item from the list.
   * - Filters out the item with the given id
   */
  function handleDelete(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  /**
   * startEditing
   * ------------
   * Finds the item to edit and stores it in state.
   * Typically called when clicking an "Edit" button.
   */
  function startEditing(id) {
    const foundItem = items.find((it) => it.id === id);
    setEditingItem(foundItem ?? null);
  }

  return (
    <div className="app-container">
      {/* Top navigation bar (always visible) */}
      <Navbar />

      <div className="content">
        {/* Sidebar navigation (always visible) */}
        <Sidebar />

        {/* Main content area that changes per route */}
        <main className="main">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* About page */}
            <Route path="/about" element={<About />} />

            {/* 
              Apartments page:
              - Displays list of items
              - Contains Create form
              - Can delete items
              - Can trigger editing
            */}
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

            {/* 
              Item details page:
              - Displays ONE item based on URL id
              - Can delete the item
            */}
            <Route
              path="/apartments/:id"
              element={
                <ItemDetails
                  items={items}
                  onDelete={handleDelete}
                />
              }
            />

            {/* 
              Edit page (Day 4 requirement):
              - Shows Update form
              - Prefills data
              - Saves changes back to App state
            */}
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

            {/* Catch-all route for invalid URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Footer (always visible) */}
      <Footer />
    </div>
  );
}

export default App;
