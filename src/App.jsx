import { useCallback, useState } from "react";
import Capabilities from "./components/Capabilities.jsx";
import Catalog from "./components/Catalog.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import QuoteCalculator from "./components/QuoteCalculator.jsx";
import RfqWizard from "./components/RfqWizard.jsx";
import SpecModal from "./components/SpecModal.jsx";

const initialQuote = {
  productId: "yellow-mustard-oil",
  volumeLiters: 5000,
  packagingId: "barrel",
  hubId: "delhi-ncr",
};

export default function App() {
  const [specId, setSpecId] = useState(null);
  const [quote, setQuote] = useState(initialQuote);
  const openSpecs = useCallback((id) => setSpecId(id ?? null), []);
  const closeSpecs = useCallback(() => setSpecId(null), []);

  const proceedToRfq = () => {
    document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#catalog">
        Skip to catalog
      </a>
      <Navbar />
      <main>
        <Hero onOpenSpecs={openSpecs} />
        <Capabilities />
        <Catalog onOpenSpecs={openSpecs} />
        <QuoteCalculator
          quote={quote}
          onQuoteChange={setQuote}
          onProceed={proceedToRfq}
        />
        <RfqWizard quote={quote} onQuoteChange={setQuote} />
      </main>
      <Footer />
      <SpecModal productId={specId} onClose={closeSpecs} />
    </>
  );
}
