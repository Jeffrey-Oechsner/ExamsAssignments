import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Setup __dirname i ES Modules, gør det muligt at bruge korrekt stier i ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env fil
dotenv.config();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false })); // gør det muligt at læse data fra HTML (login-formularen)

// Session config - se hvem der er logget ind
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Starter Passport og kobler det til sessionen  
app.use(passport.initialize());
app.use(passport.session());

// Hardcoded users
const users = [
  { id: 1, email: 'jeffoech1995@gmail.com', password: '1234' }
];

// PASSPORT-LOCAL INTEGRATION STARTER HER
// LocalStrategy brugeas til at autentificere users med email og password i arrayet.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return done(null, false, { message: 'Forkert login' });
  return done(null, user);
}));
// PASSPORT-LOCAL INTEGRATION SLUTTER HER

// serializeUser gemmer users id i sessionen, når useren logger ind.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser henter users ud fra id'et i sessionen, så passport kan finde ud af, hvem der er logget ind.
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Serve statiske filer fra public/ f.eks login.html / css fil. 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h2>Velkommen ${req.user.email}!</h2><a href="/logout">Log ud</a>`);
  } else {
    res.redirect('/login');
  }
});

// /Login viser login-formular. 
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// /Login håndterer login-formularen og autentificerer brugeren med Passport.
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error=true'
}));

// /Logout håndterer logout og fjerner brugeren fra sessionen.
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

app.listen(3001, () => {
  console.log('✅ Server kører på http://localhost:3001');
});

