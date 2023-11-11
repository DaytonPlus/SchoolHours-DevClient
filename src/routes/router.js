export default (app, config) => {
  
  if (app.config.devMode) {
    app.get("*", async (req, res, next) => {
      await app.buildCss()
      next()
    })
  }

  app.get("/", (req, res) => {
    res.render("home", {
      offline: app.config.offline,
      navbar: true,
      home: true
    })
  })

  app.get("/profile", (req, res) => {
    res.render("profile", {
      offline: app.config.offline,
      navbar: true,
      profile: true
    })
  })

  app.get("/admin", (req, res) => {
    res.render("admin", {
      offline: app.config.offline,
      navbar: true,
      admin: true
    })
  })

  app.get("/hours", (req, res) => {
    res.render("hours", {
      offline: app.config.offline,
      navbar: true,
      hours: true
    })
  })

  app.get("/login", (req, res) => {
    res.render("login")
  })

  app.get("/logeout", (req, res) => {
    res.render("logeout")
  })

  app.get("/register", (req, res) => {
    res.render("register")
  })

  app.get("/about", (req, res) => {
    res.render("about")
  })

  app.get("/user", (req, res) => {
    res.locals.user = {
      name: "Dayton Plus"
    }
    res.render("user", {
      admin: "Sr. Server"
    })
  })

  app.get("/user/:id", (req, res) => {
    res.send(req.params.id)
  });

  app.get("/error", (req, res) => {
    if (req.query.msg) {
      res.render("error", {
        login: req.query.login || false, message: req.query.msg || "null"
      });
    } else {
      res.render("error", {
        login: false, message: "Not Errors"
      });
    }
  });

  app.use(function fourOhFourHandler (req, res, next) {
    res.render("404")
  })

  app.use(function fiveHundredHandler (err, req, res, next) {
    if (err.status >= 500) {
      console.error(err)
    }
    res.status(err.status || 500).render("error", {
      message: "Five Hundered Handler", description: JSON.stringify(error)})
  })

}
