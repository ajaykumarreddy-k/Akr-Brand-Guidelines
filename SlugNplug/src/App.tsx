import { useState, useEffect, useRef } from "react";
import "./index.css";

interface SlideMapping {
  file: string;
  name: string;
  section: string;
}

const slideMappings: SlideMapping[] = [
  { file: "1.svg", name: "01. Index & Overview", section: "strategy" },
  { file: "p2.svg", name: "02. Brand Identity", section: "strategy" },
  { file: "p3.svg", name: "03. Colour System", section: "strategy" },
  { file: "p4.svg", name: "04. Palette & Tokens", section: "strategy" },
  { file: "p5.svg", name: "05. Brand Rules", section: "strategy" },
  { file: "p6.svg", name: "06. Grid Layouts", section: "identity" },
  { file: "p7.svg", name: "07. Layout Systems", section: "identity" },
  { file: "p8.svg", name: "08. Fonts & Assets", section: "identity" },
  { file: "p9.svg", name: "09. Type Hierarchy", section: "identity" },
  { file: "p10.svg", name: "10. Reference Designs", section: "identity" },
  { file: "p11.svg", name: "11. Applications", section: "design guidelines and rules" },
  { file: "p12.svg", name: "12. Visual Mockups", section: "design guidelines and rules" },
  { file: "p13.svg", name: "13. UI Components", section: "design guidelines and rules" },
  { file: "p14.svg", name: "14. System Tokens", section: "design guidelines and rules" },
  { file: "p15.svg", name: "15. Logo Assets", section: "design guidelines and rules" },
  { file: "p16.svg", name: "16. Brand Graphics", section: "design guidelines and rules" },
  { file: "p17.svg", name: "17. Guidelines Summary", section: "design guidelines and rules" },
  { file: "p18.svg", name: "18. Final Specifications", section: "design guidelines and rules" },
];

