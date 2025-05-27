Opgave 11b - Stripe Integration

📅 Projekt: Stripe Checkout med Node.js og Express

Dette projekt implementerer en fungerende betaling med Stripe Checkout i testmode. Formålet er at vise, hvordan man sætter en simpel betalingsløsning op med Express og Stripe.

📂 Projektstruktur

11b/
├── public/
│   └── index.html         # Simpelt UI med betalingsknap
├── server.js               # Express-server og Stripe integration
├── .env                    # Indeholder hemmelige Stripe-nøgler
├── package.json            # Dependencies og scripts
└── README.md              # Dokumentation (denne fil)

🚀 Teknologier brugt

Node.js

Express

Stripe (Checkout API)

HTML (simpel frontend)

ESM (ECMAScript Modules)

🏛 Installation & Opsætning

Installer dependencies:

npm install

Opret .env-fil:

PORT=3001
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLIC_KEY=your_stripe_public_key_here
DOMAIN=http://localhost:3001

Start server:

npm start

Gå til http://localhost:3001 i browseren og klik på betalingsknappen.

## Hvordan virker koden?

1. **Frontend (index.html):**
   - Brugeren klikker på "Betal 25 DKK"-knappen.
   - En POST-request sendes til `/create-checkout-session` på serveren.
   - Stripe.js bruges til at redirecte brugeren til Stripe Checkout med det session-id, serveren returnerer.

2. **Backend (server.js):**
   - Express-serveren håndterer requests.
   - Når `/create-checkout-session` kaldes, oprettes en Stripe Checkout Session med produkt, pris og redirect-URLs.
   - **Stripe integrationen sker her:**
     ```js
     // STRIPE INTEGRATION STARTER HER
     const session = await stripe.checkout.sessions.create({ ... });
     // STRIPE INTEGRATION SLUTTER HER
     ```
   - Serveren returnerer session-id til frontend, som bruger det til at sende brugeren til Stripe Checkout.
   - Efter betaling sendes brugeren til `/success.html` eller `/cancel.html`.

## Hvor sker Stripe integrationen?

Stripe integrationen sker i `server.js` i denne route:
```js
app.post('/create-checkout-session', async (req, res) => {
  // STRIPE INTEGRATION STARTER HER
  const session = await stripe.checkout.sessions.create({ ... });
  // STRIPE INTEGRATION SLUTTER HER
  res.json({ id: session.id });
});
```

## Fordele og ulemper ved denne løsning

**Fordele:**
- Meget nem at implementere og forstå.
- Stripe Checkout håndterer sikkerhed, PCI compliance og UI.
- Ingen kreditkortdata håndteres på din server.
- Hurtig at tilpasse til andre produkter/priser.

**Ulemper:**
- Checkout flowet foregår på Stripes domæne (ikke "on-site").
- Begrænset kontrol over designet af betalingsflowet.
- Kræver internetadgang for at virke.
- Kræver Stripe-konto og API-nøgler.

## Sådan kører du projektet

1. Installer dependencies:
   ```bash
   npm install
   ```
2. Opret en `.env`-fil med dine Stripe-nøgler og domæne:
   ```env
   PORT=3001
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   DOMAIN=http://localhost:3001
   ```
3. Start serveren:
   ```bash
   npm start
   ```
4. Gå til `http://localhost:3001` og klik på betalingsknappen.

🔍 Hvor sker selve integrationen?

Stripe integrationen sker i server.js, nærmere bestemt her:

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

Checkout session oprettes i denne route:

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [...],
    mode: "payment",
    success_url: "http://localhost:3001/success",
    cancel_url: "http://localhost:3001/cancel"
  });
  res.redirect(303, session.url);
});

Her sker Stripe integrationen ved at oprette en betalingssession direkte mod Stripe, og brugeren sendes videre til Stripes sikre betalingsside.

💸 Testbetaling

Brug følgende testkort i Stripe Checkout:

Kortnummer: 4242 4242 4242 4242
Udløbsdato: valgfrit (f.eks. 12/34)
CVC: valgfrit (f.eks. 123)
Postnummer: valgfrit

🔧 Udvidelsesmuligheder (Bonus)

Gem ordredata i en database (f.eks. MongoDB)

Vis kvittering eller PDF efter betaling

E-mail integration

💳 Testkortoplysninger
Felt	Værdi
Card number	4242 4242 4242 4242 (standard Visa testkort)
Expiration date	12 / 34 (hvilken som helst fremtidig dato virker)
CVC	123 (hvilket som helst 3-cifret tal)
Cardholder name	Test User (hvad som helst)
Country or region	Denmark (eller hvad der er valgt som standard)
Email	test@gmail.com (hvad som helst)

Bonus: Andre testkort
Korttype	Nummer	Resultat
Visa	4242 4242 4242 4242	Succes
Mastercard	5555 5555 5555 4444	Succes
SPM fejlkort	4000 0000 0000 9995	Kort bliver afvist
3D Secure	4000 0027 6000 3184	Kræver 3D Secure autentificering