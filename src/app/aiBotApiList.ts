export const aiBotApiList:{[index: string]:any}  = {
    "registerUser":{
        url:"/register/",
        method:"POST",
        params:["email", "company_name", "password2", "password", "company_logo"]
    },
    "login":{
        url:"/token/",
        method:"POST",
        params:["email", "password"]
    },
    "refreshToken":{
        url:"/token/refresh/",
        method:"POST",
        params:["refresh"]
    },
    "allBotInstance": {
        url: "/chat/show_all_bot_instances",
        method: "GET"
    },
    "createBotInstance": {
        url:"/chat/create_bot_instance_view",
        method:"POST",
        params:["bot_name", "bot_type"]
    },
    "forgotPassword": {
        url: "/chat/show_all_bot_instances",
        method: "POST",
        params: ["email"]
    },
    "listOfWorkspace":{
        url: "/chat/list_of_all_workspace_view",
        method: "GET"
    },

    //chat-api Start
    "agentWaitList": {
        url: "/chat/agent_waiting_list",
        method: "GET"
    },
    "agentChatList": {
        url: "/chat/agent_chat_list",
        method: "GET"
    },
    "connectAgentWithUser": {
        url: "/chat/connect_agent_with_user?conversation_id=",
        method: "GET"
    },
    "leaveAgentFromUser": {
        url: "/chat/leave_agent_from_user?conversation_id=",
        method: "GET"
    }

    //chat-api End

}