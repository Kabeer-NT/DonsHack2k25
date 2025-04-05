import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from 'expo-router'

import { useAuth } from "@clerk/clerk-expo";

export default function AccountPage() {
  const router = useRouter()
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    // alert("Signing out");
    signOut
    router.replace('/(auth)')
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/pfps/marioprofile.png")}
          style={styles.profileImage}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Mario</Text>
          <Text style={styles.label}>itsamemario</Text>
        </View>
      </View>
      <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignOut}
        >
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
      <View style={styles.divider} />
      <View style={styles.container}>
        {/* TODO: Display friends and suggested friends to add */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  profileContainer: {
    // flex: 1,
    padding: 24,
    // justifyContent: "flex-start",
    backgroundColor: "#fff",
    flexDirection: "row", // Makes the image and text horizontal
    // alignItems: "center", // Centers the text and image vertically
    // marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    // marginBottom: 4,
    color: "#222",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    // marginVertical: 4,
  },
  text: {

  },
  button: {
    // height: 50,
    borderRadius: 25,
    marginBottom: 15,
    justifyContent: 'center', 
    alignItems: 'center',     
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    // elevation: 5,
    backgroundColor: "cornflowerblue",
    padding: 10
  },
  buttonPressed: {
    backgroundColor: "darkslateblue", // slightly darker on press
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
});
