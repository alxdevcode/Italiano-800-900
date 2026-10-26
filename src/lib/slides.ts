import cover from "@/assets/cover.jpg";
import positivismo from "@/assets/positivismo.jpg";
import evoluzionismo from "@/assets/evoluzionismo.jpg";
import flaubert from "@/assets/flaubert.jpg";
import festa from "@/assets/festa.jpg";
import letteratura_scienza from "@/assets/letteratura_scienza.jpg";
import principi_naturalismo from "@/assets/principi_naturalismo.jpg";
import zola from "@/assets/zola.jpg";
import germinale from "@/assets/germinale.jpg";
import naturalismo_italiano from "@/assets/naturalismo_italiano.jpg";
import capuana from "@/assets/capuana.jpg";
import de_roberto from "@/assets/de_roberto.jpg";
import verga from "@/assets/verga.jpg";
import nedda from "@/assets/nedda.jpg";
import capinera from "@/assets/capinera.jpg";
import romanzi_mondani from "@/assets/romanzi_mondani.jpg";
import lettera from "@/assets/lettera.jpg";
import rosso_malpelo from "@/assets/rosso_malpelo.jpg";
import malavoglia from "@/assets/malavoglia.jpg";
import gesualdo from "@/assets/gesualdo.jpg";
import fine from "@/assets/fine.jpg";



export type Slide = {
  chapter: string;
  title: string;
  subtitle?: string;
  body: string[];
  points?: string[];
  quote?: { text: string; by: string };
  image?: string;
  cover?: boolean;
};

export const chapters = ["Il contesto", "Francia", "Italia", "Verga"] as const;

