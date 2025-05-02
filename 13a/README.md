# GraphQL Server - Apollo (13a)

## 🧠 Formål
Dette projekt er en løsning til opgave 13a (Individual GraphQL). Det viser, hvordan man sætter en GraphQL-server op med TypeScript og Apollo Server – og hvordan queries, mutations og subscriptions fungerer i praksis.

---

## 🚀 Sådan kører du projektet

### 1. Installer afhængigheder
```bash
npm install

npx nodemon
Serveren kører på: http://localhost:4000/graphql

Alternativ (manuel opstart)
npm run compile    # kompilerer TypeScript til JavaScript
npm run start      # starter serveren fra /dist/index.js

🧩 Teknisk overblik
GraphQL

GraphQL er et API-sprog, hvor klienten selv vælger, hvilke felter der skal returneres. I stedet for flere REST-endpoints, har du ét samlet endpoint (/graphql).
Apollo Server

Apollo Server fungerer som selve motoren bag GraphQL. Den håndterer forespørgsler, validerer mod dit schema, og kalder de rigtige resolvers.
Schema (schema.graphql)

Her defineres de typer (f.eks. Book, Author) og operations (Query, Mutation, Subscription). Det er "kontrakten" mellem klient og server.

Eksempel:
åben fane http://localhost:4000/graphql
indsæt subscription

subscription {
  bookAdded {
    id
    title
    releaseYear
    authorId
  }
}
der kommer reponse. 

åben en anden http://localhost:4000/graphql
indsæt 
mutation {
  addBook(title: "GraphQL Live Book", releaseYear: 2025, authorId: 1) {
    id
    title
    releaseYear
    authorId
  }
}