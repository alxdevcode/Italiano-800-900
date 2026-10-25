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
  paragraphs: string[];
  points?: string[];
  quote?: Slide["quote"];
  cover: boolean;
};

function createPages(): Page[] {
  return slides.map((slide, source) => ({
    slide,
    source,
    paragraphs: slide.body ?? [],
    points: slide.points,
    quote: slide.quote,
    cover: Boolean(slide.cover) || source === slides.length - 1,
  }));
}

const deckCSS = `
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
    border-radius: 0;
  }

  .deck {
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
    border: none !important;
    border-radius: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    background: var(--background);
    color: var(--foreground);
  }

  .deck, .deck * {
    box-sizing: border-box;
  }

  .deck-header {
    position: relative;
    z-index: 10;
    flex: 0 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4.5%;
    background: var(--background);
  }

  .deck-logo {
    border: 0;
    background: none;
    color: var(--foreground);
    font-family: var(--font-serif);
    font-size: 25px;
    cursor: pointer;
  }

  .deck-index-button {
    padding: 9px 22px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: transparent;
    color: var(--foreground);
    font-size: 12px;
    cursor: pointer;
  }

  .deck-stage {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    overflow: hidden;
  }

  .deck-footer {
    position: relative;
    z-index: 10;
    flex: 0 0 58px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 4.5%;
    background: var(--background);
  }

  .deck-counter {
    flex-shrink: 0;
    font-family: var(--font-serif);
    font-size: 18px;
    white-space: nowrap;
  }

  .deck-progress {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .deck-progress-fill {
    height: 100%;
    background: var(--primary);
    transition: width .4s ease;
  }

  .deck-navigation {
    display: flex;
    gap: 9px;
  }

  .deck-arrow {
    display: grid;
    place-items: center;
    width: 39px;
    height: 39px;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: transparent;
    color: var(--foreground);
    cursor: pointer;
  }

  .deck-arrow:disabled {
    opacity: .25;
    cursor: not-allowed;
  }

  /* COPERTINA */

  .deck-cover {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #100b08;
  }

  .deck-cover-image {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: none;
    border-radius: 0;
  }

  .deck-cover-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(10,7,5,.88) 0%,
        rgba(10,7,5,.55) 40%,
        rgba(10,7,5,.08) 100%
      ),
      linear-gradient(
        0deg,
        rgba(10,7,5,.22),
        transparent 50%
      );
  }

  .deck-cover-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: min(100%, 1050px);
    height: 100%;
    padding: 35px 5%;
  }

  .deck-kicker {
    margin: 0;
    color: var(--primary);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3em;
    text-transform: uppercase;
  }

  .deck-cover-title {
    margin: 25px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(55px, 6vw, 108px);
    font-weight: 400;
    line-height: .99;
    letter-spacing: -.035em;
    color: var(--foreground);
  }

  .deck-cover-subtitle {
    margin: 26px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(23px, 2.3vw, 36px);
    font-style: italic;
    color: var(--primary);
  }

  .deck-cover-description {
    max-width: 680px;
    margin-top: 26px;
    color: var(--foreground);
    font-size: clamp(13px, 1vw, 16px);
    line-height: 1.75;
  }

  .deck-cover-description p {
    margin: 0 0 12px;
  }

  /* SLIDE INTERNE */

  .deck-content {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
    gap: clamp(30px, 4vw, 76px);
    width: 100%;
    height: 100%;
    padding: clamp(20px, 3vh, 36px) 5%;
    overflow: hidden;
  }

  .deck-text-column {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }

  .deck-heading {
    flex-shrink: 0;
    margin-bottom: 22px;
  }

  .deck-title {
    margin: 12px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(37px, 3.7vw, 68px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -.025em;
  }

  .deck-subtitle {
    margin: 10px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(19px, 1.6vw, 28px);
    font-style: italic;
    color: var(--primary);
  }

  .deck-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding-right: 12px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .deck-body p {
    margin: 0 0 19px;
    font-size: clamp(13px, .95vw, 16px);
    line-height: 1.75;
    color: var(--muted-foreground);
  }

  .deck-body p:first-child {
    color: var(--foreground);
  }

  .deck-body p:first-child::first-letter {
    float: left;
    padding-right: .08em;
    font-family: var(--font-serif);
    font-size: 3.3em;
    line-height: .85;
    color: var(--primary);
  }

  .deck-media-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 18px;
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .deck-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    flex: 0 0 auto;
    object-fit: cover;
    object-position: center;
    border: 0 !important;
    border-radius: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent;
  }

  .deck-points {
    width: 100%;
    flex: 0 0 auto;
    background: transparent;
  }

  .deck-points-label {
    margin: 0 0 10px;
    color: var(--primary);
    font-size: 10px;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .deck-point {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 8px 0;
    font-size: clamp(12px, .86vw, 14px);
    line-height: 1.55;
  }

  .deck-point-number {
    flex-shrink: 0;
    font-family: var(--font-serif);
    color: var(--primary);
  }

  .deck-quote {
    margin: 10px 0 0;
    padding-left: 18px;
    border-left: 2px solid var(--primary);
  }

  .deck-quote-text {
    font-family: var(--font-serif);
    font-size: clamp(19px, 1.7vw, 28px);
    font-style: italic;
    line-height: 1.3;
  }

  .deck-quote-author {
    margin-top: 12px;
    font-size: 12px;
    color: var(--muted-foreground);
  }

  /* INDICE */

  .deck-index {
    position: absolute;
    z-index: 30;
    inset: 0;
    overflow-y: auto;
    background: var(--popover);
    padding: 35px 5%;
  }

  .deck-index-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .deck-index-title {
    font-family: var(--font-serif);
    font-size: 55px;
  }

  .deck-index-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 45px;
  }

  .deck-index-item {
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

  .deck-index-item:hover,
  .deck-index-item.active {
    color: var(--primary);
  }

  .deck-index-item span:last-child {
    font-family: var(--font-serif);
    font-size: 24px;
  }

  /* RESPONSIVE */

  @media (max-width: 900px) {
    .deck-header {
      flex-basis: 54px;
      padding: 0 5%;
    }

    .deck-footer {
      flex-basis: 54px;
      padding: 0 5%;
      gap: 12px;
    }

    .deck-content {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      gap: 14px;
      padding: 16px 5%;
    }

    .deck-heading {
      margin-bottom: 12px;
    }

    .deck-title {
      font-size: clamp(34px, 6vw, 54px);
    }

    .deck-body p {
      font-size: 13px;
      line-height: 1.6;
    }

    .deck-media-column {
      max-height: 34vh;
      justify-content: flex-start;
    }

    .deck-image {
      width: min(100%, 560px);
    }

    .deck-cover-content {
      padding: 24px 6%;
    }

    .deck-cover-title {
      font-size: clamp(47px, 9vw, 85px);
    }

    .deck-index-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-height: 700px) and (min-width: 901px) {
    .deck-content {
      padding-top: 14px;
      padding-bottom: 14px;
    }

    .deck-heading {
      margin-bottom: 12px;
    }

    .deck-title {
      font-size: clamp(34px, 3vw, 55px);
    }

    .deck-media-column {
      justify-content: flex-start;
    }
  }
`;

