import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slides, type Slide } from "@/lib/slides";

type Page = { slide: Slide; source: number; part: number; count: number; paragraphs: string[]; points?: string[]; quote?: Slide["quote"]; cover: boolean };

// Content is paginated instead of being forced into a fixed-height slide.
// Paragraphs are never shortened or hidden behind navigation controls.
function makePages(): Page[] {
  return slides.flatMap((slide, source) => {
    if (slide.cover) return [{ slide, source, part: 0, count: 1, paragraphs: slide.body, cover: true }];
    const chunks: { paragraphs: string[]; points?: string[]; quote?: Slide["quote"] }[] = [];
    const body = slide.body;
    for (let i = 0; i < body.length; i += 2) {
      const first = body[i] ?? "";
      const second = body[i + 1];
      // Long paragraphs get a page of their own for comfortable reading.
      if (second && first.length + second.length <= 830) chunks.push({ paragraphs: [first, second] });
      else {
        chunks.push({ paragraphs: [first] });
        if (second) chunks.push({ paragraphs: [second] });
      }
    }
    if (slide.points?.length) chunks.push({ paragraphs: [], points: slide.points });
    if (slide.quote) chunks.push({ paragraphs: [], quote: slide.quote });
    if (!chunks.length) chunks.push({ paragraphs: [] });
    return chunks.map((chunk, part) => ({ slide, source, part, count: chunks.length, cover: false, ...chunk }));
  });
}

