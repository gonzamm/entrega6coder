const socket = io();

socket.on("render", (data)=>{
    console.log(data);
    renderTabla();
    renderChat();

})

function enviar_formulario(){
    /* Armando request para la funcion fetch */
    const url = '/api/products';
    let data = {
        titulo: document.getElementById('titulo').value,
        precio: document.getElementById('precio').value,
        thumbail: document.getElementById('thumbail').value
    }

    var request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    /* Funcion fetch para postear un nuevo pto */
    fetch(url, request)
        .then(function() {
            /* Todo OK renderizo la tabla para todos los clientes conectados y borro la info de los input */
            document.getElementById('titulo').value="";
            document.getElementById('precio').value="";
            document.getElementById('thumbail').value="";
            socket.emit("actualizacion");
    });
    

    return false;
 }

function renderTabla(){
    const tabla = document.getElementById('tBody');
    const url = '/api/products';

    /* Funcion fetch para traerme todos los productos mediante GET */
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${pto.titulo}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `$ ${pto.precio}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
      
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function renderChat(){
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    /* Funcion fetch para traerme el historial de chat mediante GET */
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
        tabla.innerHTML="";
        for (const chat of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="blue">${chat.user}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `<font color="brown">${chat.date}</font>`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.message}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function enviarChat(){
    /* Armando request para la funcion fetch */
    const url = '/api/chat';
    let data = {
        name: document.getElementById('name').value,
        msg: document.getElementById('msg').value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    /* Funcion fetch para postear un nuevo mensaje del chat */
    fetch(url, request)
        .then(function() {
            /* Todo OK renderizo la tabla para todos los clientes conectados y borro la info del input del mensaje */
            document.getElementById('msg').value = "";
            socket.emit("actualizacion");
    });

    return false;
}