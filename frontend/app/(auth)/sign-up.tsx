import * as React from 'react'
import { Text, TextInput, TouchableOpacity, Keyboard, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

const logo = require('@/assets/images/DonsHackLogo1.png');

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View>
        <Text style={styles.title}>Sign Up</Text>
      
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter a password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        
        <TextInput
          style={styles.input}
          value={confirmPassword}
          placeholder="Confirm your password"
          secureTextEntry={true}
          onChangeText={(password) => setConfirmPassword(password)}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={styles.signInLink}>Sign In</Text>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  signUpText: {
    fontSize: 14,
    //paddingTop:20,
  },
  signInLink: {
    fontSize: 14,
    color: 'cornflowerblue',
    fontWeight: '500',
  },
  logo: {
    width: 150,
    height: 75,
    //marginBottom: 20,
    
    resizeMode: 'contain',
  },
  logoContainer: {
    //position: 'absolute',
   // top: 40,
   // right: 20,
   // zIndex: 10,
   alignItems: 'center',
   marginLeft:40,
   marginRight:40,
height:90,
paddingLeft: 10,
  },
})