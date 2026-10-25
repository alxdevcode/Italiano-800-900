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
  part: number;
  count: number;
  paragraphs: string[];
  points?: string[];
  quote?: Slide["quote"];
  cover: boolean;
};

const SPLIT_TITLES = new Set([
  "Rosso Malpelo",
  "I Malavoglia",
  "Mastro-don Gesualdo",
]);

function createPages(): Page[] {
  return slides.flatMap((slide, source) => {
    if (!SPLIT_TITLES.has(slide.title)) {
      return [{
        slide,
        source,
        part: 0,
        count: 1,
        paragraphs: slide.body,
        points: slide.points,
        quote: slide.quote,
        cover: Boolean(slide.cover),
      }];
    }

    const middle = Math.ceil(slide.body.length / 2);

    return [
      {
        slide,
        source,
        part: 0,
        count: 2,
        paragraphs: slide.body.slice(0, middle),
        cover: false,
      },
      {
        slide,
        source,
        part: 1,
        count: 2,
        paragraphs: slide.body.slice(middle),
        points: slide.points,
        quote: slide.quote,
        cover: false,
      },
    ];
  });
}

const styles = `
  .literary-deck {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    overflow: hidden !important;
    display: flex;
    flex-direction: column;
    isolation: isolate;
    background: var(--background);
    color: var(--foreground);
    z-index: 100;
  }

  .literary-deck *,
  .literary-deck *::before,
  .literary-deck *::after {
    box-sizing: border-box;
  }

  .literary-header {
    position: relative;
    z-index: 20;
    height: 62px;
    flex: 0 0 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4.5%;
    background: var(--background);
    border: 0 !important;
    box-shadow: none !important;
  }

  .literary-stage {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    overflow: hidden;
    border: 0 !important;
  }

  .literary-footer {
    position: relative;
    z-index: 20;
    height: 58px;
    flex: 0 0 58px;
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 0 4.5%;
    background: var(--background);
    border: 0 !important;
  }

  .literary-cover {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--background);
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

  .literary-cover-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(13,10,8,.91) 0%,
        rgba(13,10,8,.65) 36%,
        rgba(13,10,8,.15) 85%
      ),
      linear-gradient(
        0deg,
        rgba(13,10,8,.25),
        transparent 45%
      );
  }

  .literary-cover-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: min(100%, 980px);
    padding: 32px 5%;
  }

  .literary-content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: var(--background);
  }

  .literary-layout {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
    gap: clamp(26px, 4vw, 76px);
    width: 100%;
    height: 100%;
    padding: clamp(20px, 3vh, 34px) 5%;
  }

  .literary-main {
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  }

  .literary-heading {
    flex-shrink: 0;
    margin-bottom: clamp(12px, 2vh, 24px);
  }

  .literary-body {
    min-height: 0;
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    padding-right: 8px;
    mask-image: linear-gradient(
      to bottom,
      black 0%,
      black 94%,
      transparent 100%
    );
  }

  .literary-body::-webkit-scrollbar,
  .literary-side-scroll::-webkit-scrollbar {
    display: none;
  }

  .literary-body p {
    margin: 0 0 1em;
    font-size: clamp(13px, .96vw, 16px);
    line-height: 1.67;
    color: var(--muted-foreground);
  }

  .literary-body p:first-child {
    color: var(--foreground);
  }

  .literary-side {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
  }

  .literary-image {
    display: block;
    width: 100%;
    height: auto;
    max-height: 54%;
    min-height: 0;
    flex: 1 1 auto;
    object-fit: cover;
    object-position: center;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    outline: none !important;
    background: transparent !important;
  }

  .literary-side-scroll {
    flex: 0 1 auto;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .literary-point {
    display: flex;
    align-items: baseline;
    gap: 13px;
    padding: 7px 0;
    font-size: clamp(12px, .85vw, 14px);
    line-height: 1.5;
  }

  .literary-quote {
    margin-top: 14px;
    padding-left: 16px;
    border-left: 2px solid var(--primary);
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

  .literary-icon-button {
    width: 39px;
    height: 39px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: transparent;
    transition: background .2s ease;
  }

  .literary-icon-button:hover:not(:disabled) {
    background: var(--secondary);
  }

  .literary-icon-button:disabled {
    opacity: .25;
    cursor: not-allowed;
  }

  .literary-index {
    position: absolute;
    z-index: 50;
    inset: 0;
    overflow-y: auto;
    background: var(--popover);
    padding: 90px 6% 45px;
  }

  @media (min-width: 1100px) {
    .literary-layout.no-image {
      grid-template-columns: minmax(0, 1fr) minmax(0, .85fr);
    }

    .literary-layout.no-image .literary-main {
      max-width: 850px;
    }
  }

  @media (max-width: 900px) {
    .literary-layout {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      gap: 14px;
      padding: 18px 5%;
    }

    .literary-side {
      max-height: 32vh;
    }

    .literary-image {
      max-height: 19vh;
      flex: 0 0 auto;
      width: 100%;
      aspect-ratio: 16 / 7;
    }

    .literary-side-scroll {
      max-height: 11vh;
    }

    .literary-body p {
      font-size: 13px;
      line-height: 1.55;
    }

    .literary-cover-content {
      padding: 25px 6%;
    }
  }

  @media (max-height: 650px) and (min-width: 901px) {
    .literary-layout {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .literary-heading {
      margin-bottom: 8px;
    }

    .literary-image {
      max-height: 43%;
    }

    .literary-header {
      height: 50px;
      flex-basis: 50px;
    }

    .literary-footer {
      height: 48px;
      flex-basis: 48px;
    }
  }
`;

