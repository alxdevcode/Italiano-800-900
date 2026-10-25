import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Deck } from "@/components/Deck";

export const Route = createFileRoute("/")({
  validateSearch: z.object({ s: z.number().int().min(0).optional() }),
  head: () => ({
    meta: [
      { title: "Il Vero — Positivismo, Naturalismo e Verismo" },
      { name: "description", content: "Percorso interattivo su Positivismo, Evoluzionismo, Flaubert, Zola, Capuana, De Roberto e Giovanni Verga." },
      { property: "og:title", content: "Il Vero — Positivismo, Naturalismo e Verismo" },
      { property: "og:description", content: "Dalla fede nel progresso ai vinti di Verga: un viaggio editoriale a diapositive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { s } = Route.useSearch();
  return <Deck index={s ?? 0} />;
}
