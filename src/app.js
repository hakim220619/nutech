const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const routes = require("./routes/Routes");
const db = require("../src/config/db");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Session middleware
// Session middleware dengan variabel lingkungan
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret dari .env
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth
// Gunakan variabel lingkungan
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

// Serialize user information into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "src/public")));
app.use(
  "/assets/logo",
  express.static(path.join("D:", "data", "interview", "nusatech", "assets", "logo"))
);
app.use(
  "/assets",
  express.static(path.join("D:", "data", "interview", "nusatech", "assets"))
);

// OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// The callback after Google has authenticated the user
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.redirect("/dashboard");
  }
);

// Define the profile route
app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/"); // Redirect to home if user is not authenticated
    }
  
    // Serve the static dashboard HTML file after authentication
    res.sendFile(path.join(__dirname, "../src", "public", "dashboard.html"));
  });
  

// Use Routes
app.use("/", routes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
