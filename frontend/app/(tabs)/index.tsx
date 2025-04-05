import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

import { useAuth } from "@clerk/clerk-expo";

export default function Page() {
  const { user } = useUser()
  const router = useRouter()

  const { signOut } = useAuth();
  const handleSignOut = async () => {
    // alert("Signing out");
    signOut
    router.replace('/(auth)')
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        {/* <Text style={styles.text}>Hello {user?.emailAddresses[0].emailAddress}</Text> */}
        <Text style={styles.text}>Welcome to Socialite!</Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignOut}
        >
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
      </SignedIn>
      <SignedOut>
        {/* TODO redirect to login-page */}
      </SignedOut>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical centering
    alignItems: 'center',     // horizontal centering
    padding: 20,
     backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
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
    backgroundColor: "#E04343", // slightly darker on press
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  spacing: {
    marginVertical: 10,
  },
})