function Cover({ page }: { page: Page }) {
  const slide = page.slide;

  return (
    <section className="literary-cover">
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="literary-cover-image"
        />
      )}

      <div className="literary-cover-shade" />

      <div className="literary-cover-content">
        <p className="kicker">
          {slide.chapter}
        </p>

        <h1 className="mt-6 max-w-[950px] font-serif text-[clamp(3.2rem,6vw,7rem)] leading-[.99] tracking-tight text-foreground">
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className="mt-7 font-serif text-[clamp(1.3rem,2vw,2.3rem)] italic text-primary">
            {slide.subtitle}
          </p>
        )}

        <div className="mt-7 max-w-[650px] space-y-4">
          {page.paragraphs.map((text, i) => (
            <p
              key={i}
              className="text-[clamp(.88rem,1.1vw,1.1rem)] leading-relaxed text-foreground/85"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentPage({ page }: { page: Page }) {
  const slide = page.slide;
  const showImage = Boolean(slide.image && page.part === 0);
  const showPoints = Boolean(page.points?.length);
  const showQuote = Boolean(page.quote);

  return (
    <section className="literary-content">
      <div
        className={`literary-layout ${
          showImage ? "" : "no-image"
        }`}
      >
        <div className="literary-main">
          <div className="literary-heading">
            <p className="kicker">
              {String(page.source + 1).padStart(2, "0")}
              {" · "}
              {slide.chapter}
              {page.count > 1 &&
                ` · Parte ${page.part + 1}/${page.count}`}
            </p>

            <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.6vw,4.4rem)] leading-[1.05] tracking-tight">
              {slide.title}
            </h2>

            {slide.subtitle && (
              <p className="mt-2 font-serif text-[clamp(1.05rem,1.5vw,1.6rem)] italic text-primary">
                {slide.subtitle}
              </p>
            )}
          </div>

          <div className="literary-body">
            {page.paragraphs.map((text, i) => (
              <p
                key={i}
                className={i === 0 ? "dropcap" : ""}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        <aside className="literary-side">
          {showImage && (
            <img
              src={slide.image}
              alt={slide.title}
              className="literary-image"
            />
          )}

          {(showPoints || showQuote) && (
            <div className="literary-side-scroll">
              {showPoints && (
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-primary">
                    Concetti fondamentali
                  </p>

                  {page.points!.map((point, i) => (
                    <div
                      className="literary-point"
                      key={i}
                    >
                      <span className="shrink-0 font-serif text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="text-foreground/90">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {showQuote && (
                <blockquote className="literary-quote">
                  <p className="font-serif text-[clamp(1.1rem,1.5vw,1.7rem)] italic leading-snug">
                    «{page.quote!.text}»
                  </p>

                  <footer className="mt-3 text-xs tracking-wide text-muted-foreground">
                    {page.quote!.by}
                  </footer>
                </blockquote>
              )}
            </div>
          )}

          {!showImage && !showPoints && !showQuote && (
            <div className="flex h-full items-center justify-center">
              <p className="max-w-md font-serif text-[clamp(2.5rem,4vw,5rem)] italic leading-tight text-primary/50">
                {slide.subtitle || slide.chapter}
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export function Deck({ index }: { index: number }) {
  const navigate = useNavigate();

  const pages = useMemo(() => createPages(), []);
  const [menu, setMenu] = useState(false);

  const touchStart = useRef<number | null>(null);
  const wheelLock = useRef(0);

  const total = pages.length;
  const current = Math.max(0, Math.min(index, total - 1));
  const page = pages[current];

  const go = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(next, total - 1));

      if (target === current) return;

      navigate({
        to: "/",
        search: { s: target },
        replace: true,
      });
    },
    [current, navigate, total]
  );

  useEffect(() => {
    document.title =
      `${current + 1}/${total} — ${page.slide.title}`;
  }, [current, total, page.slide.title]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        return;
      }

      if (event.key.toLowerCase() === "m") {
        setMenu((previous) => !previous);
        return;
      }

      if (menu) return;

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (
        ["ArrowRight", "PageDown", " "].includes(event.key)
      ) {
        event.preventDefault();
        go(current + 1);
      }

      if (
        ["ArrowLeft", "PageUp"].includes(event.key)
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

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [current, go, menu, total]);

  return (
    <>
      <style>{styles}</style>

      <div
        className="literary-deck"
        onTouchStart={(event) => {
          touchStart.current =
            event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (menu || touchStart.current === null) return;

          const end = event.changedTouches[0]?.clientX;
          if (end === undefined) return;

          const delta = end - touchStart.current;

          if (Math.abs(delta) > 65) {
            go(current + (delta < 0 ? 1 : -1));
          }

          touchStart.current = null;
        }}
        onWheel={(event) => {
          if (menu) return;

          // Non cambiare slide mentre si legge un testo lungo.
          const target = event.target;
          if (
            target instanceof Element &&
            target.closest(
              ".literary-body, .literary-side-scroll"
            )
          ) {
            return;
          }

          if (Math.abs(event.deltaY) < 25) return;

          const now = Date.now();
          if (now - wheelLock.current < 850) return;

          wheelLock.current = now;
          go(current + (event.deltaY > 0 ? 1 : -1));
        }}
      >
        <header className="literary-header">
          <button
            type="button"
            onClick={() => go(0)}
            className="font-serif text-2xl tracking-tight"
          >
            Il Vero
          </button>

          <button
            type="button"
            onClick={() => setMenu((previous) => !previous)}
            className="rounded-full border border-border/30 px-5 py-2 text-xs transition hover:bg-secondary"
          >
            {menu ? "Chiudi" : "Indice"}
          </button>
        </header>

        <main className="literary-stage">
          <div
            key={current}
            className="h-full w-full animate-in fade-in duration-500"
          >
            {page.cover ? (
              <Cover page={page} />
            ) : (
              <ContentPage page={page} />
            )}
          </div>
        </main>

        <footer className="literary-footer">
          <span className="shrink-0 font-serif text-lg tabular-nums">
            {String(current + 1).padStart(2, "0")}
            <span className="text-muted-foreground">
              {" / "}
              {total}
            </span>
          </span>

          <div className="literary-progress">
            <div
              className="literary-progress-fill"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Slide precedente"
              className="literary-icon-button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              aria-label="Slide successiva"
              className="literary-icon-button"
              onClick={() => go(current + 1)}
              disabled={current === total - 1}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </footer>

        {menu && (
          <nav className="literary-index">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="font-serif text-5xl">
                  Indice
                </h2>

                <button
                  type="button"
                  onClick={() => setMenu(false)}
                  aria-label="Chiudi indice"
                >
                  <X size={24} />
                </button>
              </div>

              <ol className="grid gap-x-12 md:grid-cols-2">
                {slides.map((slide, source) => {
                  const firstPage = pages.findIndex(
                    (item) => item.source === source
                  );

                  return (
                    <li
                      key={source}
                      className="border-b border-border/30"
                    >
                      <button
                        type="button"
                        className={`flex w-full items-baseline gap-4 py-4 text-left transition hover:opacity-60 ${
                          page.source === source
                            ? "text-primary"
                            : ""
                        }`}
                        onClick={() => {
                          setMenu(false);
                          go(firstPage);
                        }}
                      >
                        <span className="w-7 text-xs text-muted-foreground">
                          {String(source + 1).padStart(2, "0")}
                        </span>

                        <span className="font-serif text-xl md:text-2xl">
                          {slide.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
