---
title: App Companion di Fortigames
description: Come abbiamo creato un'app in meno di 5 giorni con Qwik, Supabase e Vercel
date: "2023-11-20"
tags: ["app", "typescript", "qwik", "supabase", "vercel"]
---

# App Companion di Fortigames

## Come abbiamo creato un'app in meno di 5 giorni con Qwik, Supabase e Vercel

Il 29 settembre è stato il giorno della **convention di Fortitude Group**.
È stata una giornata memorabile e non riesco nemmeno a descrivere la gioia che ho provato nel passare finalmente del tempo insieme a tutti i colleghi sparsi in tutta Italia (che di solito vedo solo attraverso un monitor).

Ma facciamo un passo indietro, precisamente a due settimane prima, quando arriva la mail HR con l'agenda ufficiale della convention.

## Giovedì 14 settembre

La voglia di vederci e fare qualcosa insieme è sempre altissima e, guardando il programma, ci accorgiamo che c'era uno **slot di 3 ore di "tempo libero"** con un asterisco: _"Possibilità di usare piscine e campi da volley, calcetto e ping pong"_.
Nel giro di pochi minuti dalla mail ricevo un messaggio da _Luigi_ che propone di organizzare squadre e partite per i vari sport.

Il giorno dopo la situazione era già sfuggita di mano e insieme a _Gabri_ decidiamo di organizzare qualcosa di più strutturato:

> **i Fortigames**! Una sfida di due ore tra due squadre che si affrontano contemporaneamente a calcio, volley e ping pong.

Per rendere l'evento più interessante, decidiamo di dare un nome alle squadre.
Dopo un po' di brainstorming scegliamo il simbolo di **Yin e Yang** per via delle classiche _magliette bianche e nere_.
Con un pizzico di creatività in più, diventano _**Tigers (Yin)**_ contro _**Dragons (Yang)**_!

