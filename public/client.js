(() => {
  const socket = io();
  let reload = false;

  socket.on('connect', () => {
    socket.emit("initpage", {
      url: window.location
    });
    if (reload) window.location.href = window.location.href;
  });

  socket.on('disconnect',
    () => {
      console.log('Disconnected from server');
      document.body.innerHTML = `<div class="full-screen-msg"><div class="msg-error">Desconectado</div></div>`;
      reload = true;
    });

  socket.on('reconnect',
    () => {
      console.log('Reconnected to server');
      document.body.innerHTML = `<div class="full-screen-msg"><div class="msg-error">Reconectando</div></div>`;
      //reload = true;
    });

  socket.on("initpage",
    (data) => {
      reload = false;
    });
})();
