import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCardStack.css";

interface SlideCard {
  id: number;
  asset: string;
  slideIndex: number;
}

const positionStyles = [
  { scale: 1, y: 0, opacity: 1 },
  { scale: 0.94, y: -28, opacity: 0.9 },
  { scale: 0.88, y: -56, opacity: 0.75 },
];

const exitAnimation = {
  y: 420,
  scale: 1,
  opacity: 0,
  zIndex: 10,
};

const enterAnimation = {
  y: -56,
  scale: 0.88,
  opacity: 0,
};

export default function AnimatedCardStack() {
  const [allAssets, setAllAssets] = useState<string[]>([]);
  const [cards, setCards] = useState<SlideCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        const loaded: string[] = data.assets && data.assets.length > 0 ? data.assets : [
          "1.svg", "p2.svg", "p3.svg", "p4.svg", "p5.svg",
          "p6.svg", "p7.svg", "p8.svg", "p9.svg", "p10.svg",
          "p11.svg", "p12.svg", "p13.svg", "p14.svg", "p15.svg",
          "p16.svg", "p17.svg", "p18.svg"
        ];
        setAllAssets(loaded);
        initCards(loaded);
      })
      .catch(() => {
        const fallback = [
          "1.svg", "p2.svg", "p3.svg", "p4.svg", "p5.svg",
          "p6.svg", "p7.svg", "p8.svg", "p9.svg", "p10.svg",
          "p11.svg", "p12.svg", "p13.svg", "p14.svg", "p15.svg",
          "p16.svg", "p17.svg", "p18.svg"
        ];
        setAllAssets(fallback);
        initCards(fallback);
      });
  }, []);

  const initCards = (assetList: string[]) => {
    if (!assetList.length) return;
    const initial: SlideCard[] = [
      { id: 1, asset: assetList[0], slideIndex: 0 },
      { id: 2, asset: assetList[1 % assetList.length], slideIndex: 1 },
      { id: 3, asset: assetList[2 % assetList.length], slideIndex: 2 },
    ];
    setCards(initial);
    setNextId(4);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (!allAssets.length || isAnimating) return;
    setIsAnimating(true);

    const lastCard = cards[cards.length - 1];
    const nextSlideIndex = (lastCard.slideIndex + 1) % allAssets.length;
    const nextAsset = allAssets[nextSlideIndex];

    setCards((prev) => [
      ...prev.slice(1),
      { id: nextId, asset: nextAsset, slideIndex: nextSlideIndex },
    ]);
    setNextId((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % allAssets.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    if (!allAssets.length || isAnimating) return;
    setIsAnimating(true);

    const prevIndex = (currentIndex - 1 + allAssets.length) % allAssets.length;
    const firstCardIndex = prevIndex;
    const secondCardIndex = (prevIndex + 1) % allAssets.length;
    const thirdCardIndex = (prevIndex + 2) % allAssets.length;

    setCards([
      { id: nextId, asset: allAssets[firstCardIndex], slideIndex: firstCardIndex },
      { id: nextId + 1, asset: allAssets[secondCardIndex], slideIndex: secondCardIndex },
      { id: nextId + 2, asset: allAssets[thirdCardIndex], slideIndex: thirdCardIndex },
    ]);
    setNextId((prev) => prev + 3);
    setCurrentIndex(prevIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  return (
    <div className="animated-stack-container">
      <div className="stack-card-area">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => {
            const { scale, y, opacity } = positionStyles[index] ?? positionStyles[2];
            const zIndex = index === 0 && isAnimating ? 10 : 3 - index;
            const exitAnim = index === 0 ? exitAnimation : undefined;
            const initialAnim = index === 2 ? enterAnimation : undefined;

            return (
              <motion.div
                key={card.id}
                initial={initialAnim}
                animate={{ y, scale, opacity }}
                exit={exitAnim}
                transition={{
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.05,
                }}
                style={{
                  zIndex,
                }}
                className="motion-stack-card"
              >
                <div className="card-header-bar">
                  <span className="slide-counter">
                    SLIDE <span className="counter-num">{String(card.slideIndex + 1).padStart(2, "0")}</span> / {String(allAssets.length).padStart(2, "0")}
                  </span>
                  <span className="asset-filename">{card.asset}</span>
                </div>
                <div className="card-svg-container">
                  <img
                    src={`/assets/${card.asset}`}
                    alt={`Slide ${card.slideIndex + 1}`}
                    className="svg-card-image"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls Bar */}
      <div className="stack-controls">
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="control-btn"
          title="Previous Slide"
        >
          ← Prev Slide
        </button>

        <div className="slide-indicator-dots">
          {allAssets.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                const idx1 = idx % allAssets.length;
                const idx2 = (idx + 1) % allAssets.length;
                const idx3 = (idx + 2) % allAssets.length;
                setCards([
                  { id: nextId, asset: allAssets[idx1], slideIndex: idx1 },
                  { id: nextId + 1, asset: allAssets[idx2], slideIndex: idx2 },
                  { id: nextId + 2, asset: allAssets[idx3], slideIndex: idx3 },
                ]);
                setNextId((prev) => prev + 3);
                setCurrentIndex(idx);
                setTimeout(() => setIsAnimating(false), 450);
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="control-btn primary-btn"
          title="Next Slide"
        >
          Next Slide →
        </button>
      </div>
    </div>
  );
}