> Più info su [Yin and Yang / Tigers and Dragons](https://new.artsmia.org/programs/teachers-and-students/teaching-the-arts/artwork-in-focus/japanese-tiger-and-dragon)

## Martedì 19 settembre

Creiamo un form su **Google Forms** per raccogliere i dati dei partecipanti e, nello stesso momento, chiediamo al team HR la lista completa dei partecipanti alla convention con azienda e email.

![Google Forms](/static/images/articles/fortigames-companion-app/1-google-form.png)

A questo punto potresti chiederti: _"ma il blog di Daniel non è di solito pieno di articoli tecnici?"_
Hai ragione!
Infatti, dopo questo preambolo, ti porto a una settimana dall'evento, precisamente a venerdì 22 settembre.

## Venerdì 22 settembre

Dal nulla, _Gabri_ propone di sviluppare un'app **"companion" per la convention**, focalizzata sui _Fortigames_ e utile per gestire risultati, indicazioni su dove andare, cosa fare, ecc.

All'inizio pensiamo sia uno scherzo: **_fare un'app da zero in meno di una settimana, soprattutto nel tempo libero, è impensabile_**.
Poi si unisce anche _Stefano_, che propone di usare tecnologie mai provate prima, e lì non ho saputo resistere.

Decidiamo quindi di sviluppare una PWA con queste tecnologie:

- **Balsamiq**: per i _wireframe_
- **Figma**: per la _UI_
- **Qwik**: framework principale
- **Font Awesome**: per le _icone_
- Struttura **SCSS** copiata/incollata da danielzotti.it con **CSS modules**
- **Supabase**: _database realtime_ con _autenticazione Google_ (dato che ogni dipendente Fortitude ha il proprio account corporate Google)
- **GitHub**: per salvare il _codice open source_
- **Vercel**: per il _deployment_

### Creazione progetto

Il venerdì sera inizio già a creare il progetto su _**[Supabase](https://supabase.com)**_ e a installare _**[Qwik](https://qwik.builder.io/)**_ con plugin per _Supabase_.

```shell
npm create qwik@latest

npm install @supabase/supabase-js supabase-auth-helpers-qwik
```

> [Integrazioni _Supabase_ per _Qwik_](https://qwik.builder.io/docs/integrations/supabase)

### Setup autenticazione Google

Attiviamo l'autenticazione _Google_ dal progetto _Fortigames_ nella [_dashboard Supabase_](https://supabase.com/dashboard)

![Supabase - Google OAuth Provider](/static/images/articles/fortigames-companion-app/2-supabase-google-oauth-provider.png)

impostiamo la return url del provider

![Supabase return url](/static/images/articles/fortigames-companion-app/3-supabase-return-url.png)

e creiamo la web app su [_Google Cloud_](https://console.cloud.google.com/apis/dashboard) (con la return URL corretta)

![_Google Cloud_](/static/images/articles/fortigames-companion-app/4-google-cloud.png)

Per loggare l'utente, basta creare un bottone che al click chiama la funzione `createClient` di _Supabase_ impostando:

- `Google` come provider
- inserendo come parametri:
- URL del progetto
- chiave trovata su Supabase

Al resto pensa _Supabase_ (in pratica legge il token dalla URL e lo salva in localStorage).

```typescript jsx
// /src/components/auth/login/login.tsx

export const Login = component$(() => {
  const location = useLocation();

  const handleGoogleLogin = $(async () => {
    createClient<Database>(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY || ''
    ).auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: location.url.origin + config.urls.auth
        }
      });
  });

  return <Button onClick$={handleGoogleLogin}> Login with Google </Button>;
});
```

## Sabato 23 settembre

Ci diamo appuntamento alle 9:00 per buttare giù idee e parlare di grafica e funzionalità.

### Il team

- **Stefano**: Head of UX/UI Engineering
- **Gabriella**: Team Leader UX/UI
- **Daniel**: Team Leader Frontend

### Funzionalità app

- **Dashboard page**: risultati realtime, agenda, countdown inizio/fine giochi e mappa location (+ coppa del vincitore alla fine)
- **Teams page**: lista membri + filtri per team e sport
- **Games page**: risultati dei 3 sport + sezione per arbitri/facilitatori/admin per punteggio e start/stop partite
- **Boardgames page**: per chi non vuole fare sport, lista giochi da tavolo con info aggiuntive
- **Info page**: regole, agenda, location, ecc.
- **Profile page**: icona personalizzata in base al team e link alle chat dedicate su Slack
- **Admin section**: gestione iscritti convention e partecipanti Fortigames

### Wireframe

Il primissimo wireframe dell'app:

![First wireframe](/static/images/articles/fortigames-companion-app/5-first-wireframe.jpg)

### Database

Dopo aver ragionato sulle feature, partiamo dalla creazione DB direttamente su _Supabase_.
Avendo poco tempo, semplifichiamo un po' la struttura per accelerare il lavoro.

![Supabase - DB schema](/static/images/articles/fortigames-companion-app/6-supabase-db-schema.png)

#### Users

Lista utenti che possono accedere all'app.

- Dati personali (nome, cognome, azienda)
- Info sui ruoli (admin, facilitator, referee)
- Info sui giochi (team di appartenenza, partecipazione)
- **Email**: usata per associare i dati persona all'utente autenticato via Google

#### Agenda

Informazioni sull'agenda della giornata.
Ogni riga corrisponde a un'attività con ora di inizio e fine.

#### Games Results

Informazioni sui risultati delle partite.
Ogni riga corrisponde al risultato di uno sport specifico (`soccer`, `volleyball`, `table_tennis`).

#### Config

Informazioni sullo stato dei giochi: _start/end pianificato_, _start/end reale_, flag per _partita in pausa_ (es. meteo o problemi organizzativi), e ovviamente nome del _vincitore_.

#### Layout

Non abbiamo pensato a una versione desktop (o totalmente responsive) per accelerare.
Dal classico approccio _"mobile first"_ siamo passati a qualcosa che definirei _"mobile only"_ 😀
(in pratica abbiamo messo una `max-width` e gestito la responsive solo per smartphone/tablet, senza rivedere tutta la struttura pagina).

Così appariva la prima versione funzionante:

![First Layout](/static/images/articles/fortigames-companion-app/7-first-layout.png)

#### Struttura file SCSS

Per velocizzare, abbiamo riusato i file SCSS del [sito danielzotti.it](https://www.danielzotti.it).

Per questi motivi:

- Nessun framework UI
- Struttura **modulare**
- Include già stili di **reset**
- Funziona con **CSS variables**
- Supporta **tema chiaro/scuro**
- Contiene già alcuni **stili base**

La struttura è questa, con un ruolo specifico per ogni file:

- **base**: stili dei tag html base (`h1`,..., `h6`, `p`, `a`, `ul`, `code`)
- **common**: stili comuni non legati ai tag base (es. `.table-container` per overflow tabelle)
- **fonts**: `@import` dei font usati
- **layout**: stili responsive in stile _Bootstrap_: container, breakpoint, ecc.
- **reset**: reset stili base
- **theme**: variabili tema dark/light
- **variables-css**: variabili generali indipendenti dal tema: `spacing`, `html-max-width`, ...
- **variables-scss**: variabili SCSS (purtroppo `@media()` non supporta ancora variabili css)
- **components** (folder): stili componenti riusabili (button, icone, ...)
- **mixins** (folder): mixin riusabili nell'app

> [Struttura SCSS del sito di Daniel](https://github.com/danielzotti/new.danielzotti.it/tree/github/src/scss)

Verso le 15:00 arriviamo al punto in cui:

- la struttura layout è pronta e supporta dark/light theme
- riusciamo ad autenticarci via Google
- abbiamo importato via CSV i dati dei partecipanti (direttamente su Supabase)
- riusciamo a leggere i dati dalla tabella users
- usiamo comodamente le icone con FontAwesome

## Lunedì 25 settembre

### Supabase CLI

La developer experience di _Supabase_ è davvero ottima.
Oltre alla documentazione ben fatta e all'SDK utile, c'è anche una _cli_ che semplifica molto la vita.

Per usarla basta installarla:

```shell
npm i supabase --save-dev
```

genera un personal access token:

> [Personal Access Token](https://supabase.com/dashboard/account/tokens)

ed esegui il login:

```shell
supabase login
```

> [Login _Supabase_](https://supabase.com/docs/reference/cli/supabase-login)

### Supabase e TypeScript

Per chi, come me, ama TypeScript, la _cli_ permette di _generare automaticamente i tipi DB_:

```shell
supabase gen types typescript --project-id {project_id} > src/types/database.types.ts
```

> [Generare i tipi _Supabase_](https://supabase.com/docs/reference/cli/supabase-gen-keys)

### Filtro utenti

_Supabase_ permette di _gestire policy direttamente nel DB_, ma il tempo stringe e non c'è un metodo pronto per filtrare utenti autenticati per dominio.
Quindi scegliamo la via semplice: _filtro client-side_, controllando solo che l'utente esista nella tabella `users`.

### Sessione di autenticazione

_Supabase_ gestisce facilmente il login Google, ma _mantenere la sessione è responsabilità dello sviluppatore_.

Infatti, **leggere ogni volta i dati utente da `localStorage` dà pessime performance** e inoltre non era chiaro quando il JWT venisse effettivamente scritto e disponibile.
All'inizio usavamo il classico `setTimeout` da `500ms`, ma ovviamente era ancora _meno performante_ perché dovevamo aspettare ogni volta.

Quindi decidiamo di gestire manualmente il salvataggio sessione in `localStorage`.

Il flusso:

- L'utente clicca `Login`
- Viene mandato alla classica pagina Google Login
- Dopo login viene rediretto su `/auth` che legge il token dai parametri URL
- Con una chiamata DB leggiamo i dati dalla tabella users (filtrando per email autenticata)
- Se l'utente non esiste in users, mostriamo una pagina errore (utente non autorizzato)
- Se esiste, arricchiamo i dati sessione con le info utente
- Salviamo la sessione in `localStorage`
- Salviamo la sessione anche nel context (`useAuth`) per usare il context come fonte dati principale
- L'utente viene infine rediretto in home (dashboard)

> [Pagina `/auth`](https://github.com/danielzotti/fortigames/blob/master/src/routes/auth/index.tsx)

Cosa succede se ricarichiamo la pagina (dopo login riuscito)?

- Abbiamo aggiunto `useCheckSession()` nel layout che contiene tutte le pagine protette
- `useCheckSession` controlla internamente se il context esiste
- Se il context esiste, lo ritorna subito
- Se non esiste:
- controlla se c'è un token in `localStorage`
- se il token non c'è, redirect al login
- se il token c'è, copia info nel context e ritorna il context aggiornato

```typescript
// /src/hooks/useCheckSession.ts

export function useCheckSession() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isTokenExpired = $(({ expires_at }: AuthSession) => {
    if (!expires_at) {
      return false;
    }
    return new Date() >= new Date(expires_at * 1000);
  });

  const getSessionFromLocalStorage = $(async () => {
    try {
      const tokenString = localStorage.getItem(config.jwtTokenLocalStorageName);

      if (!tokenString) {
        return null;
      }
      const token: AuthSession = JSON.parse(tokenString);
      if (await isTokenExpired(token)) {
        return null;
      }
      return token;
    } catch (e) {
      return null;
    }
  });

  useVisibleTask$(async () => {
    if (auth.value) {
      return;
    }
    const token = await getSessionFromLocalStorage();
    if (!token) {
      navigate(config.urls.login);
      return;
    }
    auth.value = token;
  });

  return auth;
}
```

> [`useAuth`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useAuth.ts) e [`useCheckSession`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useCheckSession.ts)

**NB:** una cosa non immediata in _Qwik_ è che **_il codice può essere eseguito lato client o lato server_** (con logiche diverse).
Nel nostro caso dovevamo fare il check lato client (dove persiste il JWT), quindi abbiamo usato `useVisibleTask$` per assicurarci l'esecuzione browser-side dopo il primo rendering.

Infatti, `useVisibleTask$()` è simile a `useTask$()` ma gira solo nel browser e dopo il rendering iniziale.

> [`useVisibleTask$`](https://qwik.builder.io/docs/components/tasks/#usevisibletask)

## Martedì 26 settembre

Restano ancora molte feature da sviluppare, e
si aggiunge _Erik_ (Frontend Developer) al team per darci una mano su alcuni componenti.

### Time manager

Un **countdown** con questa logica:

- Prima dell'inizio giochi, countdown verso data/ora di inizio pianificata
- Durante i giochi, countdown verso data/ora di fine prevista
- A giochi finiti, countdown verso data/ora di fine effettiva

In più mostriamo evento agenda corrente e prossimi eventi.

> [`GamesTimeManager`](https://github.com/danielzotti/fortigames/blob/master/src/shared/components/games-time-manager/games-time-manager.tsx)

### Mini UI kit

Per accelerare abbiamo creato componenti riusabili: button, back-to-top, logo aziendale, back button, ecc.

> [`Button`](https://github.com/danielzotti/fortigames/blob/master/src/shared/components/ui/button/button.tsx)

### Primo deploy su Vercel

Il deploy su **[_Vercel_](https://vercel.com/)** con _Qwik_ è davvero semplice.
C'è un adapter che installi con:

```shell
npm run qwik add vercel-edge
```

> [_Vercel_ edge](https://qwik.builder.io/docs/deployments/vercel-edge/)

Poi vai sul sito Vercel e colleghi il repo Git.

![_Vercel_ - Import git](/static/images/articles/fortigames-companion-app/8-vercel-import-git.png)

Inoltre puoi configurare il deploy automatico al **push** su uno specifico branch (`Settings → Git`).

![_Vercel_ - Set production branch](/static/images/articles/fortigames-companion-app/9-vercel-set-production-branch.png)

Dopo il push su `deploy-vercel`, vai su https://fortigames.vercel.app e vedi l'app funzionante.

Il pattern URL è `https://{project_name}.vercel.app`

## Mercoledì 27 settembre

### Tempo di Real Time!

_Supabase_ ha la funzione **Realtime** ed è facilissima da attivare: vai nei dettagli tabella, clicchi il pulsante e hai finito.

![Supabase - RealTime on](/static/images/articles/fortigames-companion-app/10-supabase-realtime-on.png)

> **Fact "divertente"**: _Stefano_ aveva attivato il realtime solo sulla tabella users. Quando ho iniziato a sviluppare la parte risultati realtime, ho perso 2 ore per capire che il realtime non era attivo anche sulla tabella giusta. _Supabase_ non dava errore: semplicemente ritornava dati vuoti. Quindi con zero errori ci ho messo un po' a capirlo (qui potrebbero migliorare parecchio!!).

I dati nel DB erano pochi, quindi da un punto di vista realtime **aveva senso caricare tutta la lista utenti** (e gli altri dataset) senza paginazione e poi restare in ascolto dei pochi cambiamenti aggiornando la memoria.
Per comodità abbiamo incapsulato la logica in **hook**.

### Hook per realtime

NB: prendiamo `useParticipants()` come esempio, ma gli altri hook seguono lo stesso pattern.

L'idea è _inizializzare lo store dell'hook nel layout delle pagine protette_ (dato che l'app funziona solo dopo autenticazione), così _i dati vengono caricati una volta sola e comunque dopo auth_.

La single source of truth è lo **store**.
Da lì filtriamo i dati di interesse (es. utenti che partecipano ai giochi perché assegnati a un team, oppure chi gioca a boardgame).
Ascoltiamo i cambi realtime DB e aggiorniamo lo store, e tutte le proprietà `useComputed$` si aggiornano automaticamente.

```typescript
// /src/hooks/useParticipants.ts

export const useParticipants = () => {
  // Single source of truth
  const store = useContext(ParticipantsContext);

  // List of all people in Fortitue Group who participate to the convention
  const usersList = useComputed$<Participant[]>(() => {
    return Object.values(store);
  });

  // Participants in a team
  const participantsList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((p) => !!p.team);
  });

  // People who play boardgames
  const boardgamersList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((u) => u.is_playing_boardgames);
  });

  // Get participant by a specifica email (ID)
  const participantByEmail = $((email: string) => store[email]);

  // It is used in the layout of the protected route
  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("users").select("*");

    // Save data in key:value structure (email is the key)
    if (data?.length) {
      Object.entries(data).forEach(([key, value]) => {
        store[value.email] = value;
      });
    }

    // Listen to data changes
    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: RealtimePostgresUpdatePayload<Participant>) => {
          store[payload.new.email] = payload.new;
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    store,
    participantByEmail,
    participantsList,
    usersList,
    boardgamersList,
  };
};
```

> [`useParticipants`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useParticipants.ts), [`useComputed$`](https://qwik.builder.io/docs/components/state/#usecomputed) e [`useSignal`](https://qwik.builder.io/docs/components/state/#usesignal)

### Gestione punteggio

Con il realtime pronto, lavoriamo all'aggiornamento score partite.
Operazione semplice: "+1" o "-1" al dato quando si clicca il bottone.
Unica accortezza: disabilitare subito il bottone dopo il click, per evitare update multipli.

```typescript jsx
// /src/routes/(protected)/games/[id]/index.tsx

const updateScore = $(
  async ({ team, score }: { team: 'dragons' | 'tigers'; score: number }) => {
    if (!result.value) {
      return;
    }
    if (score < 0) {
      return;
    }

    isSubmitting.value = true;
    try {
      const row = {
        ...result.value,
        last_update: new Date().toISOString(),
        [team]: score
      };
    } catch (ex) {
      alert('There was an error :(');
    } finally {
      isSubmitting.value = false;
    }
  }
);

<Button
  variant='selected'
  disabled={isSubmitting.value}
  onClick$={() =>
    updateScore({
      team: 'dragons',
      score: result.value!['dragons'] + 1
    })
  }
>
  +</Button>;
```

### Quasi pronti

Sono le 01:40.
L'app sembra usabile e (quasi) completa.
Possiamo andare a dormire, ma prima foto di rito per festeggiare!

![Fortigames Devs](/static/images/articles/fortigames-companion-app/fortigames-devs.jpg)

## Giovedì 28 settembre

### Start/Stop Fortigames

Per avere qualcosa di funzionante il giorno della convention, abbiamo lasciato per ultime le componenti di gestione partite, perché in emergenza si poteva comunque intervenire direttamente nel DB da Supabase.

Fortunatamente c'era ancora un giorno e, prendendomi un paio d'ore nel pomeriggio, sono riuscito a gestire i pulsanti per **start**, **pause** e **restart**.

Ogni pulsante segue la stessa logica:
_legge in realtime lo stato giochi e, al click, esegue l'operazione specifica Start/Stop/Reset_.

### Pagina vincitore

A parte la grafica (SVG coppa disegnato da _Gabri_), il componente resta in ascolto del campo `winner` nella tabella `config`.
Quando il valore diventa _"dragons"_ o _"tigers"_, il componente mostra la coppa con il nome del _vincitore_.

## Ultimi momenti

Sono le 20:00 del giorno prima della convention.
La partenza è alle 6:00 del mattino (con 3 ore di macchina!) e il debito di sonno va recuperato in qualche modo (andare a letto tutti i giorni alle 2:00 forse non è stata un'idea brillante 😅).

Giusto il tempo di qualche fix grafico finale, **ZERO testing**, ultimo deploy e si spera nella fortuna!
Tempo di fare la valigia e provare a riposare per i due giorni di evento.

Un ultimo sguardo all'**_evoluzione della UI_** prima di chiudere il viaggio:

![From Balsamiq, to Figma and the real app](/static/images/articles/fortigames-companion-app/11-ui-history.png)

## Considerazioni finali

Ok, il tempo era davvero poco, ma siamo riusciti a sviluppare questa app!
Certo, continuare ad aggiungere idee e feature in corsa non è stata la scelta migliore, però alla fine ce l'abbiamo fatta e **_ne è valsa la pena_**.

> Non smetterò mai di dirlo: se ti diverti e ci metti passione, puoi fare qualsiasi cosa.

Facciamo il punto sulle scelte:

- Sapendo che l'app era usata internamente da persone fidate, non abbiamo considerato controlli di sicurezza avanzati
- L'app nasceva per divertirci, quindi non ci siamo concentrati sulle performance ma sull'aggiunta feature
- Eravamo talmente focalizzati sulla funzionalità che non abbiamo avuto tempo per allineare pattern condivisi di sviluppo (es. accesso DB, struttura cartelle/file, naming conventions, ...)
- Non abbiamo studiato _Qwik_ o _Supabase_ in modo strutturato: siamo andati per tentativi ed errore leggendo solo la doc utile nel momento (non è il modo migliore per imparare)
- _Qwik_ è molto interessante ma diverso dai framework noti; JSX, hook e routes ci sono, ma all'inizio sembra tutto "strano". Poi, quando capisci la logica, svilupparci è davvero piacevole
- _Supabase_ offre una bella dev experience e documentazione molto ben fatta. Di contro, il realtime ci è sembrato un po' lento rispetto a Firebase

- In generale siamo contenti di com'è andata, anche perché abbiamo usato _Qwik_ e _Supabase_ per la prima volta e, in pochi giorni, siamo riusciti a creare un'app funzionante con poco sforzo.
  Sono due strumenti che terremo presenti anche per progetti più complessi, facendo però un approfondimento serio.

### Prossimi step / Miglioramenti

Ci sono sicuramente miglioramenti possibili. Non so se li faremo, ma li elenco:

- Migliorare la **sicurezza DB** configurando le Policy Supabase
- Aggiungere un **toggle tema** per scegliere il tema preferito (ora usiamo tema OS di default)
- Migliorare la UI della **sezione admin**
- Gestire la tabella **`config` direttamente da UI**
- **Code cleanup**: rivedere struttura cartelle, pulire commenti/codice inutilizzato, usare pattern condivisi tra pagine/componenti
- ...e altro che ora non mi viene in mente!

## Il codice

Ti lascio il link al [repo GitHub](https://github.com/danielzotti/fortigames), così puoi navigare il codice.
Se vuoi provare l'app, ti basta usare il repo e seguire gli step per creare il tuo DB su _Supabase_ e la tua app su _Google Cloud_ console.

## La demo

Dovrai accontentarti di un video, sorry...

<iframe width="560" height="315" style="max-width:100%" src="https://www.youtube.com/embed/wRukdA-ZBAs?si=XfcuwSOwK7Syg9kO" title="Fortigames Companion App Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Conclusione

Questo è stato un post lunghissimo...
Direi che ci ho messo più tempo a scrivere l'articolo che a sviluppare davvero l'app! 😅
Spero che il tutorial sia chiaro e utile a qualcuno.
E come sempre, se hai domande o vuoi maggiori dettagli su una parte specifica, scrivimi pure! 🙃

❤️ Grazie per aver letto fin qui! ❤️
