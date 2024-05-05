import React, { useState, useEffect } from "react";
import { TouchableOpacity, View ,Image} from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
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
import { Ionicons } from "@expo/vector-icons";
export default function Chat() {
  const [usersId, setUsersId] = useState(null);
  const [messages, setMessages] = useState([]);
  const agroId = "WplbkPDDv2XHb6R2cCYXqYm5peI2";
  useEffect(() => {

    getItemAsync("userId")
      .then((data) => {
        setUsersId(data);
      })
      .catch((error) => {
        console.error("Error getting userId:", error);
      });
    const messagesRef = collection(FIREBASE_DB, "chats/123456/messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));


    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          _id: doc.id,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
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
      senderId: usersId,
      receiverId: agroId, 
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

    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: usersId,
        }}
        alwaysShowSend
        renderSend={props=>{
          return(
            <View style={{flexDirection:'row',alignItems:'center',height:50}}>
              <TouchableOpacity style={{marginRight:5}} onPress={()=>{
                alert('attach clicked')
              }}>
                <Image
                source={require('../../assets/attach.png')}
                style={{width:20,height:24}}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{marginRight:10}} onPress={()=>{
                alert('mic clicked')
              }}>
                <Image
                source={require('../../assets/mic.png')}
                style={{width:20,height:20}}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                source={require('../../assets/image.png')}
                style={{width:24,height:24}}
                />
              </TouchableOpacity>

              <Send {...props} containerStyle={{justifyContent:'center',marginLeft:15}}>
            
                <Ionicons name="send" size={26} color="#4BA26A" style={{width:24,marginRight:15}}/>
              </Send>
            </View>
          )
        }}

        renderInputToolbar={props=>{
          return(
           <InputToolbar {...props} containerStyle={{borderRadius:10}}>

           </InputToolbar>
          )
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
