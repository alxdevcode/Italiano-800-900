import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slides, type Slide } from "@/lib/slides";

type Page = { slide: Slide; source: number; part: number; count: number; paragraphs: string[]; points?: string[]; quote?: Slide["quote"]; cover: boolean };

// Exactly 24 pages: the 21 original chapters, plus one additional page
// for each of the three longest Verga analyses.
const SPLIT_TITLES = new Set(["Rosso Malpelo", "I Malavoglia", "Mastro-don Gesualdo"]);
function makePages(): Page[] {
  return slides.flatMap((slide, source) => {
    if (!SPLIT_TITLES.has(slide.title)) return [{ slide, source, part: 0, count: 1, paragraphs: slide.body, points: slide.points, quote: slide.quote, cover: !!slide.cover }];
    const cut = Math.ceil(slide.body.length / 2);
    return [
      { slide, source, part: 0, count: 2, paragraphs: slide.body.slice(0,cut), cover: false },
      { slide, source, part: 1, count: 2, paragraphs: slide.body.slice(cut), points: slide.points, quote: slide.quote, cover: false },
    ];
  });
}

function PageView({ page }: { page: Page }) {
  const s = page.slide;
  if (page.cover) return (
    <section className="relative h-full w-full overflow-hidden">
      {s.image && <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="veil absolute inset-0" />
      <div className="relative z-10 flex h-full max-w-5xl flex-col justify-center px-8 md:px-16">
        <p className="kicker">{s.chapter}</p>
        <h1 className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-none">{s.title}</h1>
        {s.subtitle && <p className="mt-5 font-serif text-xl italic text-primary md:text-3xl">{s.subtitle}</p>}
        {page.paragraphs.map((b,k)=><p key={k} className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90">{b}</p>)}
      </div>
    </section>
  );
  const showImage = !!s.image && page.part === 0;
  return (
    <section className="mx-auto flex h-full w-full max-w-[1550px] flex-col px-8 py-5 md:px-12 lg:px-16">
      <div className="mb-4 shrink-0">
        <p className="kicker">{String(page.source+1).padStart(2,"0")} · {s.chapter}{page.count>1 ? ` · Parte ${page.part+1}/2` : ""}</p>
        <h2 className="mt-2 font-serif text-[clamp(2.2rem,3.4vw,3.8rem)] leading-[1.06]">{s.title}</h2>
        {s.subtitle && <p className="mt-1 font-serif text-lg italic text-primary md:text-xl">{s.subtitle}</p>}
      </div>
      <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.9fr)] lg:gap-12">
        <div className="flex min-h-0 flex-col justify-center gap-4">
          <div className="space-y-4 text-[clamp(0.86rem,1.05vw,1.02rem)] leading-[1.58] text-muted-foreground">
            {page.paragraphs.map((b,k)=><p key={k} className={k===0?"dropcap text-foreground":""}>{b}</p>)}
          </div>
        </div>
        <aside className="flex min-h-0 flex-col justify-center gap-4">
          {showImage && <img src={s.image} alt={s.title} className="max-h-[31vh] w-full rounded-sm object-cover" />}
          {page.points && <div className="border-t border-border">{page.points.map((point,k)=><div key={k} className="flex gap-3 border-b border-border py-2.5 text-[clamp(0.82rem,0.96vw,0.96rem)] leading-snug"><span className="font-serif text-primary">{String(k+1).padStart(2,"0")}</span><span>{point}</span></div>)}</div>}
          {page.quote && <blockquote className="border-l-2 border-primary pl-4"><p className="font-serif text-[clamp(1.1rem,1.55vw,1.6rem)] italic leading-snug">«{page.quote.text}»</p><footer className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{page.quote.by}</footer></blockquote>}
          {!showImage && !page.points && !page.quote && <div className="hidden border-l border-primary/40 pl-6 font-serif text-2xl italic text-primary/70 lg:block">{s.subtitle || s.chapter}</div>}
        </aside>
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
    <main key={cur} className="min-h-0 flex-1 overflow-hidden animate-in fade-in duration-500"><PageView page={page}/></main>
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
