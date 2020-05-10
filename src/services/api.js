import axios from 'axios';

let listChatbotUsers = async () => {
    try {
        return (await axios.get('/data/chatbotUsers.json')).data;
    } catch (err) {
        return;
    }
}

export {
    listChatbotUsers
}