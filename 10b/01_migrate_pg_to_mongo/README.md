# Opgave 10b – Migration fra PostgreSQL til MongoDB

## Formål
Dette projekt demonstrerer, hvordan man migrerer data fra en relationel database (PostgreSQL) til en NoSQL database (MongoDB) ved hjælp af Node.js. Det illustrerer, hvordan data kan overføres mellem forskellige databasesystemer som led i et integrationssystem.

## Værktøjer
- **Node.js**: JavaScript runtime
- **Knex.js**: Query builder til PostgreSQL
- **MongoDB Node.js Driver**: Til at skrive til MongoDB
- **Docker**: Til at køre PostgreSQL og MongoDB i containere
- **dotenv**: Til at håndtere konfigurationsfiler (.env)

## Struktur
```
10b/
├── 01_migrate_pg_to_mongo/
│   ├── knexfile.js
│   ├── migrate.js
│   ├── migrations/
│   │   └── 20250411145825_create_users_table.js
│   ├── seeds/
│   │   └── seed_users.js
│   ├── package.json
│   └── docker-compose.yaml
├── .env
```

## Sådan fungerer koden
1. **Databaseopsætning**: 
   - `docker-compose.yaml` starter både PostgreSQL og MongoDB med de rette miljøvariabler fra `.env`.
2. **Migration og seed**:
   - `knexfile.js` konfigurerer Knex til at forbinde til PostgreSQL vha. miljøvariabler.
   - `migrations/20250411145825_create_users_table.js` opretter en `users`-tabel i PostgreSQL.
   - `seeds/seed_users.js` indsætter eksempelbrugere i PostgreSQL.
3. **Integration/migration**:
   - `migrate.js` læser alle brugere fra PostgreSQL og indsætter dem i MongoDB.
   - **Integration Point**: Selve integrationen sker i `migrate.js`:
     ```js
     // INTEGRATION POINT: Her overføres data fra PostgreSQL til MongoDB
     await mongo.connect();
     const db = mongo.db();
     const result = await db.collection('users').insertMany(users);
     ```
     Her overføres data fra den relationelle database til NoSQL databasen.

## Hvor sker integrationen?
- **Fil**: `01_migrate_pg_to_mongo/migrate.js`
- **Sted**: Lige efter brugerne er hentet fra PostgreSQL og før de indsættes i MongoDB. Se kommentaren `// INTEGRATION POINT: Her overføres data fra PostgreSQL til MongoDB` i koden.

## Fordele og ulemper
### Fordele
- **Automatiseret migration**: Hele processen kan køres med ét script.
- **Genbrugelig kode**: Kan nemt tilpasses til andre tabeller eller datatyper.
- **Docker-baseret**: Nem opsætning og nedtagning af miljøet.
- **Miljøvariabler**: Sikker og fleksibel konfiguration.

### Ulemper
- **Ingen datavalidering**: Data migreres 1:1 uden transformation eller validering.
- **Ingen håndtering af relationer**: Kun én tabel migreres; relationer/tabeller kræver ekstra kode.
- **Fejlhåndtering er basal**: Scriptet stopper ved fejl uden detaljeret logning eller rollback.
- **Skalerbarhed**: Velegnet til små datamængder – store datamængder kræver batching/streaming.

## Kørsel
1. Start Docker services:
   ```powershell
   docker compose up -d
   ```
2. Kør migration og seed:
   ```powershell
   npx knex migrate:latest
   npx knex seed:run
   ```
3. Kør migreringsscriptet:
   ```powershell
   node migrate.js
   ```
4. Tjek data i MongoDB:
   ```powershell
   docker exec -it <mongo-container-id> mongosh
   use mymongo
   db.users.find().pretty()
   ```

## Afslutning
Du har nu en komplet pipeline til at migrere data fra PostgreSQL til MongoDB, med tydelig markering af hvor integrationen sker i koden.
