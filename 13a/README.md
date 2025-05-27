# GraphQL Server - Apollo (13a)

## 🧠 Formål
Dette projekt er en løsning til opgave 13a (Individual GraphQL). Det viser, hvordan man sætter en GraphQL-server op med TypeScript og Apollo Server – og hvordan queries, mutations og subscriptions fungerer i praksis.

---

## 🚀 Sådan kører du projektet

### 1. Installer afhængigheder
```bash
npm install
```

### 2. Start serveren (udvikling)
```bash
npx nodemon
```
Serveren kører på: http://localhost:4000/graphql

**Alternativ (manuel opstart):**
```bash
npm run compile    # kompilerer TypeScript til JavaScript
npm run start      # starter serveren fra /dist/index.js
```

---

## 🧩 Teknisk overblik

### GraphQL
GraphQL er et API-sprog, hvor klienten selv vælger, hvilke felter der skal returneres. I stedet for flere REST-endpoints, har du ét samlet endpoint (`/graphql`).

### Apollo Server
Apollo Server fungerer som selve motoren bag GraphQL. Den håndterer forespørgsler, validerer mod dit schema, og kalder de rigtige resolvers.

### Schema (`src/graphql/schema.graphql`)
Her defineres de typer (f.eks. Book, Author) og operations (Query, Mutation, Subscription). Det er "kontrakten" mellem klient og server.

### Resolvers (`src/resolvers/`)
Resolvers er funktioner, der håndterer logikken for hvert felt i schemaet. F.eks. håndterer `Query.ts` at hente bøger/forfattere, `Mutation.ts` håndterer oprettelse/opdatering/sletning af bøger, og `Subscription.ts` håndterer realtidsopdateringer.

### Integrationspunkt
Integration af schema, resolvers, Apollo Server og WebSocketServer til subscriptions sker i [`src/index.ts`].

**Se efter denne kommentar i koden:**
```typescript
// INTEGRATION POINT: GraphQL schema and resolvers are integrated here with Apollo Server and WebSocketServer
```
Her oprettes det executable schema og gives videre til både Apollo Server (HTTP queries/mutations) og WebSocketServer (subscriptions).

---

## Eksempel på brug

Åbn http://localhost:4000/graphql i din browser og prøv følgende:

**Subscription:**
```graphql
subscription {
  bookAdded {
    id
    title
    releaseYear
    authorId
  }
}
```

**Mutation (i en anden fane):**
```graphql
mutation {
  addBook(title: "GraphQL Live Book", releaseYear: 2025, authorId: 1) {
    id
    title
    releaseYear
    authorId
  }
}
```

---

## Fordele og ulemper

### Fordele
- **TypeScript support:** Type-sikkerhed og bedre udvikleroplevelse.
- **Apollo Server:** Nem integration med GraphQL, understøtter queries, mutations og subscriptions.
- **Realtidsopdateringer:** Subscriptions er aktiveret via WebSocketServer og `graphql-ws`.
- **Modulær struktur:** Schema, resolvers og data er adskilt for overblik og vedligeholdelse.

### Ulemper
- **In-memory data:** Eksemplet bruger in-memory arrays til bøger/forfattere, så data mistes ved server-genstart.
- **Ingen authentication:** Der er ingen brugerautentifikation eller autorisation.
- **Ikke produktionsklar:** Til produktion bør der bruges persistent storage, bedre fejlhåndtering og sikkerhed.

---

## Hvor integrationen sker
- Integration af schema, resolvers, Apollo Server og WebSocketServer sker i [`src/index.ts`], markeret med en kommentar i koden for nem reference.

---

## Filstruktur
- `src/graphql/schema.graphql` – GraphQL schema definition
- `src/database/data.ts` – In-memory data for bøger og forfattere
- `src/resolvers/` – Resolver-funktioner for Query, Mutation, Subscription, Book, Author
- `src/index.ts` – Server-setup og integrationspunkt

---

## Mulige forbedringer
- Tilføj persistent database (f.eks. PostgreSQL, MongoDB)
- Implementér authentication/authorization
- Tilføj mere avancerede queries og mutations
- Forbedr fejlhåndtering og validering