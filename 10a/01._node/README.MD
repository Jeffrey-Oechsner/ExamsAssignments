# 📚 10a - Document A Database (Knex + PostgreSQL)

## ✅ Opgaveformulering
    Use a tool to document any database.”

Jeg har valgt at bruge Knex.js til at oprette og dokumentere en PostgreSQL-database. Knex gør det muligt at definere database-skemaer med kode, tracke ændringer (migrations), indsætte testdata (seeds) og versionere databasen nemt i et udviklingsprojekt.

Type: Individual
Valgt database: PostgreSQL
Tool anvendt: Knex.js (query builder og migrationsværktøj)

Denne opgave dokumenterer en PostgreSQL-database ved hjælp af **Knex.js** – et SQL query builder-værktøj for Node.js.  
Knex bruges her til at **oprette tabeller (migrations)** og **indsætte testdata (seeds)**.

---

## 🧩 Hvordan virker koden?

### 1. Konfiguration
- `knexfile.js` indeholder databasekonfigurationen (hvilken database, bruger, password, host osv.).
- Miljøvariabler hentes fra `.env`-filen.

### 2. Migrationer
- I mappen `/migrations` findes migrationsfiler, fx `20250411093547_create_users_products_table.js`.
- Her defineres tabellerne `users` og `products` med deres felter og datatyper.

### 3. Seeds
- I mappen `/seeds` findes seed-filer, fx `seed_users.js`, som indsætter testdata i tabellerne.

### 4. Integration med applikationen
- I `index.js` integreres Knex med applikationen:
  - Her importeres Knex og konfigurationen.
  - Forbindelsen til databasen oprettes:
    ```js
    // INTEGRATION POINT: Her integreres Knex med applikationen ved at oprette en databaseforbindelse
    const db = knex(knexConfig);
    ```
  - Herefter kan du lave queries mod databasen via `db`-objektet.

### 5. Kørsel
- Migrationer og seeds køres med Knex CLI:
  - `npx knex migrate:latest` opretter tabellerne.
  - `npx knex seed:run` indsætter testdata.

---

## 📍 Hvor sker integrationen?
- **Integration sker i `index.js`** hvor følgende linje opretter forbindelsen mellem Node.js og databasen via Knex:
  ```js
  // INTEGRATION POINT: Her integreres Knex med applikationen ved at oprette en databaseforbindelse
  const db = knex(knexConfig);
  ```

---

## ✅ Fordele og ulemper ved denne løsning

### Fordele
- **Kodebaseret skemadefinition:** Alt database-design og ændringer versionstyres i kode.
- **Nem versionering:** Migrationer gør det let at spole frem/tilbage i databaseændringer.
- **Automatiseret testdata:** Seeds gør det nemt at fylde testdata på databasen.
- **Miljøuafhængig:** Kan nemt flyttes mellem udviklingsmiljøer (Docker, lokal, cloud).
- **Let at integrere med Node.js:** Knex fungerer godt sammen med moderne JavaScript/TypeScript.

### Ulemper
- **Abstraktion:** Man mister noget af den "rå" SQL-følelse og kontrol.
- **Læringskurve:** Kræver forståelse for både Knex og SQL.
- **Mindre egnet til meget komplekse queries:** Knex er bedst til simple til moderate queries.

---

## 🧱 Struktur af databasen
🔹 Tabeller

users

    id – integer, primær nøgle
    first_name – varchar(255)
    last_name – varchar(255)

products

    id – integer, primær nøgle
    name – varchar(1000)
    price – decimal

---

## 🛠️ Implementeringsproces
1. Initiering

    npm init -y
    npm install knex pg dotenv
    npx knex init

2. Migration: Opret skema

    npx knex migrate:make create_users_products_table
    npx knex migrate:latest

3. Seed data

    npx knex seed:make seed_users
    npx knex seed:run

4. Verificering

    docker exec -it <container_id> psql -U myuser -d mydatabase
    \dt
    SELECT * FROM users;

---

## 🧰 Teknologier brugt

| Teknologi       | Beskrivelse                             |
|----------------|------------------------------------------|
| **PostgreSQL**  | Relationsdatabase, hostet i Docker       |
| **Knex.js**     | Migrations + seeding + SQL abstraction   |
| **Docker Compose** | Starter container med DB + volume persistence |
| **psql**        | CLI-værktøj til at tilgå og inspicere databasen |

---

## 🏗️ Struktur & Data

### 🔹 Tabeller
```text
users
├── id (int, primary key)
├── first_name (varchar)
└── last_name (varchar)

products
├── id (int, primary key)
├── name (varchar)
└── price (decimal)
```

---

## Eksempeldata (fra seeding)

-- SELECT * FROM users;
+----+------------+-----------+
| id | first_name | last_name|
+----+------------+-----------+
| 1  | John       | Doe       |
| 2  | Jane       | Smith     |
| 3  | Alice      | Johnson   |
+----+------------+-----------+

---

## 📦 Backup & Dokumentation (Bonus)

Backup kan foretages via:

    docker exec -T <container_id> pg_dump -U myuser mydatabase > pgdump.sql

Dokumentation er i denne README

Migrationer og seeds findes i mapperne:

    /migrations
    /seeds
```