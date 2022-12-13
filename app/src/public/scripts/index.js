const socket = io()

socket.emit('message','ignacio')

socket.on('para_uno', data => console.log(data))
socket.on('para_todos', data => console.log(data))