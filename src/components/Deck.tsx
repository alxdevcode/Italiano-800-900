import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { slides, type Slide } from "@/lib/slides";

type Page = {
  slide: Slide;
  source: number;
  cover: boolean;
  paragraphs: string[];
  points?: string[];
  quote?: Slide["quote"];
};

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

const deckStyles = `
  /* ==============================
     GLOBAL / ROOT
  ============================== */

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
    position: fixed;
    inset: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    background: #100b08;
    color: #f3e9db;
    font-family: "Manrope", sans-serif;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  /* ==============================
     HEADER
  ============================== */

  .literary-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    height: 64px;
    padding: 0 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
  }

  .literary-logo {
    border: 0;
    background: transparent;
    color: #f3e9db;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 26px;
    cursor: pointer;
  }

  .literary-index-button {
    padding: 9px 22px;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 999px;
    background: rgba(16,11,8,.35);
    color: #f3e9db;
    font-size: 12px;
    cursor: pointer;
  }

  /* ==============================
     STAGE
  ============================== */

  .literary-stage {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .literary-slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* ==============================
     COVER FULLSCREEN
  ============================== */

  .literary-cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #100b08;
    overflow: hidden;
  }

  .literary-cover-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: 0 !important;
    border-radius: 0 !important;
  }

  .literary-cover-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(10,7,5,.92) 0%,
        rgba(10,7,5,.72) 32%,
        rgba(10,7,5,.2) 75%,
        rgba(10,7,5,.08) 100%
      ),
      linear-gradient(
        0deg,
        rgba(10,7,5,.5),
        transparent 25%,
        transparent 75%,
        rgba(10,7,5,.25)
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
    padding: 85px 5%;
  }

  .literary-kicker {
    margin: 0;
    color: #dba45f;
    font-family: "Manrope", sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .3em;
    text-transform: uppercase;
  }

  .literary-cover-title {
    margin: 25px 0 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(60px, 6.2vw, 112px);
    font-weight: 400;
    line-height: .98;
    letter-spacing: -.035em;
    color: #f3e9db;
  }

  .literary-cover-subtitle {
    margin: 25px 0 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(25px, 2.4vw, 40px);
    font-style: italic;
    color: #dba45f;
  }

  .literary-cover-description {
    max-width: 670px;
    max-height: 35vh;
    margin-top: 25px;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .literary-cover-description p {
    margin: 0 0 16px;
    font-size: clamp(13px, 1vw, 16px);
    line-height: 1.8;
    color: #eee4d7;
  }

  /* ==============================
     CONTENT SLIDES
     TEXT LEFT / IMAGE RIGHT
  ============================== */

  .literary-content {
    position: relative;
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #100b08;
  }

  .literary-text-column {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding:
      clamp(92px, 11vh, 125px)
      clamp(35px, 4vw, 75px)
      90px
      5%;
    background:
      linear-gradient(
        90deg,
        #100b08 0%,
        #100b08 78%,
        rgba(16,11,8,.95) 100%
      );
  }

  .literary-heading {
    flex-shrink: 0;
    margin-bottom: clamp(25px, 4vh, 48px);
  }

  .literary-title {
    margin: 14px 0 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(46px, 4vw, 76px);
    font-weight: 400;
    line-height: 1.02;
    letter-spacing: -.03em;
    color: #f3e9db;
  }

  .literary-subtitle {
    margin: 14px 0 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(22px, 1.8vw, 32px);
    font-style: italic;
    color: #dba45f;
  }

  .literary-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding-right: 12px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,.2) transparent;
  }

  .literary-body p {
    margin: 0 0 20px;
    font-family: "Manrope", sans-serif;
    font-size: clamp(13px, .95vw, 16px);
    font-weight: 400;
    line-height: 1.8;
    color: #bcb4aa;
  }

  .literary-body p:first-child {
    color: #f3e9db;
  }

  .literary-body p:first-child::first-letter {
    float: left;
    padding-right: .09em;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 3.5em;
    line-height: .85;
    color: #dba45f;
  }

  /* ==============================
     FULL HEIGHT IMAGE
  ============================== */

  .literary-media-column {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: #100b08;
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
    outline: 0 !important;
    box-shadow: none !important;
  }

  .literary-media-column::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      linear-gradient(
        90deg,
        rgba(16,11,8,.28),
        transparent 30%
      ),
      linear-gradient(
        0deg,
        rgba(16,11,8,.25),
        transparent 30%
      );
  }

  /* ==============================
     CONCEPTS OVER IMAGE
  ============================== */

  .literary-points {
    position: absolute;
    z-index: 3;
    left: 5%;
    right: 8%;
    bottom: 12%;
    width: auto;
    max-height: 35%;
    overflow-y: auto;
    padding: 24px 28px;
    background: rgba(13,9,7,.88);
    backdrop-filter: blur(12px);
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    scrollbar-width: thin;
  }

  .literary-points-label {
    margin: 0 0 12px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .24em;
    text-transform: uppercase;
    color: #dba45f;
  }

  .literary-point {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,.1);
    font-size: clamp(12px, .85vw, 14px);
    line-height: 1.5;
    color: #eee4d7;
  }

  .literary-point:last-child {
    border-bottom: 0;
  }

  .literary-point-number {
    flex-shrink: 0;
    min-width: 20px;
    font-family: "Instrument Serif", Georgia, serif;
    color: #dba45f;
  }

  /* ==============================
     QUOTES
  ============================== */

  .literary-quote {
    position: absolute;
    z-index: 3;
    left: 5%;
    right: 8%;
    bottom: 12%;
    margin: 0;
    padding: 24px 28px;
    background: rgba(13,9,7,.88);
    backdrop-filter: blur(12px);
    border-left: 2px solid #dba45f;
  }

  .literary-quote-text {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(21px, 1.8vw, 32px);
    font-style: italic;
    line-height: 1.3;
    color: #f3e9db;
  }

  .literary-quote-author {
    margin-top: 12px;
    font-size: 12px;
    color: #bcb4aa;
  }

  .literary-media-column:has(.literary-points)
  .literary-quote {
    bottom: auto;
    top: 10%;
  }

  /* ==============================
     FOOTER
  ============================== */

  .literary-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 62px;
    padding: 0 5%;
    background: linear-gradient(
      0deg,
      rgba(10,7,5,.85),
      transparent
    );
  }

  .literary-counter {
    flex-shrink: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 18px;
    color: #f3e9db;
    white-space: nowrap;
  }

  .literary-progress {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,.25);
  }

  .literary-progress-fill {
    height: 100%;
    background: #dba45f;
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
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 50%;
    background: rgba(16,11,8,.35);
    color: #f3e9db;
    cursor: pointer;
    transition: background .2s ease;
  }

  .literary-arrow:hover:not(:disabled) {
    background: rgba(255,255,255,.12);
  }

  .literary-arrow:disabled {
    opacity: .25;
    cursor: not-allowed;
  }

  /* ==============================
     INDEX
  ============================== */

  .literary-index {
    position: fixed;
    inset: 0;
    z-index: 100;
    overflow-y: auto;
    padding: 90px 6% 45px;
    background: #100b08;
  }

  .literary-index-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .literary-index-title {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 58px;
    font-weight: 400;
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
    border-bottom: 1px solid rgba(255,255,255,.12);
    background: transparent;
    color: #f3e9db;
    text-align: left;
    cursor: pointer;
  }

  .literary-index-item:hover,
  .literary-index-item.active {
    color: #dba45f;
  }

  .literary-index-item span:last-child {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 24px;
  }

  /* ==============================
     TABLET / MOBILE
  ============================== */

  @media (max-width: 900px) {
    .literary-header {
      height: 54px;
    }

    .literary-footer {
      height: 54px;
      gap: 12px;
    }

    .literary-content {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(0, 55%) minmax(0, 45%);
    }

    .literary-text-column {
      padding: 75px 6% 15px;
      background: #100b08;
    }

    .literary-heading {
      margin-bottom: 15px;
    }

    .literary-title {
      font-size: clamp(36px, 7vw, 55px);
    }

    .literary-subtitle {
      font-size: 22px;
    }

    .literary-body p {
      font-size: 13px;
      line-height: 1.65;
      margin-bottom: 12px;
    }

    .literary-media-column {
      height: 100%;
    }

    .literary-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .literary-points {
      left: 4%;
      right: 4%;
      bottom: 15%;
      max-height: 65%;
      padding: 14px 18px;
    }

    .literary-quote {
      left: 4%;
      right: 4%;
      bottom: 15%;
      padding: 15px 18px;
    }

    .literary-cover-content {
      padding: 80px 6%;
    }

    .literary-cover-title {
      font-size: clamp(48px, 9vw, 85px);
    }

    .literary-index-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-height: 650px) and (min-width: 901px) {
    .literary-text-column {
      padding-top: 75px;
      padding-bottom: 65px;
    }

    .literary-heading {
      margin-bottom: 15px;
    }

    .literary-title {
      font-size: clamp(36px, 3vw, 55px);
    }

    .literary-body p {
      line-height: 1.55;
      margin-bottom: 12px;
    }
  }
  
/* SFUMATURA TRA TESTO E IMMAGINE */
.literary-text-column {
  background: #100b08;
}

.literary-media-column::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #100b08 0%,
    rgba(16, 11, 8, 0.92) 5%,
    rgba(16, 11, 8, 0.55) 18%,
    rgba(16, 11, 8, 0.12) 42%,
    transparent 70%
  );
}

/* CONCETTI SENZA RIQUADRO MARRONE */
.literary-points {
  position: absolute;
  z-index: 3;
  left: 6%;
  right: 6%;
  bottom: 12%;

  width: auto;
  max-height: 35%;
  overflow-y: auto;

  padding: 0;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;

  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}

.literary-points-label {
  color: #e4aa65;
  margin-bottom: 14px;
}

.literary-point {
  color: #fff5e8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  text-shadow: 0 2px 6px #000;
}
`;

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
    document.title = `${page.slide.title} — Il Vero`;
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
        className="literary-deck"
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
              ".literary-body, .literary-points, .literary-cover-description"
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
