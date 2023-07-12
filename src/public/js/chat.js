const socket = io();
const chatbox = document.getElementById('chatbox');
const messageLog = document.getElementById('messageLog');
const userName = document.getElementById('chat-username');

const user = userName.innerHTML;

socket.emit('authenticated', user);

chatbox.addEventListener('keyup', (event) => {
    
    if (event.key === "Enter"){
        
        if (chatbox.value.trim().length > 0){

            newEntry = {
                username: user,
                message: chatbox.value.trim()
            };

            socket.emit('newMessage', newEntry);
            
            chatbox.value = "";
        
        };

    };

});

socket.on('messageLog', (messageHistory) => {

    let messages = "";

    messageHistory.forEach(message => {

        messages += `${message.username}: ${message.message}<br>`;

    });

    messageLog.innerHTML = messages;

});

socket.on('newUserConnected', (data) => {
    
    if (!user) return;

    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'Success'
    });

});