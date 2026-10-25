import positivismo from "@/assets/positivismo.jpg";
import bovary from "@/assets/bovary.jpg";
import germinale from "@/assets/germinale.jpg";
import malavoglia from "@/assets/malavoglia.jpg";

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
    image: positivismo,
    cover: true,
  },
  {
    chapter: "Il contesto",
    title: "Il Positivismo",
    subtitle: "La fede nei fatti",
    body: [
      "Nato in Francia con Auguste Comte (Corso di filosofia positiva, 1830-42), il Positivismo afferma che l'unica conoscenza valida è quella fondata sull'osservazione dei fatti e sul metodo sperimentale.",
      "È la filosofia della seconda rivoluzione industriale: ferrovie, elettricità, medicina e nuove scienze sociali alimentano la fiducia in un progresso continuo dell'umanità.",
    ],
    points: ["Legge dei tre stadi: teologico, metafisico, positivo", "Nascita della sociologia", "Hippolyte Taine: razza, ambiente, momento storico"],
    image: positivismo,
  },
  {
    chapter: "Il contesto",
    title: "L'Evoluzionismo",
    subtitle: "Darwin e la lotta per l'esistenza",
    body: [
      "Con L'origine delle specie (1859) Charles Darwin spiega l'evoluzione dei viventi attraverso la selezione naturale: sopravvivono gli individui più adatti all'ambiente.",
      "Herbert Spencer estende il principio alla società (darwinismo sociale). Per gli scrittori l'uomo diventa un prodotto dell'ereditarietà e dell'ambiente: un'idea decisiva per Zola e per i «vinti» di Verga.",
    ],
    quote: { text: "Non è la specie più forte a sopravvivere, ma quella che si adatta meglio al cambiamento.", by: "Sintesi del pensiero darwiniano" },
  },
  {
    chapter: "Francia",
    title: "Gustave Flaubert",
    subtitle: "Madame Bovary, 1856",
    body: [
      "Precursore del Naturalismo, Flaubert teorizza l'impersonalità: l'autore deve essere nell'opera «come Dio nell'universo, presente ovunque e visibile in nessun luogo».",
      "Emma, moglie del mediocre medico di provincia Charles Bovary, nutrita di romanzi sentimentali, cerca invano nella realtà le passioni lette nei libri. Adulteri, debiti e disillusione la portano al suicidio con l'arsenico.",
    ],
    points: ["Bovarismo: insoddisfazione e fuga nel sogno", "Processo per oltraggio alla morale (1857), assolto", "Discorso indiretto libero"],
    image: bovary,
  },
  {
    chapter: "Francia",
    title: "La festa al castello",
    subtitle: "Il ballo alla Vaubyessard",
    body: [
      "Emma e Charles sono invitati al ballo del marchese d'Andervilliers. Per una notte Emma entra nel mondo aristocratico sognato: lampadari, abiti di seta, il valzer con un visconte.",
      "Il ritorno alla vita di Tostes rende la monotonia insopportabile. Emma conserva un portasigari trovato per strada come reliquia di quel sogno: è il momento in cui nasce la sua insoddisfazione.",
    ],
    quote: { text: "Il suo viaggio alla Vaubyessard aveva aperto un buco nella sua vita.", by: "Madame Bovary, I, 8" },
    image: bovary,
  },
  {
    chapter: "Francia",
    title: "La letteratura come scienza",
    subtitle: "Il Naturalismo francese",
    body: [
      "Negli anni Settanta dell'Ottocento il Naturalismo applica al romanzo il metodo delle scienze. I fratelli Goncourt, con la prefazione a Germinie Lacerteux (1865), rivendicano il diritto del popolo a entrare nel romanzo.",
      "Zola, nel Romanzo sperimentale (1880), si ispira al medico Claude Bernard: lo scrittore osserva i personaggi come uno scienziato e ne «sperimenta» le reazioni dentro un ambiente dato.",
    ],
  },
  {
    chapter: "Francia",
    title: "I principi del Naturalismo",
    body: ["Il romanzo diventa documento: studio clinico della società, specialmente dei ceti più umili."],
    points: [
      "Determinismo: ereditarietà e ambiente guidano i comportamenti",
      "Impersonalità e oggettività del narratore",
      "Documentazione accurata dei luoghi e dei mestieri",
      "Attenzione a operai, prostitute, alcolizzati, emarginati",
      "Fiducia che conoscere i mali sociali serva a correggerli",
    ],
  },
  {
    chapter: "Francia",
    title: "Zola e i Rougon-Macquart",
    subtitle: "Storia naturale e sociale di una famiglia sotto il Secondo Impero",
    body: [
      "Émile Zola (1840-1902) scrive tra il 1871 e il 1893 un ciclo di venti romanzi che segue cinque generazioni di una famiglia segnata da una tara ereditaria.",
      "I Rougon, ramo legittimo, salgono al potere; i Macquart, ramo illegittimo, scivolano nella miseria e nell'alcol. Tra i titoli: L'Assommoir, Nanà, Il ventre di Parigi, La bestia umana.",
    ],
    quote: { text: "J'accuse…!", by: "Zola in difesa di Dreyfus, 1898" },
  },
  {
    chapter: "Francia",
    title: "Germinale",
    subtitle: "Émile Zola, 1885",
    body: [
      "Étienne Lantier arriva nel bacino minerario di Montsou, nel nord della Francia, e scende in miniera. Scopre fame, sfruttamento e fatica disumana delle famiglie operaie come i Maheu.",
      "Guida uno sciopero che finisce nel sangue. Il titolo richiama il mese della semina del calendario rivoluzionario: dalla sconfitta germoglia la coscienza di una futura riscossa.",
    ],
    image: germinale,
  },
  {
    chapter: "Italia",
    title: "Il Naturalismo italiano",
    subtitle: "Dalla Francia alla Sicilia",
    body: [
      "Le idee di Zola arrivano in Italia attraverso Milano, capitale editoriale. Qui, intorno al 1878-1880, prende forma il Verismo, con un nucleo di autori siciliani.",
      "Rispetto al modello francese cambia lo sguardo: non le metropoli industriali ma il Sud agrario e arretrato; non la fiducia nel progresso, ma spesso un pessimismo senza riscatto.",
    ],
    points: ["Teorico: Luigi Capuana", "Maestro: Giovanni Verga", "Continuatore: Federico De Roberto"],
  },
  {
    chapter: "Italia",
    title: "Luigi Capuana",
    subtitle: "Il teorico del Verismo",
    body: [
      "Nato a Mineo (1839-1915), critico e romanziere, Capuana diffonde in Italia le teorie di Zola e ne fa la base del nuovo romanzo italiano.",
      "Il suo romanzo Giacinta (1879), dedicato a Zola, studia il caso clinico di una donna segnata da un trauma giovanile. Capuana insiste soprattutto sull'impersonalità: l'opera deve sembrare «essersi fatta da sé».",
    ],
    points: ["Giacinta (1879)", "Il marchese di Roccaverdina (1901)", "Studi sulla letteratura contemporanea"],
  },
  {
    chapter: "Italia",
    title: "De Roberto e gli Uzeda",
    subtitle: "I Viceré, 1894",
    body: [
      "Federico De Roberto (1861-1927), napoletano di nascita e catanese d'adozione, racconta la decadenza di una famiglia nobile di origine spagnola, gli Uzeda di Francalanza, tra Risorgimento e Unità.",
      "Il ciclo (L'Illusione, I Viceré, L'Imperio) mostra un'aristocrazia che sopravvive adattandosi: cambia tutto perché nulla cambi. Consalvo Uzeda diventa deputato del nuovo Stato.",
    ],
    quote: { text: "Ora che l'Italia è fatta, dobbiamo fare gli affari nostri.", by: "I Viceré" },
  },
  {
    chapter: "Verga",
    title: "Giovanni Verga",
    subtitle: "Il Verismo, 1840-1922",
    body: [
      "Catanese, Verga esordisce con romanzi patriottici e poi mondani a Firenze e Milano. Verso il 1878 avviene la «conversione» al Verismo: racconta la Sicilia dei pescatori, dei contadini, dei carusi.",
      "Le sue tecniche: impersonalità, regressione del narratore nel punto di vista popolare, discorso indiretto libero, «ideale dell'ostrica», e il progetto del Ciclo dei vinti.",
    ],
  },
  {
    chapter: "Verga",
    title: "Nedda",
    subtitle: "Bozzetto siciliano, 1874",
    body: [
      "Nedda è una povera raccoglitrice di olive dell'Etna. Ama Janu, contadino malato di malaria che muore cadendo da un albero; la loro bambina muore di stenti.",
      "Pur con un narratore ancora partecipe e commosso, il racconto anticipa i temi del Verismo: la miseria, il lavoro, la fatalità che schiaccia gli umili.",
    ],
  },
  {
    chapter: "Verga",
    title: "Storia di una capinera",
    subtitle: "Romanzo epistolare, 1871",
    body: [
      "Maria, educata in convento perché la matrice non vuole mantenerla, trascorre un periodo in campagna durante il colera e si innamora di Nino. Costretta a prendere i voti, impazzisce e muore.",
      "Il romanzo, scritto in forma di lettere all'amica Marianna, denuncia la monacazione forzata. La capinera chiusa in gabbia è il simbolo della sua prigionia.",
    ],
  },
  {
    chapter: "Verga",
    title: "Eva, Tigre reale, Eros",
    subtitle: "I romanzi mondani, 1873-1875",
    body: [
      "Nel periodo fiorentino e milanese Verga racconta la buona società, le passioni e gli artisti.",
    ],
    points: [
      "Eva (1873): il pittore Enrico Lanti e la ballerina Eva; la prefazione accusa una società che vive di «banche e imprese industriali»",
      "Tigre reale (1875): la passione distruttiva per Nata, contessa russa malata di tisi",
      "Eros (1875): Alberto Alberti, consumato dai piaceri, sceglie il suicidio",
    ],
  },
  {
    chapter: "Verga",
    title: "Lettera a Salvatore Farina",
    subtitle: "Prefazione a L'amante di Gramigna, 1880",
    body: [
      "È il manifesto del Verismo verghiano. Verga presenta il racconto come «un documento umano» e teorizza l'eclissi dell'autore.",
      "L'opera dovrà sembrare «essersi fatta da sé», con la «mano dell'artista» rimasta assolutamente invisibile.",
    ],
    quote: { text: "Il romanzo avrà l'impronta dell'avvenimento reale, e l'opera d'arte sembrerà essersi fatta da sé.", by: "Giovanni Verga" },
  },
  {
    chapter: "Verga",
    title: "Rosso Malpelo",
    subtitle: "Vita dei campi, 1878-1880",
    body: [
      "Malpelo, un ragazzo con i capelli rossi, lavora in una cava di rena. Tutti lo considerano cattivo per il colore dei capelli; dopo la morte del padre, sepolto da un crollo, diventa duro e violento.",
      "Protegge a modo suo Ranocchio, ragazzo zoppo e malato. Alla fine si perde nelle gallerie e non torna più. Il narratore popolare adotta i pregiudizi del paese: è la regressione verghiana.",
    ],
    quote: { text: "Malpelo si chiamava così perché aveva i capelli rossi; ed aveva i capelli rossi perché era un ragazzo malizioso e cattivo.", by: "Incipit" },
  },
  {
    chapter: "Verga",
    title: "I Malavoglia",
    subtitle: "1881, primo romanzo del Ciclo dei vinti",
    body: [
      "Ad Aci Trezza la famiglia Toscano, detta Malavoglia, vive della barca Provvidenza. Padron 'Ntoni tenta un commercio di lupini: la barca naufraga, Bastianazzo muore, inizia la rovina.",
      "Il giovane 'Ntoni rifiuta i valori antichi e finisce in carcere; Alessi riscatta la casa del nespolo. Chi tenta di lasciare il proprio mondo viene travolto: è l'«ideale dell'ostrica».",
    ],
    image: malavoglia,
  },
  {
    chapter: "Verga",
    title: "Mastro-don Gesualdo",
    subtitle: "1889, secondo romanzo del Ciclo dei vinti",
    body: [
      "Gesualdo Motta, muratore arricchito, accumula «la roba» con fatica feroce e sposa la nobile decaduta Bianca Trao per salire di rango. Il titolo stesso unisce «mastro» e «don»: non appartiene a nessun mondo.",
      "Disprezzato dai nobili e invidiato dai poveri, tradito dagli affetti, muore solo nel palazzo palermitano della figlia Isabella, tra servi indifferenti.",
    ],
    quote: { text: "Roba mia, vientene con me!", by: "Mazzarò, La roba (Novelle rusticane)" },
  },
  {
    chapter: "Fine",
    title: "I vinti",
    subtitle: "Dalla fiducia nel progresso al pessimismo",
    body: ["Il Positivismo aveva promesso il progresso; Verga mostra chi ne resta travolto. «La fiumana del progresso» trascina tutti, e lascia sulla riva i deboli."],
    image: malavoglia,
    cover: true,
  },
];
