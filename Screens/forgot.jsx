import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import StandardTextInput from '../Components/StandardTextInput';
import Button from '../Components/Button';

import { FIREBASE_AUTH } from '../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const auth = FIREBASE_AUTH
export default function Forgot() {
    const [email, setEmail] = useState('');
    const handleForgotPassword = async() => {
        await sendPasswordResetEmail(auth, email)

            .then(() => {
                console.log("Password reset email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
            });
    }
    

    return (
        <View style={styles.container}>
            <Image style={{ width: '95%', height: 280 }} source={require('../assets/forgote.png')} />

            <Text style={styles.text}>Enter the email address you used when you</Text>
            <Text style={styles.text}>joined and we'll send you instructions to</Text>
            <Text style={styles.text}>reset your password.</Text>

            <View style={{ paddingVertical: 25 }}>

                <StandardTextInput label={"Email"} icon1={"email"} value={email} onChangeText={(e) => setEmail(e)} />
            </View>
            <View style={{ paddingVertical: 50 }}>
                <Button title={"Send Link"} onPress={handleForgotPassword} style={{ marginTop: 20 }} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    text: {
        color: '#B0ABAB',
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    },
});
