const url = 'http://localhost:8080';
let stompClient;
let selectedUser;
let newMessages = new Map();

function connectToChat(userName) {
    console.log("Connecting to chat");
    let socket = new SockJS(url + '/chat/');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("Conectado al " + frame);
        stompClient.subscribe("/topic/messages/" + userName, function (response) {
            let data = JSON.parse(response.body);
            if(selectUser === data.fromLogin){
                render(data.message,data.fromLogin);
            }else{
                newMessages.set(data.fromLogin,data.message);
                $('#userNameAppender_' + data.fromLogin).append('<span id="newMessage_' + data.fromLogin + '" style="color: red">+1</span>');
            }
        });
    });
}


function sendMsg(from, text) {
    stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
        fromLogin: from,
        message: text
    }));
}

function selectUser(userName) {
    console.log("selecting users: " + userName);
    selectedUser = userName;
    let isNew = document.getElementById("newMessage_" + userName) !== null;
    if (isNew) {
        let element = document.getElementById("newMessage_" + userName);
        element.parentNode.removeChild(element);
        render(newMessages.get(userName), userName);
    }
    $('#selectedUserId').html('');
    $('#selectedUserId').append('Chat with ' + userName);
}


function registration() {
    let userName = document.getElementById("userName").value;
    $.get(url + "/registration/" + userName, function (response) {
        connectToChat(userName);

    }).fail(function (error) {
        if (error.status === 400) {
            alert("Ya se inicio sesion");
        }
    });
}

function fetchAll() {
    $.get(url + "/fetchAllUsers", function (response) {
        let users = response;
        let usersTemplateHTML = "";
        for (let i = 0; i < users.length; i++) {
            usersTemplateHTML = usersTemplateHTML + 
            '<a href="#" onclick="selectUser(\'' + users[i] + '\')"><li class="clearfix">\n' +
            '                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" width="55px" height="55px" alt="avatar" />\n' +
            '                <div class="about">\n' +
            '                    <div id="userNameAppender_' + users[i] + '" class="name">' + users[i] + '</div>\n' +
            '                    <div class="status">\n' +
            '                        <i class="fa fa-circle offline"></i>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </li></a>'
        }
        $('#usersList').html(usersTemplateHTML);

    });
}