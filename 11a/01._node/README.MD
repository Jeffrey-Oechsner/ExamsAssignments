<!-- filepath: c:\codeprojects\ExamsAssignments\11a\01._node\README.MD -->

# 🧪 System Integration – Local Passport Login (Node.js)

## Projektoversigt
Dette projekt viser, hvordan man laver simpel bruger-login i Node.js med Express og Passport.js (`passport-local`). Det er lavet til eksamen i System Integration på KEA. Her lærer du, hvordan sessions og bruger-validering fungerer – uden OAuth eller eksterne logins.

---

## 🔑 Login Credentials
- **Email:** jeffoech1995@gmail.com
- **Password:** 1234

---

## 🚀 Kom hurtigt i gang
1. **Installer dependencies:**
   ```bash
   npm install
   ```
2. **Start serveren:**
   ```bash
   npm start
   # eller
   node server.js
   ```
3. **Login:**
   Gå til [http://localhost:3001/login](http://localhost:3001/login) og brug credentials ovenfor.

---

## 🗂️ Projektstruktur
- `server.js` – Hovedserverfilen med Passport integration
- `public/` – Statiske filer (HTML, CSS)
- `package.json` – Afhængigheder og scripts

---

## 🛠️ Teknologier
- Node.js
- Express
- Passport.js (passport-local)
- express-session
- HTML/CSS
- ESModules

---

## 🧩 Hvordan virker det? (Forklar til eksamen)
1. **Loginformular:**
   - Brugeren indtaster email og password på `/login`.
2. **POST /login:**
   - Formularen sender data til serveren.
3. **Passport-local integration:**
   - Passport validerer credentials mod en hardcoded bruger i `server.js`.
4. **Session:**
   - Ved succesfuldt login gemmes brugerens ID i sessionen (med `express-session`).
5. **Beskyttede sider:**
   - Kun brugere med aktiv session kan se forsiden (`/`).
6. **Logout:**
   - Brugeren kan logge ud, og sessionen slettes.

---

## 🔍 Hvor sker integrationen?
- **I `server.js`:**
  - `passport.use(new LocalStrategy(...))`
  - `passport.serializeUser(...)` og `passport.deserializeUser(...)`
  - Sessionen holdes aktiv med `express-session`.
  - Brug `req.isAuthenticated()` til at tjekke om brugeren er logget ind.

**Eksempel på Passport-local integration:**
```js
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return done(null, false, { message: 'Forkert login' });
  return done(null, user);
}));
```

---

## ✅ Funktionalitet
- Simpel loginformular
- Server validerer bruger via `passport-local`
- Session gemmes i hukommelsen
- Visning af brugerens email ved korrekt login
- Beskyttede ruter
- Logout-funktion
- Brugervenligt UI

---

## ⚖️ Fordele og ulemper
**Fordele:**
- Simpelt og let at forstå
- Ingen database nødvendig (god til demo)
- Session-baseret (brugeren forbliver logget ind)

**Ulemper:**
- Hardcoded bruger (ikke til produktion)
- Ingen kryptering af passwords (kun demo!)
- Ingen brugeroprettelse
- Ikke skalerbar

---

## 🗣️ Sådan kan du forklare det til eksamen
- "Jeg har lavet en simpel loginløsning med Passport.js og Express. Brugeren logger ind via en HTML-formular, og serveren validerer credentials mod en hardcoded bruger. Ved login oprettes en session, så brugeren forbliver logget ind. Jeg bruger `passport-local` strategien, og sessionen håndteres med `express-session`. Alt dette sker i `server.js`."
- "Fordelen er, at det er nemt at forstå og hurtigt at sætte op til demo. Ulempen er, at det ikke er sikkert eller skalerbart til produktion, fordi brugeren er hardcoded og passwords ikke er krypteret."
- "Jeg kan forklare hele flowet: loginformular → POST til server → Passport tjekker bruger → session oprettes → adgang til beskyttede sider."

---

## ℹ️ Noter
- Brugeren er hardcoded i server.js (kun til demo)
- Sessions gemmes kun i hukommelsen
- Projektet bruger ESModules (`type: "module"` i package.json)

---


