import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Apartments from "./pages/Apartments.jsx";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-container">
      <Navbar />

      <div className="content">
        <Sidebar page={page} setPage={setPage} />

        <main className="main">
          {page === "home" && <Home />}
          {page === "about" && <About />}
          {page === "apartments" && <Apartments />}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