export const slides: Slide[] = [
  {
    chapter: "Ottocento",
    title: "Positivismo, Naturalismo, Verismo",
    subtitle: "La letteratura che volle farsi scienza",
    body: ["Un viaggio per immagini e parole dalla fiducia nel progresso alla Sicilia dei «vinti»."],
    cover: true,

    image: cover,
  },
  {
    chapter: "Il contesto",
    title: "Il Positivismo",
    subtitle: "La fede nei fatti",
    body: [
      "Il Positivismo si afferma nella seconda metà dell’Ottocento, in un’Europa trasformata dall’industrializzazione, dallo sviluppo dei trasporti e dalle scoperte scientifiche. Secondo questa corrente, la conoscenza deve partire da fatti osservabili e verificabili, non da spiegazioni astratte o soprannaturali. La scienza appare quindi lo strumento più affidabile per comprendere la realtà e migliorare la società.",
      "Auguste Comte, uno dei principali fondatori del Positivismo, descrive il progresso del pensiero umano attraverso tre stadi: teologico, quando si spiegano i fenomeni con le divinità; metafisico, quando si ricorre a principi astratti; positivo, quando si ricercano le leggi dei fenomeni mediante osservazione e ragionamento scientifico.",
      "Questa mentalità influenza anche gli scrittori: il romanzo comincia a osservare con attenzione la società, le condizioni economiche, il comportamento degli individui e l’ambiente in cui vivono. Nasce così un legame fondamentale tra Positivismo, Realismo e Naturalismo, anche se non tutti gli autori condividono la stessa fiducia nel progresso.",
    ],
    points: ["Legge dei tre stadi: teologico, metafisico, positivo", "Nascita della sociologia", "Hippolyte Taine: razza, ambiente, momento storico"],

    image: positivismo,
  },
  {
    chapter: "Il contesto",
    title: "L'Evoluzionismo",
    subtitle: "Darwin e la lotta per l'esistenza",
    body: [
      "Nel 1859 Charles Darwin pubblica L’origine delle specie, proponendo una spiegazione scientifica dell’evoluzione degli organismi. All’interno delle popolazioni esistono variazioni ereditarie; gli individui con caratteristiche favorevoli in un certo ambiente tendono, in media, a sopravvivere e riprodursi con maggiore successo. Nel corso delle generazioni questo processo, chiamato selezione naturale, può trasformare le specie.",
      "L’evoluzionismo mette in discussione l’idea di una natura immutabile e influenza profondamente la cultura ottocentesca. Non significa però che sopravviva sempre il più forte: ciò che conta è l’adattamento a condizioni ambientali specifiche. Le teorie sociali che giustificano disuguaglianze e competizione usando in modo improprio concetti biologici sono generalmente indicate come darwinismo sociale e non coincidono con la teoria scientifica di Darwin.",
      "In letteratura cresce l’interesse per il rapporto tra individuo, ereditarietà e ambiente. Zola cercherà di rappresentare il comportamento umano come condizionato da questi fattori; Verga descriverà invece la lotta per la sopravvivenza sociale e il destino di chi viene travolto dai cambiamenti economici, senza trasformare i suoi romanzi in dimostrazioni biologiche.",
    ],

    image: evoluzionismo,
  },
  {
    chapter: "Francia",
    title: "Gustave Flaubert",
    subtitle: "Madame Bovary, 1857",
    body: [
      "Gustave Flaubert (1821-1880) è uno dei grandi protagonisti del Realismo francese e un importante precedente del Naturalismo. Cerca una scrittura precisa e controllata, nella quale il narratore non imponga continuamente i propri giudizi. Attraverso descrizioni minuziose e discorso indiretto libero, il lettore entra nei pensieri dei personaggi e ne coglie anche le illusioni.",
      "Madame Bovary, pubblicato in volume nel 1857, racconta la vita di Emma, sposata con Charles Bovary, medico di provincia affettuoso ma incapace di soddisfare le sue aspirazioni. Emma, influenzata dai romanzi sentimentali, sogna una vita raffinata e passionale. Dopo il ballo aristocratico alla Vaubyessard, la sua esistenza quotidiana le sembra ancora più monotona. Cerca allora la felicità nelle relazioni con Rodolphe e Léon e negli acquisti costosi.",
      "Gli amori non realizzano i suoi sogni, mentre i debiti diventano insostenibili. Disperata, Emma si avvelena con l’arsenico e muore; anche Charles, distrutto, morirà in seguito. Il romanzo critica il divario tra fantasia romantica e realtà borghese: da qui il termine bovarismo, cioè la tendenza a immaginarsi una vita diversa e a rifiutare quella reale.",
    ],
    points: ["Bovarismo: insoddisfazione e fuga nel sogno", "Processo per oltraggio alla morale (1857), assolto", "Discorso indiretto libero"],

    image: flaubert,
  },
  {
    chapter: "Francia",
    title: "La festa al castello",
    subtitle: "Il ballo alla Vaubyessard",
    body: [
      "L’episodio del ballo alla Vaubyessard, nella prima parte di Madame Bovary, rappresenta una svolta nella vita di Emma. Lei e Charles vengono invitati dal marchese d’Andervilliers in un ambiente aristocratico che Emma aveva conosciuto soltanto attraverso letture e fantasie. I saloni eleganti, il lusso della tavola, gli abiti e le conversazioni le sembrano finalmente il mondo al quale desidera appartenere.",
      "Durante la serata Emma danza anche con un visconte e sperimenta per poche ore un’esistenza completamente diversa dalla propria. Charles, invece, rimane impacciato e distante da quel mondo. Il contrasto tra i coniugi diventa così anche il contrasto tra il sogno di Emma e la vita modesta che conduce.",
      "Dopo la festa, il ricordo del castello continua a occupare la mente della protagonista: ciò che ha visto non la rende felice, ma accresce la sua insoddisfazione. Flaubert mostra come il desiderio di imitare un modello sociale idealizzato possa trasformarsi in una fonte di frustrazione. Il ballo anticipa quindi la ricerca di passioni, ricchezza e prestigio che condurrà Emma alla rovina.",
    ],
    quote: { text: "Il suo viaggio alla Vaubyessard aveva aperto un buco nella sua vita.", by: "Madame Bovary, I, 8" },

    image: festa,
  },
  {
    chapter: "Francia",
    title: "La letteratura come scienza",
    subtitle: "Il Naturalismo francese",
    body: [
      "Il Naturalismo nasce in Francia nella seconda metà dell’Ottocento, in un clima culturale influenzato dal Positivismo. Gli scrittori vogliono osservare la realtà senza idealizzarla, descrivendo anche povertà, malattie, sfruttamento e contraddizioni della società industriale. Il romanzo non deve raccontare soltanto personaggi eccezionali: anche la vita quotidiana delle classi popolari diventa materia letteraria.",
      "I fratelli Edmond e Jules de Goncourt contribuiscono a questa trasformazione, rivendicando l’attenzione per i ceti fino ad allora esclusi dalla narrativa più prestigiosa. Émile Zola sviluppa poi il progetto del romanzo sperimentale, esposto nel saggio del 1880: prendendo a modello il metodo del fisiologo Claude Bernard, immagina lo scrittore come un osservatore che studia l’effetto di ereditarietà e ambiente sui personaggi.",
      "La letteratura come scienza non significa che un romanzo sia davvero un esperimento di laboratorio. È piuttosto un ideale di documentazione, analisi delle cause e rappresentazione rigorosa dei comportamenti umani. Il Naturalismo conserva inoltre una forte attenzione sociale: rendere visibili i problemi della società può contribuire a comprenderli e discuterli.",
    ],

    image: letteratura_scienza,
  },
  {
    chapter: "Francia",
    title: "I principi del Naturalismo",
    body: [
      "Il primo principio naturalista è l’osservazione diretta: prima di scrivere, l’autore studia luoghi, mestieri, abitudini e linguaggio dei personaggi. La documentazione serve a rendere credibile l’ambiente narrato. Per questo i romanzi descrivono spesso fabbriche, quartieri popolari, miniere e condizioni di vita che la letteratura tradizionale tendeva a ignorare.",
      "Un secondo principio è il determinismo: i comportamenti vengono interpretati in relazione alle condizioni sociali, all’educazione, all’ambiente e, secondo le idee dell’epoca, all’ereditarietà. Il narratore tende a non intervenire con commenti morali espliciti, pur costruendo una rappresentazione capace di suscitare riflessione e denuncia.",
      "Il Naturalismo usa un linguaggio adatto ai personaggi e affronta temi considerati scomodi: alcolismo, prostituzione, malattie, disuguaglianze e sfruttamento del lavoro. Zola ritiene che mostrare le cause di questi fenomeni sia utile anche al progresso sociale. Il Verismo italiano riprenderà l’attenzione per il vero e l’impersonalità, ma con risultati e prospettive differenti.",
    ],
    points: [
      "Determinismo: ereditarietà e ambiente guidano i comportamenti",
      "Impersonalità e oggettività del narratore",
      "Documentazione accurata dei luoghi e dei mestieri",
      "Attenzione a operai, prostitute, alcolizzati, emarginati",
      "Fiducia che conoscere i mali sociali serva a correggerli",
    ],

    image: principi_naturalismo,
  },
  {
    chapter: "Francia",
    title: "Zola e i Rougon-Macquart",
    subtitle: "Storia naturale e sociale di una famiglia sotto il Secondo Impero",
    body: [
      "Émile Zola (1840-1902) è il principale teorico e narratore del Naturalismo francese. Nei suoi romanzi unisce documentazione accurata, analisi dei comportamenti e attenzione alle tensioni sociali. Nel saggio Il romanzo sperimentale sostiene che lo scrittore possa studiare i personaggi osservando come reagiscono in determinate condizioni ambientali e familiari.",
      "Il ciclo dei Rougon-Macquart comprende venti romanzi pubblicati tra il 1871 e il 1893. Il sottotitolo, Storia naturale e sociale di una famiglia sotto il Secondo Impero, ne riassume l’obiettivo: seguire i membri di una stessa famiglia in ambienti diversi, dalla politica alla finanza, dal commercio al lavoro operaio. Le vicende individuali diventano così un grande ritratto della Francia di Napoleone III.",
      "Fra i titoli più importanti troviamo L’Assommoir, dedicato alla miseria e all’alcolismo; Nanà, sul mondo della prostituzione e dell’alta società; La bestia umana, che intreccia violenza e modernità; e Germinale, ambientato nelle miniere. Zola fu anche un intellettuale impegnato: nel 1898 intervenne pubblicamente nell’affare Dreyfus con il celebre J’accuse…!",
    ],
    quote: { text: "J'accuse…!", by: "Zola in difesa di Dreyfus, 1898" },

    image: zola,
  },
  {
    chapter: "Francia",
    title: "Germinale",
    subtitle: "Émile Zola, 1885",
    body: [
      "Germinale (1885) è uno dei romanzi più importanti di Zola e appartiene al ciclo dei Rougon-Macquart. Il protagonista Étienne Lantier, rimasto senza lavoro, arriva nella regione mineraria del nord della Francia e trova impiego nella miniera di Le Voreux. Conosce la famiglia Maheu e scopre la fatica massacrante dei minatori, i salari insufficienti, i rischi degli incidenti e la povertà che colpisce anche donne e bambini.",
      "Étienne entra in contatto con le idee socialiste e contribuisce a organizzare uno sciopero contro le condizioni imposte dalla compagnia mineraria. La protesta si prolunga, la fame aumenta e il conflitto degenera in scontri violenti. La repressione e una successiva catastrofe in miniera mostrano quanto sia difficile cambiare un sistema fondato sullo sfruttamento.",
      "Il romanzo non è soltanto la storia di una sconfitta: Zola descrive anche la nascita di una coscienza collettiva. Il titolo richiama Germinale, mese primaverile del calendario rivoluzionario francese, simbolo di germinazione e rinascita. Nell’immagine finale dei semi che crescono sotto terra si intravede la speranza che nuove lotte possano trasformare la società.",
    ],

    image: germinale,
  },
  {
    chapter: "Italia",
    title: "Il Naturalismo italiano",
    subtitle: "Dalla Francia alla Sicilia",
    body: [
      "Le idee del Naturalismo francese raggiungono l’Italia soprattutto attraverso gli ambienti culturali ed editoriali di Milano. Negli anni Settanta e Ottanta dell’Ottocento, Luigi Capuana e Giovanni Verga elaborano una narrativa attenta alla realtà sociale e all’impersonalità del racconto. Il movimento italiano che ne deriva prende il nome di Verismo.",
      "La situazione italiana è diversa da quella francese: il paese è stato unificato da poco, presenta forti squilibri territoriali e una vasta popolazione agricola. Gli scrittori veristi si concentrano spesso sul Mezzogiorno, sulle comunità rurali, sui pescatori e sulle condizioni di chi vive in povertà. La questione meridionale diventa uno sfondo storico importante.",
      "Naturalismo e Verismo condividono l’interesse per i fatti, gli ambienti e le classi popolari. Tuttavia, mentre Zola attribuisce alla letteratura anche una funzione di denuncia e conserva una certa fiducia nel cambiamento, Verga rappresenta spesso una realtà dominata da necessità economiche e rapporti di forza, senza proporre facili soluzioni o interventi moralistici del narratore.",
    ],
    points: ["Teorico: Luigi Capuana", "Maestro: Giovanni Verga", "Continuatore: Federico De Roberto"],

    image: naturalismo_italiano,
  },
  {
    chapter: "Italia",
    title: "Luigi Capuana",
    subtitle: "Il teorico del Verismo",
    body: [
      "Luigi Capuana (1839-1915), nato a Mineo in Sicilia, è critico, narratore e uno dei principali teorici del Verismo. Conosce e discute la narrativa francese, ma ritiene che il romanzo italiano debba trovare una propria forma artistica, senza limitarsi a imitare Zola. Il suo contributo è fondamentale nel dibattito sull’impersonalità e sul rapporto tra osservazione e invenzione letteraria.",
      "Nel romanzo Giacinta (1879) racconta una donna segnata da un trauma dell’infanzia e dalle convenzioni sociali. L’opera rivela l’interesse per i conflitti psicologici e per il condizionamento dell’ambiente. In Il marchese di Roccaverdina (1901), invece, il protagonista è tormentato dal senso di colpa per un delitto e dal contrasto tra desiderio, prestigio sociale e coscienza.",
      "Capuana sostiene che l’autore debba costruire personaggi e situazioni così coerenti da far apparire l’opera autonoma, come se si fosse creata da sé. Con Verga condivide l’attenzione alla tecnica narrativa, ma conserva un interesse particolarmente forte per i problemi psicologici e per la riflessione teorica sul romanzo.",
    ],
    points: ["Giacinta (1879)", "Il marchese di Roccaverdina (1901)", "Studi sulla letteratura contemporanea"],

    image: capuana,
  },
  {
    chapter: "Italia",
    title: "De Roberto e gli Uzeda",
    subtitle: "I Viceré, 1894",
    body: [
      "Federico De Roberto (1861-1927) nasce a Napoli e cresce a Catania. Vicino agli ambienti veristi, concentra la propria narrativa sui meccanismi del potere, sugli interessi familiari e sull’ipocrisia delle classi dirigenti. Il suo romanzo più noto è I Viceré (1894), che racconta gli Uzeda di Francalanza, aristocratici siciliani di origine spagnola.",
      "Il cosiddetto ciclo degli Uzeda comprende L’Illusione (1891), I Viceré (1894) e L’Imperio, pubblicato postumo nel 1929. Nei Viceré, le vicende della famiglia attraversano il passaggio dal dominio borbonico all’Italia unita: matrimoni, eredità, rivalità e ambizioni mostrano personaggi pronti a modificare le proprie alleanze pur di conservare privilegi e influenza.",
      "Consalvo Uzeda rappresenta in modo emblematico questa capacità di adattamento: utilizza le nuove istituzioni politiche per proseguire il potere della propria famiglia. Il romanzo mette in discussione l’idea che l’Unità abbia automaticamente rinnovato la società. Il trasformismo politico e la continuità degli interessi diventano il centro di una critica severa alle élite.",
    ],

    image: de_roberto,
  },
  {
    chapter: "Verga",
    title: "Giovanni Verga",
    subtitle: "Il Verismo, 1840-1922",
    body: [
      "Giovanni Verga (1840-1922), nato a Catania, è il maggiore rappresentante del Verismo italiano. Dopo i primi romanzi patriottici, si trasferisce negli ambienti culturali di Firenze e Milano, dove scrive opere incentrate su amori tormentati e vita mondana. Alla fine degli anni Settanta matura una svolta: sceglie di raccontare il mondo popolare siciliano con una tecnica narrativa nuova.",
      "La poetica verista di Verga si fonda sull’impersonalità: il narratore non deve giudicare dall’alto, ma lasciare che vicende e personaggi sembrino parlare da soli. Attraverso la regressione assume il punto di vista della comunità rappresentata; con il discorso indiretto libero può far emergere pensieri e parole dei personaggi senza introdurli sempre esplicitamente.",
      "Al centro della sua visione si trova una concezione pessimistica della lotta per la vita. L’ideale dell’ostrica esprime il legame degli umili con famiglia, casa e tradizioni: chi si stacca dal proprio ambiente rischia di essere travolto. Nel Ciclo dei vinti Verga vuole mostrare gli effetti dell’ambizione e del progresso a diversi livelli sociali; porterà a termine soltanto I Malavoglia e Mastro-don Gesualdo.",
    ],

    image: verga,
  },
  {
    chapter: "Verga",
    title: "Nedda",
    subtitle: "Bozzetto siciliano, 1874",
    body: [
      "Nedda (1874), definita dall’autore un bozzetto siciliano, racconta la storia di una giovane raccoglitrice di olive costretta a lavorare duramente per sopravvivere. Nedda vive nella miseria, assiste alla malattia e alla morte della madre e si innamora di Janu, un bracciante povero e malato. La loro relazione si svolge in un ambiente nel quale la povertà lascia pochissimo spazio alla felicità.",
      "Janu muore dopo una caduta mentre lavora, lasciando Nedda incinta. La ragazza affronta il giudizio della comunità e partorisce una bambina che, debole e denutrita, muore poco dopo. La vicenda mette in evidenza la vulnerabilità delle donne povere, l’assenza di protezione sociale e il peso delle convenzioni morali.",
      "Nedda anticipa i temi del Verismo perché porta in primo piano la Sicilia rurale, la fatica e la sofferenza degli umili. Non è però ancora un’opera pienamente verista: il narratore interviene con partecipazione sentimentale e commenti compassionevoli, mentre nelle novelle successive Verga cercherà di nascondere maggiormente la propria voce.",
    ],

    image: nedda,
  },
  {
    chapter: "Verga",
    title: "Storia di una capinera",
    subtitle: "Romanzo epistolare, 1871",
    body: [
      "Storia di una capinera, pubblicato in volume nel 1871, è un romanzo epistolare che racconta la vicenda di Maria, una giovane educata in convento e destinata alla vita religiosa. Durante un’epidemia di colera, Maria trascorre un periodo fuori dal monastero e scopre la libertà della vita familiare, la natura e soprattutto l’amore per Nino.",
      "La ragazza comprende di non avere una vera vocazione religiosa, ma le pressioni familiari e le convenzioni sociali le impediscono di scegliere liberamente. Nino finirà per sposare la sorellastra Giuditta, mentre Maria è costretta a tornare in convento e a prendere i voti. La sofferenza la conduce progressivamente alla perdita dell’equilibrio mentale e alla morte.",
      "La capinera del titolo è un uccello chiuso in gabbia: rappresenta Maria, privata della possibilità di vivere secondo i propri sentimenti. Il romanzo appartiene alla fase precedente al Verismo e conserva una forte componente romantica e patetica, ma rivela già l’interesse di Verga per i destini segnati dalle costrizioni sociali.",
    ],

    image: capinera,
  },
  {
    chapter: "Verga",
    title: "Eva, Tigre reale, Eros",
    subtitle: "I romanzi mondani, 1873-1875",
    body: [
      "Eva (1873) racconta la relazione tra Enrico Lanti, giovane pittore siciliano, e la ballerina Eva. L’amore inizialmente appare come un ideale capace di dare senso all’arte e alla vita, ma viene progressivamente corroso da gelosia, difficoltà economiche e incompatibilità tra sogno e realtà. Il romanzo riflette anche sulla condizione dell’artista in una società dominata dal denaro.",
      "Tigre reale (1875) mette al centro Giorgio La Ferlita e la contessa russa Nata, donna affascinante e malata di tubercolosi. La loro passione è intensa ma distruttiva: desiderio, gelosia e inquietudine minacciano gli affetti e l’equilibrio del protagonista. Il titolo richiama l’immagine di una femminilità seducente e pericolosa, tipica di una certa narrativa mondana ottocentesca.",
      "Eros (1875) segue la vita del marchese Alberto Alberti, incapace di costruire rapporti affettivi stabili e consumato da passioni, egoismo e insoddisfazione. La sua vicenda si conclude tragicamente con il suicidio. Questi tre romanzi appartengono alla fase preverista di Verga: descrivono soprattutto ambienti borghesi e aristocratici, ma già mostrano personaggi sconfitti dalle proprie aspirazioni.",
    ],
    points: [
      "Eva (1873): il pittore Enrico Lanti e la ballerina Eva; la prefazione accusa una società che vive di «banche e imprese industriali»",
      "Tigre reale (1875): la passione distruttiva per Nata, contessa russa malata di tisi",
      "Eros (1875): Alberto Alberti, consumato dai piaceri, sceglie il suicidio",
    ],

    image: romanzi_mondani,
  },
  {
    chapter: "Verga",
    title: "Lettera a Salvatore Farina",
    subtitle: "Prefazione a L'amante di Gramigna, 1880",
    body: [
      "La lettera a Salvatore Farina, posta come prefazione alla novella L’amante di Gramigna nella raccolta Vita dei campi (1880), è uno dei testi fondamentali per comprendere la poetica di Verga. Lo scrittore presenta la vicenda come un documento umano, cioè una storia ricavata dall’osservazione della vita e delle passioni, che deve conservare l’immediatezza del fatto narrato.",
      "Verga sostiene che la mano dell’artista debba rimanere invisibile: il lettore non deve avvertire un narratore che spiega, giudica o dirige apertamente i personaggi. L’opera deve dare l’impressione di essersi fatta da sé, come se i fatti si svolgessero spontaneamente davanti a chi legge.",
      "Questo principio non significa assenza di lavoro artistico. Al contrario, richiede una costruzione attentissima della lingua, del punto di vista e delle scene. Nelle novelle e nei romanzi veristi Verga applica l’impersonalità attraverso una voce narrativa vicina alla mentalità della comunità rappresentata, anche quando tale mentalità contiene pregiudizi o ingiustizie.",
    ],
    quote: { text: "Il romanzo avrà l'impronta dell'avvenimento reale, e l'opera d'arte sembrerà essersi fatta da sé.", by: "Giovanni Verga" },

    image: lettera,
  },
  {
    chapter: "Verga",
    title: "Rosso Malpelo",
    subtitle: "Vita dei campi, 1878-1880",
    body: [
      "Rosso Malpelo, pubblicata nel 1878 e poi raccolta in Vita dei campi (1880), racconta la vita di un ragazzo che lavora in una cava di rena. Il soprannome nasce dai suoi capelli rossi, considerati dalla superstizione popolare il segno di un carattere malvagio. Malpelo è maltrattato da tutti, e persino la famiglia lo guarda con diffidenza: finisce così per assumere la durezza che gli altri gli attribuiscono.",
      "L’unica persona a mostrargli affetto è il padre, chiamato mastro Misciu Bestia, che muore sepolto da un crollo nella cava. Malpelo resta segnato dalla perdita e sviluppa una visione crudele della vita, secondo cui i deboli vengono inevitabilmente schiacciati. Si lega a Ranocchio, un ragazzo fragile e zoppo, che tratta talvolta duramente ma al quale cerca anche di insegnare a difendersi. Quando Ranocchio muore, Malpelo rimane ancora più isolato.",
      "Alla fine viene mandato a esplorare una galleria pericolosa e scompare senza fare ritorno. La tecnica narrativa è decisiva: il narratore riproduce i pregiudizi della comunità invece di correggerli apertamente. Il lettore capisce così, per contrasto, quanto sia ingiusto il giudizio su Malpelo. Questo effetto è chiamato straniamento ed è legato alla regressione del narratore.",
    ],
    quote: { text: "Malpelo si chiamava così perché aveva i capelli rossi; ed aveva i capelli rossi perché era un ragazzo malizioso e cattivo.", by: "Incipit" },

    image: rosso_malpelo,
  },
  {
    chapter: "Verga",
    title: "I Malavoglia",
    subtitle: "1881, primo romanzo del Ciclo dei vinti",
    body: [
      "I Malavoglia (1881), primo romanzo del Ciclo dei vinti, è ambientato ad Aci Trezza, villaggio di pescatori siciliani. La famiglia Toscano, soprannominata Malavoglia, vive del lavoro sulla barca Provvidenza e della casa del nespolo. Per migliorare la propria condizione, padron ’Ntoni compra a credito un carico di lupini da rivendere, ma durante il trasporto la barca naufraga e suo figlio Bastianazzo muore. Il debito dà inizio a una serie di disgrazie.",
      "La famiglia perde progressivamente sicurezza economica e prestigio. Luca muore nella battaglia di Lissa; Maruzza muore di colera; Lia si allontana dal paese, mentre il giovane ’Ntoni, insoddisfatto della povertà e attratto da una vita diversa, entra nel contrabbando e finisce in carcere. Mena rinuncia al matrimonio con Alfio Mosca. Le vicende private si intrecciano con i cambiamenti dell’Italia dopo l’Unità e con le difficoltà dei ceti popolari.",
      "Alessi, rimasto fedele al lavoro e alla famiglia, riesce infine a riscattare la casa del nespolo. Quando il giovane ’Ntoni torna, comprende di non potersi più reinserire e riparte. Il romanzo oppone l’attaccamento alle radici al desiderio di miglioramento sociale. L’ideale dell’ostrica esprime la protezione offerta dalla comunità, mentre la fiumana del progresso travolge chi tenta di cambiare posizione. Verga usa un narratore corale, proverbi e una lingua che riproduce la mentalità del paese.",
    ],

    image: malavoglia,
  },
  {
    chapter: "Verga",
    title: "Mastro-don Gesualdo",
    subtitle: "1889, secondo romanzo del Ciclo dei vinti",
    body: [
      "Mastro-don Gesualdo (1889), secondo romanzo del Ciclo dei vinti, racconta l’ascesa e la sconfitta di Gesualdo Motta, un uomo di umili origini che, grazie a lavoro ostinato e abilità negli affari, accumula terre e ricchezze. Il titolo unisce mastro, appellativo legato alla sua origine artigiana, e don, segno di prestigio sociale: Gesualdo rimane sospeso tra due mondi e non viene davvero accettato da nessuno.",
      "Per elevarsi socialmente sposa Bianca Trao, appartenente a una famiglia nobile ma decaduta, rinunciando alla relazione affettiva con Diodata. Il matrimonio non gli procura la felicità desiderata. Bianca rimane distante, mentre Isabella, che Gesualdo cresce come figlia, lo considera con freddezza e sposa il duca di Leyra, contribuendo a dissipare il patrimonio. Gesualdo sacrifica i sentimenti all’accumulo della roba, convinto che il possesso economico possa garantirgli sicurezza e rispetto.",
      "Colpito da una grave malattia, viene accolto nel palazzo palermitano della figlia, dove muore solo e quasi ignorato dalla servitù. A differenza dei Malavoglia, che cercano soprattutto di conservare il proprio mondo, Gesualdo tenta di salire nella gerarchia sociale. Anche lui, però, è un vinto: conquista la ricchezza ma perde affetti, appartenenza e serenità. Il romanzo mostra che il successo materiale non coincide con una vera realizzazione umana.",
    ],

    image: gesualdo,
  },
  {
   chapter: "Fine",
   title: "Zola e Verga",
   subtitle: "Due visioni differenti del progresso",
    body: [
      "Dalla fiducia positivista nella scienza alla rappresentazione verista delle sconfitte sociali: il percorso dell’Ottocento mostra come la letteratura possa interrogare il progresso, non soltanto celebrarlo.",
      "Zola osserva le ingiustizie con l’ambizione di comprenderne le cause; Verga mette in scena le conseguenze della lotta per la vita su pescatori, contadini e uomini che cercano di cambiare posizione. Nei suoi romanzi, i vinti non sono necessariamente i più deboli: sono coloro che pagano il prezzo delle proprie aspirazioni in una società dominata da interessi e rapporti di forza.",
    ],
    cover: true,

    image: fine,
  },
];
