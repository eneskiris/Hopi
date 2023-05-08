import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SignIn = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user).then(() => {
          console.log("Email sent");
        });
        addDoc(collection(db, "users"), {
          displayName: name,
          email: email,
          uid: user.uid,
          createdAt: serverTimestamp(),
        }).then((r) => console.log(r));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };

  const handleLogInButton = () => {
    // @ts-ignore
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Image
          source={require("../../assets/hopi_logo.png")}
          style={{ width: 110, height: 110 }}
        />
        <Text style={styles.topText}>Hopi'n seni cebinden tanır!</Text>
        <Text style={styles.topText2}>
          Hopi üyeliğin için kullanmak istediğin adı, email adresini ve paralonı
          aşağıdaki alanlara yazmalısın
        </Text>
      </View>
      <View style={styles.midArea}>
        <TextInput
          style={styles.input}
          placeholder="Ad"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Parola"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Devam et</Text>
        </Pressable>
        <Pressable onPress={handleLogInButton}>
          <Text style={styles.bottomText}>
            Zaten hesabın var mı ? Giriş Yap!
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topArea: {
    alignItems: "center",
  },
  topText: {
    fontWeight: "900",
    fontSize: 20,
    marginTop: 25,
  },
  topText2: {
    textAlign: "center",
    marginTop: 10,
  },
  midArea: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#C0BFC0",
    padding: 10,
    marginBottom: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#CF2C7C",
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
    width: "95%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomText: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});
