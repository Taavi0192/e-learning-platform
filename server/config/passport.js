import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

// Local Strategy (Email/Password)
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Use email as the username field
    async (email, password, done) => {
      try {
        // Check if the user is a teacher or student
        let user = await Teacher.findOne({ email });
        if (!user) {
          user = await Student.findOne({ email });
        }

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;
        const role = profile._json.state; // Role passed from the frontend

        // Check if the user already exists
        let user = await Teacher.findOne({ email });
        if (!user) {
          user = await Student.findOne({ email });
        }

        if (!user) {
          // Create a new user based on the role
          if (role === "teacher") {
            user = await Teacher.create({
              googleId: id,
              username: displayName,
              email,
              role,
            });
          } else if (role === "student") {
            user = await Student.create({
              googleId: id,
              username: displayName,
              email,
              role,
            });
          }
        } else {
          // Update the user with Google ID if they already exist
          user.googleId = id;
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (data, done) => {
  try {
    let user;
    if (data.role === "teacher") {
      user = await Teacher.findById(data.id);
    } else if (data.role === "student") {
      user = await Student.findById(data.id);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});