export function App() {
  const [assets, setAssets] = useState<string[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("strategy");
  const [fullscreenSlide, setFullscreenSlide] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => {
        if (!res.ok) {
          return fetch("/api/assets.json");
        }
        return res;
      })
      .then((res) => {
        if (!res.ok) throw new Error("API route unavailable");
        return res.json();
      })
      .then((data) => {
        if (data.assets && data.assets.length > 0) {
          setAssets(data.assets);
        } else {
          setAssets(slideMappings.map((s) => s.file));
        }
      })
      .catch(() => {
        setAssets(slideMappings.map((s) => s.file));
      });
  }, []);

  const currentSlideFile = assets[activeSlideIndex] || "1.svg";
  const currentMapping = slideMappings[activeSlideIndex] || slideMappings[0];

  const selectSection = (section: string, defaultIndex: number) => {
    setActiveSection(section);
    setActiveSlideIndex(defaultIndex);
    viewerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (!assets.length) return;
    const nextIdx = (activeSlideIndex + 1) % assets.length;
    setActiveSlideIndex(nextIdx);
    setActiveSection(slideMappings[nextIdx]?.section || "strategy");
    if (fullscreenSlide) {
      setFullscreenSlide(assets[nextIdx]);
    }
  };

  const handlePrev = () => {
    if (!assets.length) return;
    const prevIdx = (activeSlideIndex - 1 + assets.length) % assets.length;
    setActiveSlideIndex(prevIdx);
    setActiveSection(slideMappings[prevIdx]?.section || "strategy");
    if (fullscreenSlide) {
      setFullscreenSlide(assets[prevIdx]);
    }
  };

  // Keyboard navigation & ESC handler for fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenSlide) {
        if (e.key === "Escape") {
          setFullscreenSlide(null);
        } else if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenSlide, activeSlideIndex, assets]);

  return (
    <div className="wrapper">
      {/* HORIZONTAL LOGO SECTION */}
      <div className="logo">
        slug n plug
      </div>

      {/* CARD CONTAINER */}
      <section className="card">
        {/* ROW 1: STRATEGY */}
        <div
          className={`service-row ${activeSection === "strategy" ? "active" : ""}`}
          onClick={() => selectSection("strategy", 0)}
        >
          <div className="number">01</div>
          <div className="title">strategy</div>
        </div>

        {/* ROW 2: IDENTITY */}
        <div
          className={`service-row ${activeSection === "identity" ? "active" : ""}`}
          onClick={() => selectSection("identity", 5)}
        >
          <div className="number">02</div>
          <div className="title">identity</div>
        </div>

        {/* ROW 3: DESIGN GUIDELINES AND RULES */}
        <div
          className={`service-row ${activeSection === "design guidelines and rules" ? "active" : ""}`}
          onClick={() => selectSection("design guidelines and rules", 10)}
        >
          <div className="number">03</div>
          <div className="title title-long">design guidelines and rules</div>
        </div>

        {/* BOTTOM CONTENT AREA */}
        <div className="bottom" ref={viewerRef}>
          {/* LEFT COLUMN */}
          <div className="left">
            <div className="description">
              Based on my design strategy, I craft digital experiences and products that look
              exceptional, feel intuitive, and perform seamlessly. Every element is designed
              with purpose, ensuring the final experience is both visually engaging and highly
              effective. Explore my complete design philosophy, system, and creative guidelines below.
            </div>

            <div className="services">
              <ul>
                {slideMappings.slice(0, 9).map((slide, idx) => (
                  <li
                    key={slide.file}
                    className={activeSlideIndex === idx ? "active" : ""}
                    onClick={() => {
                      setActiveSlideIndex(idx);
                      setActiveSection(slide.section);
                    }}
                  >
                    {slide.name}
                  </li>
                ))}
              </ul>

              <ul>
                {slideMappings.slice(9, 18).map((slide, idx) => {
                  const realIndex = idx + 9;
                  return (
                    <li
                      key={slide.file}
                      className={activeSlideIndex === realIndex ? "active" : ""}
                      onClick={() => {
                        setActiveSlideIndex(realIndex);
                        setActiveSection(slide.section);
                      }}
                    >
                      {slide.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: SLIDE VIEWER IMAGE BOX */}
          <div className="image-box">
            <div className="image-box-header">
              <span className="box-slide-num">
                SLIDE {String(activeSlideIndex + 1).padStart(2, "0")} / {String(assets.length || 18).padStart(2, "0")}
              </span>
              <button
                className="fullscreen-badge"
                onClick={() => setFullscreenSlide(currentSlideFile)}
              >
                ⤢ FULLSCREEN
              </button>
            </div>

            <div
              className="image-box-stage"
              onClick={() => setFullscreenSlide(currentSlideFile)}
            >
              <img
                src={`/assets/${currentSlideFile}`}
                alt={currentMapping.name}
              />
            </div>

            <div className="image-box-controls">
              <button className="nav-arrow-btn" onClick={handlePrev}>
                ← PREV
              </button>
              <span className="current-slide-title">
                {currentMapping.name}
              </span>
              <button className="nav-arrow-btn" onClick={handleNext}>
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER BAR EXACTLY MATCHING REFERENCE SCREENSHOT */}
      <footer className="site-footer">
        <div className="footer-left">
          <span>Built by </span>
          <a
            href="https://ajaykumarreddykrishnareddygari-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-brand-link"
          >
            Ajay <span className="grid-icon">⩩</span>
          </a>
        </div>

        <div className="footer-center">
          <a
            href="https://ajaykumarreddykrishnareddygari-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Portfolio
          </a>
          <span className="footer-pipe">|</span>
          <a
            href="https://github.com/ajaykumarreddy-k"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <span className="footer-pipe">|</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="footer-link"
          >
            SNP Guidelines
          </a>
        </div>

        <div className="footer-right">
          <span>SNP Guidelines is an open source project</span>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX MODAL WITH ESC & NEXT/PREV NAVIGATION */}
      {fullscreenSlide && (
        <div className="lightbox-modal" onClick={() => setFullscreenSlide(null)}>
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              SLIDE {String(activeSlideIndex + 1).padStart(2, "0")} / {String(assets.length || 18).padStart(2, "0")} — {currentMapping.name}
            </span>
            <button className="modal-close-btn" onClick={() => setFullscreenSlide(null)}>
              ✕ CLOSE (ESC)
            </button>
          </div>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-nav-btn modal-prev"
              onClick={handlePrev}
              title="Previous Slide (←)"
            >
              ‹
            </button>

            <img
              src={`/assets/${fullscreenSlide}`}
              alt="Fullscreen Slide"
              className="modal-svg-image"
            />

            <button
              className="modal-nav-btn modal-next"
              onClick={handleNext}
              title="Next Slide (→)"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
