import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

export default function Page() {
  const { user } = useUser()

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome! Please sign in or sign up</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#0070f3' }]} onPress={() => {}}>
            <Link href="/(auth)/sign-in">
              <Text style={styles.buttonText}>Sign In</Text>
            </Link>
          </TouchableOpacity>

          <View style={styles.spacing} />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#00cc99' }]} onPress={() => {}}>
            <Link href="/(auth)/sign-up">
              <Text style={styles.buttonText}>Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
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
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
    justifyContent: 'center', 
    alignItems: 'center',     
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
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