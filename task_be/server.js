const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("Web Socket Connected...");
	socket.on("message", (msg) => {
		setTimeout(() => {
			socket.emit("message", msg);
		}, 500);
	});
});

httpServer.listen(3001);
