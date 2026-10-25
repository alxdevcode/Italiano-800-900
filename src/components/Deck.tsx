import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slides, type Slide } from "@/lib/slides";

function SlideView({ s, i }: { s: Slide; i: number }) {
  const d = (n: number) => ({ animationDelay: `${150 + n * 120}ms` });
  if (s.cover) {
    return (
      <section className="relative h-full w-full overflow-hidden">
        {s.image && <img src={s.image} alt="" className="reveal-img absolute inset-0 h-full w-full object-cover" />}
        <div className="veil absolute inset-0" />
        <div className="relative z-10 flex h-full max-w-5xl flex-col justify-end px-6 pb-24 md:px-16 md:pb-32">
          <p className="kicker reveal" style={d(0)}>{s.chapter}</p>
          <h1 className="reveal mt-5 font-serif text-5xl leading-[0.92] md:text-8xl" style={d(1)}>{s.title}</h1>
          {s.subtitle && <p className="reveal mt-6 font-serif text-2xl italic text-primary md:text-3xl" style={d(2)}>{s.subtitle}</p>}
          {s.body.map((b) => <p key={b} className="reveal mt-6 max-w-xl text-muted-foreground md:text-lg" style={d(3)}>{b}</p>)}
          {i === 0 && <p className="reveal mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={d(4)}>Usa le frecce, la rotella o scorri →</p>}
        </div>
      </section>
    );
  }
  return (
    <section className={`grid h-full w-full ${s.image ? "md:grid-cols-[1.1fr_0.9fr]" : ""}`}>
      <div className="flex flex-col justify-center overflow-y-auto px-6 pb-28 pt-24 md:px-16">
        <div className="max-w-2xl">
          <p className="kicker reveal" style={d(0)}>{String(i).padStart(2, "0")} · {s.chapter}</p>
          <h2 className="reveal mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" style={d(1)}>{s.title}</h2>
          {s.subtitle && <p className="reveal mt-3 font-serif text-xl italic text-primary md:text-2xl" style={d(2)}>{s.subtitle}</p>}
          <div className="mt-8 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground md:text-lg">
            {s.body.map((b, k) => (
              <p key={k} className={`reveal ${k === 0 ? "dropcap text-foreground" : ""}`} style={d(3 + k)}>{b}</p>
            ))}
          </div>
          {s.points && (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {s.points.map((p, k) => (
                <li key={p} className="reveal flex gap-4 py-3 text-sm md:text-base" style={d(4 + k)}>
                  <span className="font-serif text-primary">{String(k + 1).padStart(2, "0")}</span>{p}
                </li>
              ))}
            </ul>
          )}
          {s.quote && (
            <blockquote className="reveal mt-10 border-l-2 border-accent pl-6" style={d(6)}>
              <p className="font-serif text-2xl italic leading-snug md:text-3xl">«{s.quote.text}»</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.quote.by}</footer>
            </blockquote>
          )}
        </div>
      </div>
      {s.image && (
        <div className="relative hidden overflow-hidden md:block">
          <img src={s.image} alt={s.title} className="reveal-img h-full w-full object-cover" loading="lazy" />
        </div>
      )}
    </section>
  );
}

export function Deck({ index }: { index: number }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const lock = useRef(0);
  const touch = useRef<number | null>(null);
  const total = slides.length;
  const cur = Math.min(Math.max(index, 0), total - 1);
  const slide = slides[cur]!;

  const go = useCallback(
    (n: number) => {
      const t = Math.min(Math.max(n, 0), total - 1);
      if (t !== cur) navigate({ to: "/", search: { s: t }, replace: true });
    },
    [cur, navigate, total],
  );

  useEffect(() => {
    document.title = `${cur + 1}/${total} — ${slide.title}`;
  }, [cur, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(cur + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(cur - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
      if (e.key === "Escape") setMenu(false);
      if (e.key.toLowerCase() === "m") setMenu((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cur, go, total]);

  const onWheel = (e: React.WheelEvent) => {
    if (menu || Math.abs(e.deltaY) < 30) return;
    const now = Date.now();
    if (now - lock.current < 900) return;
    const el = (e.target as HTMLElement).closest(".overflow-y-auto") as HTMLElement | null;
    if (el && el.scrollHeight > el.clientHeight + 4) {
      const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      const atTop = el.scrollTop <= 0;
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atTop)) return;
    }
    lock.current = now;
    go(cur + (e.deltaY > 0 ? 1 : -1));
  };

  return (
    <div
      className="grain fixed inset-0 bg-background text-foreground"
      onWheel={onWheel}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 md:h-20 md:px-16">
        <button onClick={() => go(0)} className="font-serif text-2xl tracking-tight">Il Vero</button>
        <button
          onClick={() => setMenu((m) => !m)}
          className="rounded-full border border-border px-5 py-2 text-sm backdrop-blur-md transition-colors hover:bg-secondary"
        >
          {menu ? "Chiudi" : "Indice"}
        </button>
      </header>

      <main key={cur} className="h-full w-full animate-in fade-in duration-700">
        <SlideView s={slide} i={cur} />
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-6 px-6 pb-6 md:px-16 md:pb-8">
        <span className="font-serif text-lg tabular-nums">
          {String(cur + 1).padStart(2, "0")}<span className="text-muted-foreground"> / {total}</span>
        </span>
        <div className="h-px flex-1 bg-border">
          <div className="h-px bg-primary transition-all duration-700" style={{ width: `${((cur + 1) / total) * 100}%`, transitionTimingFunction: "var(--ease-out-expo)" }} />
        </div>
        <div className="flex gap-2">
          <button aria-label="Precedente" onClick={() => go(cur - 1)} disabled={cur === 0} className="grid h-10 w-10 place-items-center rounded-full border border-border backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button aria-label="Successiva" onClick={() => go(cur + 1)} disabled={cur === total - 1} className="grid h-10 w-10 place-items-center rounded-full border border-border backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>

      <nav
        className={`fixed inset-0 z-40 overflow-y-auto bg-popover transition-all duration-700 ${menu ? "visible opacity-100" : "invisible opacity-0"}`}
        style={{ transitionTimingFunction: "var(--ease-curtain)" }}
      >
        <ol className="mx-auto grid max-w-6xl gap-x-12 px-6 pb-16 pt-28 md:grid-cols-2 md:px-16">
          {slides.map((s, k) => (
            <li
              key={k}
              className={`border-b border-border transition-all duration-500 ${menu ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: menu ? `${100 + k * 30}ms` : "0ms" }}
            >
              <button
                onClick={() => { go(k); setMenu(false); }}
                className={`flex w-full items-baseline gap-4 py-3 text-left transition-opacity hover:opacity-60 ${k === cur ? "text-primary" : ""}`}
              >
                <span className="w-6 text-xs text-muted-foreground">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl md:text-3xl">{s.title}</span>
                <span className="ml-auto hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">{s.chapter}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
