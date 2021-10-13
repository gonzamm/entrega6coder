const socket = io();

socket.on("connection", (data)=>{
    console.log(data);
    socket.emit("msjCliente", "Hola Gonzalo")
})