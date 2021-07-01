package com.messaging.websocketsmessaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.messaging.websocketsmessaging.model.MessageModel;
import com.messaging.websocketsmessaging.storage.UserStorage;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessageTemplate;

    @MessageMapping("/chat/{to}")
    public void sendMessage(@DestinationVariable String to, MessageModel message) {
        System.out.println("handling send message is " + message + " to : " + to);
        boolean isExist = UserStorage.getInstance().getUsers().contains(to);
        if (isExist) {
            simpMessageTemplate.convertAndSend("/topic/messages/" + to, message);
        }
    }
}
