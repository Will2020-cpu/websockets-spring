package com.messaging.websocketsmessaging.storage;

import java.util.*;

public class UserStorage {
    private static UserStorage instance;
    private Set<Map> users;

    private UserStorage() {
        users = new HashSet<>();
    }

    public static synchronized UserStorage getInstance() {
        if (instance == null) {
            instance = new UserStorage();
        }
        return instance;
    }

    public Set<Map> getUsers() {
        return users;
    }


    public boolean getValueFromKey(String username){
        boolean isExist = false;
        for (Map s: users){
            if(s.containsValue(username)){
                isExist = true;
            }
        }

        return isExist;
    }

    public void setUser(Map userName)  {
        users.add(userName);
    }
}
