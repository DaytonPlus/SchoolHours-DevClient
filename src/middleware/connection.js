export default (io, app) => {
  io.on("connection", (socket) => {
    socket.on("initpage", (data) => {
      socket.emit("initpage", "Hello From Server")
    })
    app.logger.info("User connection: ", socket.id)
  })
}
