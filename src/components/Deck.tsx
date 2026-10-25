import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { slides, type Slide } from "@/lib/slides";

/* =========================================================
   TYPES
========================================================= */

type Page = {
  slide: Slide;
  source: number;
  cover: boolean;
  paragraphs: string[];
  points?: string[];
  quote?: Slide["quote"];
};

/* =========================================================
   DATA
========================================================= */

function buildPages(): Page[] {
  return slides.map((slide, source) => ({
    slide,
    source,
    cover: Boolean(slide.cover) || source === slides.length - 1,
    paragraphs: slide.body ?? [],
    points: slide.points,
    quote: slide.quote,
  }));
}

/* =========================================================
   STYLES
========================================================= */

const deckStyles = `
  /* RESET */

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .literary-deck,
  .literary-deck * {
    box-sizing: border-box;
  }

  .literary-deck {
    position: fixed !important;
    inset: 0 !important;
    z-index: 9999;

    display: flex;
    flex-direction: column;

    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;

    margin: 0 !important;
    padding: 0 !important;

    overflow: hidden;

    border: 0 !important;
    border-radius: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;

    background: var(--background);
    color: var(--foreground);
  }

  /* HEADER */

  .literary-header {
    position: relative;
    z-index: 30;

    display: flex;
    align-items: center;
    justify-content: space-between;

    flex: 0 0 64px;
    height: 64px;

    padding: 0 5%;

    background: var(--background);
    border: 0;
  }

  .literary-logo {
    padding: 0;
    border: 0;
    background: transparent;

    font-family: var(--font-serif);
    font-size: 26px;
    color: var(--foreground);

    cursor: pointer;
  }

  .literary-index-button {
    padding: 9px 22px;

    border: 1px solid var(--border);
    border-radius: 999px;

    background: transparent;
    color: var(--foreground);

    font-size: 12px;
    cursor: pointer;

    transition: background .2s ease;
  }

  .literary-index-button:hover {
    background: var(--secondary);
  }

  /* MAIN STAGE */

  .literary-stage {
    position: relative;

    flex: 1 1 auto;
    min-height: 0;

    width: 100%;
    overflow: hidden;
  }

  .literary-slide {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* FOOTER */

  .literary-footer {
    position: relative;
    z-index: 30;

    display: flex;
    align-items: center;
    gap: 20px;

    flex: 0 0 62px;
    height: 62px;

    padding: 0 5%;

    background: var(--background);
    border: 0;
  }

  .literary-counter {
    flex-shrink: 0;

    font-family: var(--font-serif);
    font-size: 18px;
    white-space: nowrap;
  }

  .literary-progress {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .literary-progress-fill {
    height: 100%;
    background: var(--primary);
    transition: width .45s ease;
  }

  .literary-controls {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
  }

  .literary-arrow {
    display: grid;
    place-items: center;

    width: 40px;
    height: 40px;

    border: 1px solid var(--border);
    border-radius: 50%;

    background: transparent;
    color: var(--foreground);

    cursor: pointer;
    transition: background .2s ease;
  }

  .literary-arrow:hover:not(:disabled) {
    background: var(--secondary);
  }

  .literary-arrow:disabled {
    opacity: .25;
    cursor: not-allowed;
  }

  /* =======================================================
     FULLSCREEN COVER
  ======================================================= */

  .literary-deck.is-cover .literary-stage {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    flex: none;
  }

  .literary-deck.is-cover .literary-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    flex: none;
    background: transparent !important;
  }

  .literary-deck.is-cover .literary-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    flex: none;
    background: transparent !important;
  }

  .literary-deck.is-cover .literary-logo,
  .literary-deck.is-cover .literary-counter,
  .literary-deck.is-cover .literary-arrow {
    color: #f5ead9;
  }

  .literary-deck.is-cover .literary-index-button {
    color: #f5ead9;
    border-color: rgba(255,255,255,.28);
  }

  .literary-deck.is-cover .literary-arrow {
    border-color: rgba(255,255,255,.25);
  }

  .literary-deck.is-cover .literary-progress {
    background: rgba(255,255,255,.25);
  }

  .literary-cover {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;
    background: #100b08;
  }

  .literary-cover-image {
    position: absolute;
    inset: 0;

    display: block;

    width: 100%;
    height: 100%;

    max-width: none;
    max-height: none;

    object-fit: cover;
    object-position: center;

    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  .literary-cover-overlay {
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        90deg,
        rgba(10,7,5,.91) 0%,
        rgba(10,7,5,.72) 28%,
        rgba(10,7,5,.32) 62%,
        rgba(10,7,5,.08) 100%
      ),
      linear-gradient(
        0deg,
        rgba(10,7,5,.48) 0%,
        transparent 28%,
        transparent 75%,
        rgba(10,7,5,.28) 100%
      );
  }

  .literary-cover-content {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    justify-content: center;

    width: min(100%, 1050px);
    height: 100%;

    padding: 90px 5%;
  }

  .literary-kicker {
    margin: 0;

    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3em;
    text-transform: uppercase;

    color: var(--primary);
  }

  .literary-cover-title {
    margin: 25px 0 0;

    font-family: var(--font-serif);
    font-size: clamp(55px, 6vw, 110px);
    font-weight: 400;
    line-height: .99;
    letter-spacing: -.035em;

    color: #f5ead9;
  }

  .literary-cover-subtitle {
    margin: 28px 0 0;

    font-family: var(--font-serif);
    font-size: clamp(23px, 2.3vw, 37px);
    font-style: italic;

    color: var(--primary);
  }

  .literary-cover-description {
    max-width: 660px;
    max-height: 35vh;

    margin-top: 26px;

    overflow-y: auto;
    scrollbar-width: thin;

    color: #eee5d8;
    font-size: clamp(13px, 1vw, 16px);
    line-height: 1.75;
  }

  .literary-cover-description p {
    margin: 0 0 14px;
  }


/* SLIDE INTERNE — STILE EDITORIALE IMMERSIVO */

.literary-content {
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  background: #100b08;
}

.literary-text-column {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 28px 5% 35px 10%;
  background: linear-gradient(
    90deg,
    #100b08 0%,
    #100b08 75%,
    rgba(16, 11, 8, 0.94) 100%
  );
}

.literary-heading {
  flex-shrink: 0;
  margin-bottom: 35px;
}

.literary-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 15px;
}

.literary-media-column {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.literary-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  aspect-ratio: auto;
  object-fit: cover;
  object-position: center;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.literary-media-column::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(16, 11, 8, 0.35),
    transparent 35%
  );
}

.literary-points {
  position: absolute;
  z-index: 2;
  left: 5%;
  right: 8%;
  bottom: 7%;
  width: auto;
  max-height: 42%;
  overflow-y: auto;
  padding: 22px 28px;
  background: rgba(13, 9, 7, 0.88);
  backdrop-filter: blur(12px);
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.literary-quote {
  position: absolute;
  z-index: 3;
  bottom: 5%;
  left: 5%;
  right: 8%;
  margin: 0;
  padding: 18px 24px;
  background: rgba(13, 9, 7, 0.88);
  backdrop-filter: blur(12px);
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .literary-content {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 55%) minmax(0, 45%);
  }

  .literary-text-column {
    padding: 20px 6%;
  }

  .literary-heading {
    margin-bottom: 16px;
  }

  .literary-media-column {
    height: 100%;
    max-height: none;
  }

  .literary-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .literary-points {
    left: 4%;
    right: 4%;
    bottom: 5%;
    padding: 14px;
    max-height: 65%;
  }
}


  /* =======================================================
     INDEX
  ======================================================= */

  .literary-index {
    position: fixed;
    inset: 0;
    z-index: 100;

    overflow-y: auto;

    padding: 90px 6% 45px;

    background: var(--popover);
  }

  .literary-index-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .literary-index-title {
    font-family: var(--font-serif);
    font-size: 58px;
  }

  .literary-index-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 45px;
  }

  .literary-index-item {
    display: flex;
    align-items: baseline;
    gap: 16px;

    width: 100%;
    padding: 14px 0;

    border: 0;
    border-bottom: 1px solid var(--border);

    background: transparent;
    color: var(--foreground);

    text-align: left;
    cursor: pointer;
  }

  .literary-index-item:hover,
  .literary-index-item.active {
    color: var(--primary);
  }

  .literary-index-item span:last-child {
    font-family: var(--font-serif);
    font-size: 24px;
  }

  /* =======================================================
     RESPONSIVE
  ======================================================= */

  @media (max-width: 900px) {
    .literary-header {
      height: 54px;
      flex-basis: 54px;
    }

    .literary-footer {
      height: 54px;
      flex-basis: 54px;
      gap: 12px;
    }

    .literary-content {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;

      gap: 14px;
      padding: 16px 5%;
    }

    .literary-heading {
      margin-bottom: 12px;
    }

    .literary-title {
      font-size: clamp(34px, 6vw, 54px);
    }

    .literary-body p {
      font-size: 13px;
      line-height: 1.6;
    }

    .literary-media-column {
      max-height: 34vh;
      justify-content: flex-start;
      gap: 12px;
    }

    .literary-image {
      width: min(100%, 560px);
      aspect-ratio: 16 / 9;
    }

    .literary-cover-content {
      padding: 90px 6%;
    }

    .literary-cover-title {
      font-size: clamp(47px, 9vw, 85px);
    }

    .literary-index-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-height: 700px) and (min-width: 901px) {
    .literary-content {
      padding-top: 14px;
      padding-bottom: 14px;
    }

    .literary-heading {
      margin-bottom: 12px;
    }

    .literary-title {
      font-size: clamp(34px, 3vw, 55px);
    }

    .literary-media-column {
      justify-content: flex-start;
    }
  }
`;

