import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // opretter Stripe klient med Secret Key fra .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));//sætter public folder som statisk, så vi kan servere 
// HTML, CSS og JS filer
app.use(express.json()); // modtage JSON data fra post requests

// Route: Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    // STRIPE INTEGRATION STARTER HER
    // Stripe integration: Her oprettes en checkout session med Stripe API'et, så brugeren kan betale online
      const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'dkk',
          product_data: {
            name: 'Test Produkt',
          },
          unit_amount: 2500,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success.html`,
      cancel_url: `${process.env.DOMAIN}/cancel.html`,
    });
    // STRIPE INTEGRATION SLUTTER HER

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).send('Noget gik galt med Stripe');
  }
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Server kører på http://localhost:${PORT}`);
});



