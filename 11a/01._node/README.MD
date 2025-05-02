Kør npm install hvis du mangler express, passport, express-session, passport-local

Start med npm start (eller node server.js)

Gå til http://localhost:3001/login

👤 Login Credentials

Brug disse credentials for at logge ind:

    Email: jeffoech1995@gmail.com

    Password: 1234

🔐 Hvor sker integrationen?

Authentication integrationen sker i: server.js

passport.use(new LocalStrategy(...))

Her kobles passport sammen med en hardcoded user og validerer login-formularens input (email/password). Når brugeren logger ind, lagres sessionen, og brugerens ID gemmes via:

passport.serializeUser(...)
passport.deserializeUser(...)

Sessionen holdes aktiv via express-session, og brugerens identitet kan tjekkes via req.isAuthenticated().

💻 Teknologier brugt

    Node.js

    Express

    Passport.js

    express-session

    HTML/CSS

    ESModules ("type": "module")

    # 🧪 System Integration - Local Passport Login (Node.js)

Dette projekt er en del af eksamensopgaven i System Integration på KEA. Det demonstrerer **user authentication** via `passport-local` middleware i en Node.js applikation – helt uden OAuth eller Google/Auth0 besvær!

---

## ✅ Funktionalitet

- Simpel loginformular
- Server validerer bruger via `passport-local`
- Bruger session gemmes i hukommelsen med `express-session`
- Visning af brugerens email ved korrekt login
- Beskyttede ruter som kræver login
- Logout-funktion
- Responsivt og brugervenligt UI (HTML + CSS)

---

## 🚀 Sådan starter du det op

1. **Installer dependencies**

```bash
npm install
