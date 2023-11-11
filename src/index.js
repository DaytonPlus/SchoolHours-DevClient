'use strict'

import http from "http"
import httpErrors from "http-errors"
import morgan from "morgan"
import express from "express"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import routes from "./routes/router.js"
import connection from "./middleware/connection.js"
import buildCss from "./modules/buildcss.js"
import config from "../config.js"
import logger from "./logs/logger.js"


async function createServer() {

  const app = express()
  const server = http.createServer(app)
  const io = new Server(server)

  app.config = config
  app.logger = logger
  app.logger.logLevel = app.config.logLevel || 1

  app.buildCss = async () => {
    let bcss = await buildCss(app.config.stylesDir, app.config.buildsDir)
    if(bcss === "null") {
      app.logger.error("Error stylesDir or buildsDir not exists!")
      return false
    }
    else if(bcss) app.logger.warn("Build css error", bcss)
    else app.logger.info("Created styles build!")
    return true;
  }

  if (app.config.firstBuild) {
    await app.buildCss()
  }

  // app.use(morgan("dev"))

  app.set('views', "views")
  app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
      title: app.config.title,
      server_addr: `http://${app.config.backend.host || app.config.host || "0.0.0.0"}:${app.config.backend.port || app.config.port || 8001}`,
      //offline: app.config.offline
    }
  }));

  app.set('view engine', '.hbs')

  // app.enable('view cache')


  // Common middleware
  app.use(express.static("public"))

  routes(app)
  connection(io, app)

  server.listen(app.config.port, () => {
    app.logger.info(`Web in http://${app.config.host}:${app.config.port}/`)
  })
}


createServer()