/* =========================================================
   COVER COMPONENT
========================================================= */

function Cover({ page }: { page: Page }) {
  const { slide } = page;

  return (
    <section className="literary-cover">
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="literary-cover-image"
        />
      )}

      <div className="literary-cover-overlay" />

      <div className="literary-cover-content">
        <p className="literary-kicker">
          {slide.chapter}
        </p>

        <h1 className="literary-cover-title">
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className="literary-cover-subtitle">
            {slide.subtitle}
          </p>
        )}

        {page.paragraphs.length > 0 && (
          <div className="literary-cover-description">
            {page.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   CONTENT COMPONENT
========================================================= */

function ContentSlide({ page }: { page: Page }) {
  const { slide } = page;

  return (
    <section className="literary-content">
      <div className="literary-text-column">
        <div className="literary-heading">
          <p className="literary-kicker">
            {String(page.source + 1).padStart(2, "0")}
            {" · "}
            {slide.chapter}
          </p>

          <h2 className="literary-title">
            {slide.title}
          </h2>

          {slide.subtitle && (
            <p className="literary-subtitle">
              {slide.subtitle}
            </p>
          )}
        </div>

        <div className="literary-body">
          {page.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <aside className="literary-media-column">
        {slide.image && (
          <img
            src={slide.image}
            alt={slide.title}
            className="literary-image"
          />
        )}

        {Boolean(page.points?.length) && (
          <div className="literary-points">
            <p className="literary-points-label">
              Concetti fondamentali
            </p>

            {page.points!.map((point, i) => (
              <div
                className="literary-point"
                key={i}
              >
                <span className="literary-point-number">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span>{point}</span>
              </div>
            ))}
          </div>
        )}

        {page.quote && (
          <blockquote className="literary-quote">
            <p className="literary-quote-text">
              «{page.quote.text}»
            </p>

            <footer className="literary-quote-author">
              {page.quote.by}
            </footer>
          </blockquote>
        )}
      </aside>
    </section>
  );
}

/* =========================================================
   MAIN DECK
========================================================= */

export function Deck({ index }: { index: number }) {
  const navigate = useNavigate();

  const pages = useMemo(() => buildPages(), []);
  const total = pages.length;

  const current = Math.max(
    0,
    Math.min(index, total - 1)
  );

  const page = pages[current];

  const [indexOpen, setIndexOpen] = useState(false);

  const touchStart = useRef<number | null>(null);
  const wheelLock = useRef(0);

  const go = useCallback(
    (next: number) => {
      const target = Math.max(
        0,
        Math.min(next, total - 1)
      );

      if (target === current) return;

      navigate({
        to: "/",
        search: { s: target },
        replace: true,
      });
    },
    [navigate, current, total]
  );

  useEffect(() => {
    document.title =
      `${page.slide.title} — Il Vero`;
  }, [page.slide.title]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIndexOpen(false);
        return;
      }

      if (indexOpen) return;

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown"
      ) {
        event.preventDefault();
        go(current + 1);
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
      ) {
        event.preventDefault();
        go(current - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        go(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        go(total - 1);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [current, go, indexOpen, total]);

  return (
    <>
      <style>{deckStyles}</style>

      <div
        className={`literary-deck ${
          page.cover ? "is-cover" : ""
        }`}
        onTouchStart={(event) => {
          touchStart.current =
            event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (indexOpen || touchStart.current === null) {
            return;
          }

          const end =
            event.changedTouches[0]?.clientX;

          if (end === undefined) return;

          const delta = end - touchStart.current;

          if (Math.abs(delta) > 65) {
            go(current + (delta < 0 ? 1 : -1));
          }

          touchStart.current = null;
        }}
        onWheel={(event) => {
          if (indexOpen) return;

          const target = event.target;

          if (
            target instanceof Element &&
            target.closest(
              ".literary-body, .literary-media-column, .literary-cover-description"
            )
          ) {
            return;
          }

          if (Math.abs(event.deltaY) < 25) return;

          const now = Date.now();

          if (now - wheelLock.current < 850) {
            return;
          }

          wheelLock.current = now;

          go(current + (event.deltaY > 0 ? 1 : -1));
        }}
      >
        <header className="literary-header">
          <button
            className="literary-logo"
            type="button"
            onClick={() => go(0)}
          >
            Il Vero
          </button>

          <button
            className="literary-index-button"
            type="button"
            onClick={() => setIndexOpen(!indexOpen)}
          >
            {indexOpen ? "Chiudi" : "Indice"}
          </button>
        </header>

        <main className="literary-stage">
          <div
            key={current}
            className="literary-slide"
          >
            {page.cover ? (
              <Cover page={page} />
            ) : (
              <ContentSlide page={page} />
            )}
          </div>
        </main>

        <footer className="literary-footer">
          <span className="literary-counter">
            {String(current + 1).padStart(2, "0")}
            {" / "}
            {total}
          </span>

          <div className="literary-progress">
            <div
              className="literary-progress-fill"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>

          <div className="literary-controls">
            <button
              className="literary-arrow"
              type="button"
              aria-label="Slide precedente"
              disabled={current === 0}
              onClick={() => go(current - 1)}
            >
              <ArrowLeft size={17} />
            </button>

            <button
              className="literary-arrow"
              type="button"
              aria-label="Slide successiva"
              disabled={current === total - 1}
              onClick={() => go(current + 1)}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </footer>

        {indexOpen && (
          <nav className="literary-index">
            <div className="literary-index-top">
              <h2 className="literary-index-title">
                Indice
              </h2>

              <button
                type="button"
                onClick={() => setIndexOpen(false)}
                aria-label="Chiudi indice"
              >
                <X size={25} />
              </button>
            </div>

            <div className="literary-index-grid">
              {pages.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className={`literary-index-item ${
                    i === current ? "active" : ""
                  }`}
                  onClick={() => {
                    setIndexOpen(false);
                    go(i);
                  }}
                >
                  <span className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span>{item.slide.title}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
