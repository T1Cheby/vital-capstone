const firebaseApp = require("../helper/firebaseApp");
const { getDatabase, ref, set, push, onValue, get} = require("firebase/database");
const db = getDatabase(firebaseApp);
const fileService = require("../services/fileService")


exports.generateChat = async (user1, user2) => {

    const chatRoomsReference = ref(db, 'chatRooms');
    //get data from chat collection
    const chatSnapshot = await get(chatRoomsReference);

    let roomExists = false;

    chatSnapshot.forEach((child) => {
        //get data from child component
        const roomData = child.val();
        const users = roomData.users;

        if (users.includes(user2) && users.includes(user1)) {
            roomExists = true;
            return;
        }
    });

    if (!roomExists) {
        //create reference for new child node and its unique ID
        const newRoomReference = push(chatRoomsReference);
        //set values for new node
        await set(newRoomReference, {
            users: [user1, user2],
            messages: []
        });
        return { message: "Create chat room successfully", chatRoomId: newRoomReference.key };
    } else {
        return { message: "Chat room between these users already exists" };
    }
};



exports.postMessage = async (chatRoomID, sender, message, filename) => {
    const messagesReference = ref(db, `chatRooms/${chatRoomID}/messages`);
    const newMessageRef = push(messagesReference);
    const currentTime = new Date().toISOString(); // Use ISO string for time
    if(!filename){
        await set(newMessageRef, {
            sender,
            message,
            time: currentTime
        });
    }else{
        // upload => firestore storagae => getURL => pass URL to set "firstly, allow to add 1 by one first"
        // rename -> timestamp + sender
        // allow the feature fo reply back message
        await set(newMessageRef, {
            sender,
            message,
            time: currentTime,
            path: filename
        });
    }

    console.log({ message: "Send message successfully" });
    return { message: "Message sent successfully" };
};

exports.fetchMessages = async (chatRoomID) => {
    const chatRoomsRef = ref(db, `chatRooms/${chatRoomID}/messages`);
    const snapshot = await get(chatRoomsRef);
    if (snapshot.exists()) {
        const messagesObj = snapshot.val();
        // Extract messages into an array
        const messages = await Promise.all(
            Object.keys(messagesObj).map(async key => {
                if (messagesObj[key].path) {
                    const { file } = await fileService.downloadFile({ name: messagesObj[key].path });
                    // console.log(file);
                    const { sender, time, message, path } = messagesObj[key];
                    const type = path.split(".")[1];
                    return { sender, time, message, file: {data: file, filetype: type} };
                } else {
                    return messagesObj[key];
                }
            })
        );
        console.log(messages);
        return { message: "Messages fetched successfully", messages };
    } else {
        console.log("No messages found");
        return { message: "No messages found" };
    }

};
