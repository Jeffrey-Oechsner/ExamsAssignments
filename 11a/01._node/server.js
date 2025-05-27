import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname i ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));

// Session config
app.use(session({
  secret: 'hemmelig123',
  resave: false,
  saveUninitialized: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Hardcoded users
const users = [
  { id: 1, email: 'jeffoech1995@gmail.com', password: '1234' }
];

// PASSPORT-LOCAL INTEGRATION STARTER HER
// Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return done(null, false, { message: 'Forkert login' });
  return done(null, user);
}));
// PASSPORT-LOCAL INTEGRATION SLUTTER HER

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Serve statiske filer fra public/
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h2>Velkommen ${req.user.email}!</h2><a href="/logout">Log ud</a>`);
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error=true'
}));

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

app.listen(3001, () => {
  console.log('✅ Server kører på http://localhost:3001');
});

