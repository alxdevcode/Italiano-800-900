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

function makePages(): Page[] {
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
        cover: !!slide.cover,
      }];
    }

    const cut = Math.ceil(slide.body.length / 2);

    return [
      {
        slide,
        source,
        part: 0,
        count: 2,
        paragraphs: slide.body.slice(0, cut),
        cover: false,
      },
      {
        slide,
        source,
        part: 1,
        count: 2,
        paragraphs: slide.body.slice(cut),
        points: slide.points,
        quote: slide.quote,
        cover: false,
      },
    ];
  });
}

function PageView({ page }: { page: Page }) {
  const s = page.slide;
  const hasImage = !!s.image && page.part === 0;

  // COPERTINA CINEMATOGRAFICA
  if (page.cover) {
    return (
      <section className="relative h-full w-full overflow-hidden">
        {s.image && (
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        <div className="relative z-10 flex h-full w-full flex-col justify-center px-[5vw]">
          <div className="max-w-[950px]">
            <p className="kicker">{s.chapter}</p>

            <h1 className="mt-6 font-serif text-[clamp(3rem,5.8vw,6.5rem)] leading-[1.05] tracking-tight text-white">
              {s.title}
            </h1>

            {s.subtitle && (
              <p className="mt-7 font-serif text-[clamp(1.3rem,2vw,2.2rem)] italic text-primary">
                {s.subtitle}
              </p>
            )}

            {page.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mt-6 max-w-[650px] text-[clamp(0.9rem,1.1vw,1.1rem)] leading-relaxed text-white/85"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-full w-full overflow-hidden bg-background">

      {/* IMMAGINE PANORAMICA SULLA DESTRA */}
      {hasImage && (
        <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden">
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover object-center"
          />

          {/* Sfumatura che integra l'immagine nello sfondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 via-[25%] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/20" />
        </div>
      )}

      {/* CONTENUTO */}
      <div className="relative z-10 flex h-full w-full flex-col px-[5vw] py-5">

        {/* TITOLO */}
        <div className="shrink-0">
          <p className="kicker">
            {String(page.source + 1).padStart(2, "0")} · {s.chapter}
            {page.count > 1
              ? ` · Parte ${page.part + 1}/${page.count}`
              : ""}
          </p>

          <h2 className="mt-3 max-w-[1100px] font-serif text-[clamp(2.2rem,3.7vw,4.2rem)] leading-[1.08] tracking-tight text-foreground">
            {s.title}
          </h2>

          {s.subtitle && (
            <p className="mt-2 font-serif text-[clamp(1rem,1.5vw,1.5rem)] italic text-primary">
              {s.subtitle}
            </p>
          )}
        </div>

        {/* CORPO DELLA SLIDE */}
        <div
          className={`grid min-h-0 flex-1 gap-8 pt-6 ${
            hasImage
              ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
              : "lg:grid-cols-2"
          }`}
        >
          {/* TESTO PRINCIPALE */}
          <div className="flex min-h-0 flex-col justify-center">
            <div className="space-y-4">
              {page.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`max-w-[850px] text-[clamp(0.84rem,1vw,1.04rem)] leading-[1.65] ${
                    i === 0
                      ? "dropcap text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* COLONNA DESTRA */}
          <aside className="flex min-h-0 flex-col justify-end pb-4">

            {/* PUNTI CHIAVE */}
            {page.points && page.points.length > 0 && (
              <div
                className={`w-full ${
                  hasImage
                    ? "rounded-sm bg-background/85 p-5 backdrop-blur-md"
                    : "border-t border-border/40"
                }`}
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-primary">
                  Concetti fondamentali
                </p>

                {page.points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-b border-border/30 py-2.5 last:border-0"
                  >
                    <span className="font-serif text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[clamp(0.82rem,0.95vw,0.98rem)] leading-snug text-foreground">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CITAZIONE */}
            {page.quote && (
              <blockquote className="mt-5 border-l-2 border-primary bg-background/80 p-5 backdrop-blur-md">
                <p className="font-serif text-[clamp(1.1rem,1.5vw,1.6rem)] italic leading-snug">
                  «{page.quote.text}»
                </p>

                <footer className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                  {page.quote.by}
                </footer>
              </blockquote>
            )}

            {/* ELEMENTO EDITORIALE PER SLIDE SENZA IMMAGINE */}
            {!hasImage && !page.points && !page.quote && (
              <div className="hidden border-l-2 border-primary/40 pl-8 lg:block">
                <p className="font-serif text-[clamp(2rem,3vw,4rem)] italic leading-tight text-primary/50">
                  {s.subtitle || s.chapter}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Deck({ index }: { index: number }) {
  const navigate = useNavigate();

  const pages = useMemo(makePages, []);
  const [menu, setMenu] = useState(false);

  const touch = useRef<number | null>(null);
  const wheelLock = useRef(0);

  const total = pages.length;
  const cur = Math.min(Math.max(index, 0), total - 1);
  const page = pages[cur]!;

  const go = useCallback(
    (n: number) => {
      const target = Math.min(Math.max(n, 0), total - 1);

      if (target !== cur) {
        navigate({
          to: "/",
          search: { s: target },
          replace: true,
        });
      }
    },
    [cur, navigate, total]
  );

  useEffect(() => {
    document.title = `${cur + 1}/${total} — ${page.slide.title}`;
  }, [cur, total, page.slide.title]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        return;
      }

      if (e.key.toLowerCase() === "m") {
        setMenu((v) => !v);
        return;
      }

      if (menu) return;

      if (
        ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)
      ) {
        e.preventDefault();
        go(cur + 1);
      }

      if (
        ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)
      ) {
        e.preventDefault();
        go(cur - 1);
      }

      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [cur, go, menu, total]);

  return (
    <div
      className="grain fixed inset-0 flex flex-col overflow-hidden border-0 bg-background text-foreground"
      onTouchStart={(e) => {
        touch.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touch.current === null || menu) return;

        const dx =
          (e.changedTouches[0]?.clientX ?? touch.current) -
          touch.current;

        if (Math.abs(dx) > 55) {
          go(cur + (dx < 0 ? 1 : -1));
        }

        touch.current = null;
      }}
      onWheel={(e) => {
        if (menu || Math.abs(e.deltaY) < 15) return;

        const now = Date.now();

        if (now - wheelLock.current < 750) return;

        wheelLock.current = now;
        go(cur + (e.deltaY > 0 ? 1 : -1));
      }}
    >
      {/* HEADER SENZA BORDI */}
      <header className="relative z-50 flex h-[64px] shrink-0 items-center justify-between border-0 bg-background px-[5vw]">
        <button
          onClick={() => go(0)}
          className="font-serif text-2xl tracking-tight"
        >
          Il Vero
        </button>

        <button
          onClick={() => setMenu((v) => !v)}
          className="rounded-full border border-border/40 px-5 py-2 text-sm transition hover:bg-secondary"
        >
          {menu ? "Chiudi" : "Indice"}
        </button>
      </header>

      {/* PRESENTAZIONE */}
      <main
        key={cur}
        className="min-h-0 flex-1 overflow-hidden border-0 animate-in fade-in duration-500"
      >
        <PageView page={page} />
      </main>

      {/* NAVIGAZIONE INFERIORE */}
      <footer className="relative z-40 flex h-[64px] shrink-0 items-center gap-5 border-0 bg-background px-[5vw]">
        <span className="font-serif text-lg tabular-nums">
          {String(cur + 1).padStart(2, "0")}
          <span className="text-muted-foreground">
            {" / "}
            {total}
          </span>
        </span>

        <div className="h-px flex-1 bg-border/40">
          <div
            className="h-px bg-primary transition-all duration-500"
            style={{
              width: `${((cur + 1) / total) * 100}%`,
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            aria-label="Precedente"
            onClick={() => go(cur - 1)}
            disabled={cur === 0}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/40 transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            aria-label="Successiva"
            onClick={() => go(cur + 1)}
            disabled={cur === total - 1}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/40 transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>

      {/* INDICE */}
      <nav
        className={`fixed inset-0 z-40 overflow-y-auto bg-popover transition-opacity duration-500 ${
          menu
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-14">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-serif text-5xl">
              Indice
            </h2>

            <button
              onClick={() => setMenu(false)}
              aria-label="Chiudi indice"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <ol className="grid gap-x-12 md:grid-cols-2">
            {slides.map((s, k) => {
              const p = pages.findIndex(
                (x) => x.source === k
              );

              return (
                <li
                  key={k}
                  className="border-b border-border/40"
                >
                  <button
                    onClick={() => {
                      go(p);
                      setMenu(false);
                    }}
                    className={`flex w-full items-baseline gap-4 py-4 text-left transition hover:opacity-60 ${
                      page.source === k
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    <span className="w-7 text-xs text-muted-foreground">
                      {String(k + 1).padStart(2, "0")}
                    </span>

                    <span className="font-serif text-xl md:text-2xl">
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </div>
  );
}
