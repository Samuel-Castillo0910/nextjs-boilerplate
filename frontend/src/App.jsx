import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CookieConsent from "./components/CookieConsent.jsx";
import Home from "./pages/Home.jsx";
import Models from "./pages/Models.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import Terms from "./pages/legal/Terms.jsx";
import Refund from "./pages/legal/Refund.jsx";
import Cookies from "./pages/legal/Cookies.jsx";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modelos" element={<Models />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/legal/privacidad" element={<Privacy />} />
        <Route path="/legal/terminos" element={<Terms />} />
        <Route path="/legal/reembolsos" element={<Refund />} />
        <Route path="/legal/cookies" element={<Cookies />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </>
  );
}
