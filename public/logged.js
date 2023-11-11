var userdata = {};
try {
  userdata = JSON.parse(localStorage.getItem("userdata"));
}
catch(e) {}

if (!userdata) userdata = {};

function logged(cb) {
  let token = userdata.token;
  if (!token || token == "") return cb({
    message: "Acceso Denegado!"
  }, true);

  $.ajax({
    type: "POST",
    url: "http://localhost:8001/api/v1/users/check",
    data: JSON.stringify({
      token: token
    }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      if (res.message) {
        return cb({
          message: res.message, user: res.user
        }, false);
      } else {
        return cb( {
          message: "User logged, not message response", user: req.user
        }, false);
      }
    },
    error: function(res) {
      if (res.responseJSON.message) {
        return cb({
          message: res.responseJSON.message
        }, true);
      } else {
        return cb({
          message: "Error, not server response"
        }, true);
      }
    }
  });
}