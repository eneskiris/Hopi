import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation();
  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleSignIn = () => {
    // @ts-ignore
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Image
          source={require("../../assets/hopi_logo.png")}
          style={{ width: 110, height: 110 }}
        />
      </View>
      <View style={styles.midArea}>
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
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
        <Pressable onPress={handleSignIn}>
          <Text style={styles.bottomText}>Üye değil misiniz? Üye Olun.</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
