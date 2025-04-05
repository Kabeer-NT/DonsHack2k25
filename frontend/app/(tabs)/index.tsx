import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

export default function Page() {
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.text}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text style={styles.text}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.text}>Sign up</Text>
        </Link>
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
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  }
})