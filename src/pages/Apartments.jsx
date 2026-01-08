import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Apartments({ items = [], onAdd, onDelete }) {
  /**
   * Build a list of editable fields based on your dataset.
   * - Uses the first item as the "schema"
   * - Excludes "id" because App.jsx generates it
   */
  const editableKeys = useMemo(() => {
    if (!items || items.length === 0) return ["title", "price", "isAvailable"]; // fallback keys
    return Object.keys(items[0]).filter((k) => k !== "id");
  }, [items]);

  /**
   * Form state stored as one object so it can adapt to any dataset shape.
   */
  const [formState, setFormState] = useState(() => {
    const initial = {};
    for (const key of editableKeys) initial[key] = "";
    return initial;
  });

  /**
   * If editableKeys changes (example: items load later),
   * ensure formState includes those keys.
   */
  useMemo(() => {
    setFormState((prev) => {
      const next = { ...prev };
      for (const key of editableKeys) {
        if (!(key in next)) next[key] = "";
      }
      // Remove keys that no longer exist
      for (const key of Object.keys(next)) {
        if (!editableKeys.includes(key)) delete next[key];
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableKeys.join("|")]);

  function handleChange(key, value) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // If onAdd isn't provided, do nothing (prevents crashes)
    if (!onAdd) return;

    // Create a new item object from form state
    const newItem = {};
    for (const key of editableKeys) {
      newItem[key] = formState[key];
    }

    onAdd(newItem);

    // Reset form after adding
    const reset = {};
    for (const key of editableKeys) reset[key] = "";
    setFormState(reset);
  }

  /**
   * Helper to display a nice title in the list if your dataset has one.
   */
  function getDisplayTitle(item) {
    return item.title ?? item.name ?? item.street ?? `Item ${item.id}`;
  }

  return (
    <div>
      <h2>Apartments</h2>

      {/* CREATE FORM (Day 4 requirement) */}
      <section style={{ marginBottom: "20px" }}>
        <h3>Create Apartment</h3>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "420px" }}>
          {editableKeys.map((key) => {
            const currentValue = formState[key];

            // If the existing dataset value is boolean, render a checkbox
            const sampleValue = items[0]?.[key];
            const isBooleanField = typeof sampleValue === "boolean";

            return (
              <label key={key} style={{ display: "grid", gap: "6px" }}>
                <span>{key}</span>

                {isBooleanField ? (
                  <input
                    type="checkbox"
                    checked={Boolean(currentValue)}
                    onChange={(e) => handleChange(key, e.target.checked)}
                  />
                ) : (
                  <input
                    value={currentValue ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={`Enter ${key}`}
                  />
                )}
              </label>
            );
          })}

          <button type="submit">Add</button>
        </form>
      </section>

      {/* LIST (Day 4 requirement: show list + delete + edit links) */}
      <section>
        <h3>List</h3>

        {(!items || items.length === 0) ? (
          <p>No apartments yet.</p>
        ) : (
          <ul style={{ display: "grid", gap: "12px", paddingLeft: 0, listStyle: "none" }}>
            {items.map((item) => (
              <li key={String(item.id)} style={{ border: "1px solid #ccc", padding: "12px" }}>
                <strong>{getDisplayTitle(item)}</strong>

                <div style={{ marginTop: "8px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <Link to={`/apartments/${item.id}`}>Details</Link>
                  <Link to={`/apartments/${item.id}/edit`}>Edit</Link>

                  <button
                    type="button"
                    onClick={() => onDelete && onDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Apartments;