function PageView({ page, number }: { page: Page; number: number }) {
  const { slide: s, cover } = page;
  if (cover) return (
    <section className="relative h-full w-full overflow-hidden">
      {s.image && <img src={s.image} alt="" className="reveal-img absolute inset-0 h-full w-full object-cover" />}
      <div className="veil absolute inset-0" />
      <div className="relative z-10 flex h-full max-w-5xl flex-col justify-center px-7 py-8 md:px-16">
        <p className="kicker reveal">{s.chapter}</p>
        <h1 className="reveal mt-5 font-serif text-[clamp(3rem,6.2vw,6.4rem)] leading-[0.99]">{s.title}</h1>
        {s.subtitle && <p className="reveal mt-6 font-serif text-xl italic text-primary md:text-3xl">{s.subtitle}</p>}
        {page.paragraphs.map((b,k) => <p key={k} className="reveal mt-7 max-w-xl text-sm leading-relaxed text-foreground/85 md:text-lg">{b}</p>)}
      </div>
    </section>
  );

  const showImage = Boolean(s.image) && page.part === 0;
  const isPoints = Boolean(page.points);
  const isQuote = Boolean(page.quote);
  return (
    <section className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-7 py-5 md:px-14 lg:px-20">
      <div className="mb-5 shrink-0">
        <p className="kicker reveal">{String(page.source + 1).padStart(2,"0")} · {s.chapter} {page.count > 1 ? ` / ${page.part + 1} di ${page.count}` : ""}</p>
        <h2 className="reveal mt-3 font-serif text-[clamp(2.2rem,4vw,4.3rem)] leading-[1.06]">{s.title}</h2>
        {s.subtitle && <p className="reveal mt-2 font-serif text-lg italic text-primary md:text-2xl">{s.subtitle}</p>}
      </div>
      <div className={`min-h-0 w-full ${showImage ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14" : ""}`}>
        <div className="min-w-0 max-w-[920px] space-y-5 text-[clamp(0.94rem,1.25vw,1.17rem)] leading-[1.7] text-muted-foreground">
          {page.paragraphs.map((b,k) => <p key={k} className={`reveal ${k === 0 ? "dropcap text-foreground" : ""}`}>{b}</p>)}
          {isPoints && <div className="grid gap-x-10 border-t border-border sm:grid-cols-2">{page.points!.map((p,k) => <div key={k} className="reveal flex gap-4 border-b border-border py-4 text-[clamp(0.9rem,1.1vw,1.1rem)]"><span className="font-serif text-primary">{String(k+1).padStart(2,"0")}</span><span>{p}</span></div>)}</div>}
          {isQuote && <blockquote className="reveal max-w-4xl border-l-2 border-primary pl-6"><p className="font-serif text-[clamp(1.4rem,2.4vw,2.6rem)] italic leading-snug text-foreground">«{page.quote!.text}»</p><footer className="mt-5 text-xs uppercase tracking-widest">{page.quote!.by}</footer></blockquote>}
        </div>
        {showImage && <div className="hidden overflow-hidden rounded-sm lg:block"><img src={s.image} alt={s.title} className="reveal-img aspect-[5/4] w-full object-cover" /></div>}
      </div>
      {page.count > 1 && <p className="mt-5 shrink-0 text-xs uppercase tracking-[0.2em] text-primary/80">{page.part + 1 === page.count ? "Fine del capitolo" : "Continua nella schermata successiva →"}</p>}
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
  const go = useCallback((n: number) => {
    const target = Math.min(Math.max(n,0), total-1);
    if (target !== cur) navigate({ to: "/", search: { s: target }, replace: true });
  }, [cur,navigate,total]);

  useEffect(() => { document.title = `${cur+1}/${total} — ${page.slide.title}`; }, [cur,total,page.slide.title]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(false); return; }
      if (e.key.toLowerCase() === "m") { setMenu(v=>!v); return; }
      if (menu) return;
      if (["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)) { e.preventDefault(); go(cur+1); }
      if (["ArrowLeft","ArrowUp","PageUp"].includes(e.key)) { e.preventDefault(); go(cur-1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total-1);
    };
    window.addEventListener("keydown",onKey);
    return () => window.removeEventListener("keydown",onKey);
  },[cur,go,menu,total]);

  return <div className="grain fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground" onTouchStart={e=>{touch.current=e.touches[0]?.clientX??null;}} onTouchEnd={e=>{if(touch.current===null||menu)return;const dx=(e.changedTouches[0]?.clientX??touch.current)-touch.current;if(Math.abs(dx)>55)go(cur+(dx<0?1:-1));touch.current=null;}} onWheel={e=>{if(menu||Math.abs(e.deltaY)<15)return;const now=Date.now();if(now-wheelLock.current<750)return;wheelLock.current=now;go(cur+(e.deltaY>0?1:-1));}}>
    <header className="relative z-50 flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/95 px-6 md:h-[72px] md:px-14">
      <button onClick={()=>go(0)} className="font-serif text-xl tracking-tight md:text-2xl">Il Vero</button>
      <button onClick={()=>setMenu(v=>!v)} className="rounded-full border border-border px-5 py-2 text-sm transition hover:bg-secondary">{menu?"Chiudi":"Indice"}</button>
    </header>
    <main key={cur} className="min-h-0 flex-1 overflow-hidden animate-in fade-in duration-500"><PageView page={page} number={cur}/></main>
    <footer className="relative z-40 flex h-[72px] shrink-0 items-center gap-4 border-t border-border/60 bg-background/95 px-6 md:px-14">
      <span className="font-serif text-base tabular-nums md:text-lg">{String(cur+1).padStart(2,"0")}<span className="text-muted-foreground"> / {total}</span></span>
      <div className="h-px flex-1 bg-border"><div className="h-px bg-primary transition-all duration-500" style={{width:`${(cur+1)/total*100}%`}} /></div>
      <div className="flex gap-2"><button aria-label="Precedente" onClick={()=>go(cur-1)} disabled={cur===0} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30"><ArrowLeft className="h-4 w-4"/></button><button aria-label="Successiva" onClick={()=>go(cur+1)} disabled={cur===total-1} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30"><ArrowRight className="h-4 w-4"/></button></div>
    </footer>
    <nav className={`fixed inset-0 z-40 overflow-y-auto bg-popover transition-opacity duration-500 ${menu?"visible opacity-100":"invisible opacity-0 pointer-events-none"}`}>
      <ol className="mx-auto grid max-w-6xl gap-x-12 px-6 pb-20 pt-24 md:grid-cols-2 md:px-14">{slides.map((s,k)=>{const p=pages.findIndex(x=>x.source===k);return <li key={k} className="border-b border-border"><button onClick={()=>{go(p);setMenu(false);}} className={`flex w-full items-baseline gap-4 py-3 text-left hover:opacity-60 ${page.source===k?"text-primary":""}`}><span className="w-6 text-xs text-muted-foreground">{String(k+1).padStart(2,"0")}</span><span className="font-serif text-xl md:text-2xl">{s.title}</span></button></li>;})}</ol>
    </nav>
  </div>;
}
