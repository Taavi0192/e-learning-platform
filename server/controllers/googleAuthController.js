import passport from "passport";

// Google OAuth login
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth callback
export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return res.redirect("/login");
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (user.role === "teacher") {
        return res.redirect("/teacher-dashboard");
      } else if (user.role === "student") {
        return res.redirect("/student-dashboard");
      }
    });
  })(req, res, next);
};

// Logout
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/");
  });
};