import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { getItemAsync } from "expo-secure-store";
import { Context } from "../../Context/context";


export default function AgroChat() {
  const [usersId, setUsersId] = useState(null);
  const [messages, setMessages] = useState([]);
  const agroId = "WplbkPDDv2XHb6R2cCYXqYm5peI2";
  
  const { darkmode } = useContext(Context);

  useEffect(() => {
   
    getItemAsync("userId")
      .then((data) => {
        setUsersId(data);
      })
      .catch((error) => {
        console.error("Error getting userId:", error);
      });

    
    const messagesRef = collection(FIREBASE_DB, 'chats/123456/messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

   
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          _id: doc.id,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Convert Firestore timestamp to JavaScript Date object
        };
      });
      setMessages(allMessages);
    });



    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = async (newMessages = []) => {
   
    const newMessage = {
      ...newMessages[0],
      senderId: agroId,
      receiverId: usersId,
      createdAt: serverTimestamp(),
    };

   
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );

    try {
      
      await addDoc(collection(FIREBASE_DB, 'chats/123456/messages'), {
        ...newMessage,
        createdAt: serverTimestamp(),
      });
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9" }}
    >

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: usersId,
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
     backgroundColor: "#4BA26A",

              },
            }}
          />
        )}
      />
    </View>
  );
}
