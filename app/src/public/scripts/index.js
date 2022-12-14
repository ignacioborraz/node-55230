const socket = io()

socket.emit('message','ignacio')

socket.on('para_uno', data => console.log(data))
socket.on('para_todos', data => console.log(data))


function captureData(event) {
    event.preventDefault()
    let data = document.querySelectorAll('.form-control')
    let values = {}
    data.forEach(e => values[e.name] = e.value)
}
document.querySelector('#send-product').addEventListener('click',captureData)