function Cover({ page }: { page: Page }) {
  const { slide } = page;

  return (
    <section className="deck-cover">
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="deck-cover-image"
        />
      )}

      <div className="deck-cover-overlay" />

      <div className="deck-cover-content">
        <p className="deck-kicker">
          {slide.chapter}
        </p>

        <h1 className="deck-cover-title">
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className="deck-cover-subtitle">
            {slide.subtitle}
          </p>
        )}

        {page.paragraphs.length > 0 && (
          <div className="deck-cover-description">
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
    <section className="deck-content">
      <div className="deck-text-column">
        <div className="deck-heading">
          <p className="deck-kicker">
            {String(page.source + 1).padStart(2, "0")}
            {" · "}
            {slide.chapter}
          </p>

          <h2 className="deck-title">
            {slide.title}
          </h2>

          {slide.subtitle && (
            <p className="deck-subtitle">
              {slide.subtitle}
            </p>
          )}
        </div>

        <div className="deck-body">
          {page.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <aside className="deck-media-column">
        {slide.image && (
          <img
            src={slide.image}
            alt={slide.title}
            className="deck-image"
          />
        )}

        {Boolean(page.points?.length) && (
          <div className="deck-points">
            <p className="deck-points-label">
              Concetti fondamentali
            </p>

            {page.points!.map((point, i) => (
              <div className="deck-point" key={i}>
                <span className="deck-point-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        )}

        {page.quote && (
          <blockquote className="deck-quote">
            <p className="deck-quote-text">
              «{page.quote.text}»
            </p>
            <footer className="deck-quote-author">
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
  const pages = useMemo(() => createPages(), []);
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
        go(0);
      }

      if (event.key === "End") {
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
      <style>{deckCSS}</style>

      <div
        className="deck"
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
              ".deck-body, .deck-media-column"
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
        <header
  className="deck-header"
  style={{ background: "#b91c1c" }}
>
          <button
            className="deck-logo"
            type="button"
            onClick={() => go(0)}
          >
            Il Vero
          </button>

          <button
            className="deck-index-button"
            type="button"
            onClick={() => setIndexOpen(!indexOpen)}
          >
            {indexOpen ? "Chiudi" : "Indice"}
          </button>
        </header>

        <main className="deck-stage">
          <div
            key={current}
            className="h-full w-full"
          >
            {page.cover ? (
              <Cover page={page} />
            ) : (
              <ContentSlide page={page} />
            )}
          </div>

          {indexOpen && (
            <div className="deck-index">
              <div className="deck-index-top">
                <h2 className="deck-index-title">
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

              <div className="deck-index-grid">
                {pages.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`deck-index-item ${
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
            </div>
          )}
        </main>

        <footer className="deck-footer">
          <span className="deck-counter">
            {String(current + 1).padStart(2, "0")}
            {" / "}
            {total}
          </span>

          <div className="deck-progress">
            <div
              className="deck-progress-fill"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>

          <div className="deck-navigation">
            <button
              className="deck-arrow"
              type="button"
              aria-label="Slide precedente"
              disabled={current === 0}
              onClick={() => go(current - 1)}
            >
              <ArrowLeft size={17} />
            </button>

            <button
              className="deck-arrow"
              type="button"
              aria-label="Slide successiva"
              disabled={current === total - 1}
              onClick={() => go(current + 1)}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
