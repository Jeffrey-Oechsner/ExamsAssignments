# 📚 10a - Document A Database (Knex + PostgreSQL)

## ✅ Opgaveformulering
    Use a tool to document any database.”

Jeg har valgt at bruge Knex.js til at oprette og dokumentere en PostgreSQL-database. Knex gør det muligt at definere database-skemaer med kode, tracke ændringer (migrations), indsætte testdata (seeds) og versionere databasen nemt i et udviklingsprojekt.

Type: Individual
Valgt database: PostgreSQL
Tool anvendt: Knex.js (query builder og migrationsværktøj)

Denne opgave dokumenterer en PostgreSQL-database ved hjælp af **Knex.js** – et SQL query builder-værktøj for Node.js.  
Knex bruges her til at **oprette tabeller (migrations)** og **indsætte testdata (seeds)**.

⚙️ Setup & Teknisk miljø
Komponent	Beskrivelse
PostgreSQL	Database kørt i en Docker-container
Knex.js	Tool til migration og seed via Node.js
Docker Compose	Til at spinne databasen op lokalt
.env-fil	Indeholder konfigurationsvariabler

🧰 Værktøjer og teknologier anvendt
Værktøj / Teknologi	Beskrivelse
PostgreSQL	Relationsdatabase til lagring af data. Kører i Docker-container.
Docker & Docker Compose	Til at spinne PostgreSQL op lokalt med miljøvariabler og volumes.
Knex.js	Node.js-baseret query builder. Bruges til migration og seed af databasen.
Node.js	JavaScript-runtime brugt til at køre Knex og scripts.
dotenv	Loader miljøvariabler fra .env fil til Node.js-applikationen.
psql (PostgreSQL CLI)	Command line-værktøj til at tilgå databasen og inspicere tabeller/data.
VSCode (valgfri)	Editor til at skrive migrations, seed og konfigurationsfiler.
Markdown / README.md	Dokumentation af databasen og processen.
(Valgfri) ER-diagramværktøj	fx dbdiagram.io eller draw.io til at vise datamodel.
---

🧱 Struktur af databasen
🔹 Tabeller

users

    id – integer, primær nøgle

    first_name – varchar(255)

    last_name – varchar(255)

products

    id – integer, primær nøgle

    name – varchar(1000)

    price – decimal


🛠️ Implementeringsproces
1. Initiering

npm init -y
npm install knex pg dotenv
npx knex init

🧱 Migration: Opret skema

npx knex migrate:make create_users_products_table
Kør migration

npx knex migrate:latest

🌱 Seed data

npx knex seed:make seed_users

Kør seeding

npx knex seed:run

🧪 Verificering

Inde i containeren:

docker exec -it <container_id> psql -U myuser -d mydatabase

Tjek tabeller:

\dt
SELECT * FROM users;










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


Setup:
1. Clone repo og installér dependencies

npm install

2. Start PostgreSQL med Docker

docker compose up

3. Kør migration

npx knex migrate:latest

4. Kør seed for testdata

npx knex seed:run

📋 Eksempeldata (fra seeding)

-- SELECT * FROM users;
+----+------------+-----------+
| id | first_name | last_name|
+----+------------+-----------+
| 1  | John       | Doe       |
| 2  | Jane       | Smith     |
| 3  | Alice      | Johnson   |
+----+------------+-----------+

📦 Backup & Dokumentation (Bonus)

    Backup kan foretages via:

docker exec -T <container_id> pg_dump -U myuser mydatabase > pgdump.sql

    Dokumentation er i denne README

    Migrationer og seeds findes i mappen:

        /migrations

        /seeds