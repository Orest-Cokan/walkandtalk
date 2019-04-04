
// Notification tasks, not sure at the moment if socket.io is safe to use for prod
/*
const io = require("socket.io")(server);

const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
const sharedsession = require("express-socket.io-session");
 
// Attach session
app.use(session);
 
// Share session with io sockets
io.use(sharedsession(session));
const unreadNotifications = require("../config/notificationTasks/unreadNotifications");
io.on("connection", function(socket) {
    // Accept a login event with user's data
    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
        console.log('A client just joined on', socket);
        const unreadNotifs = new unreadNotifications(socket, userdata.email);
        unreadNotifs.runTask();
    });
    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
    });        
});

const upcomingEvent = require("../config/notificationTasks/upcomingEvent");
upcomingEvent.start();

 */