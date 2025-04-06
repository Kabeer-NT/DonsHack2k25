import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { useRouter } from 'expo-router'

import { useAuth } from "@clerk/clerk-expo";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol'; // temporary
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const EMPTY_DATA: ClassData[] = []; // Used for testing no items to display message

// Structure of a class
type ClassData = {
  _id: string;
  clerk_id: string;
  username: string;
  pfp: string;
};

// Properties of a class
type ClassProps = {
  item: ClassData;
  onPress: () => void;
  item_style: {};
  text_style: {};
};

// Displaying a class
const Class = ({item, onPress, item_style, text_style}: ClassProps) => (
  <TouchableOpacity onPress={onPress} style={item_style}>
    <ThemedView style={item_style}>
      <Image
        source={{uri: item.pfp}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
        }}
      />
      <Text style={[text_style, {fontWeight: 'bold', textAlign: 'center'}]}>{item.username}</Text>
    </ThemedView>
  </TouchableOpacity>
);

// Displaying a list of classes
const ClassList = ({
  data,
  onItemPress,
}: {
  data: ClassData[];
  onItemPress: (item: ClassData) => void;
}) => (
  <SafeAreaProvider>
    <SafeAreaView>
      {data.length === 0 ? (
        <Text style={styles.message}>No items to display</Text>
      ) : (
        // Scrollable list of Classes
        <FlatList
          data={data}
          horizontal={true} // scroll horizontally instead of vertically
          renderItem={({item}) => (
            <Class
              item={item}
              onPress={() => onItemPress(item)}
              item_style={styles.item}
              text_style={styles.message}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  </SafeAreaProvider>
);

const myFriendsData = require('../public/MyFriends.json');
const notMyFriendsData = require('../public/NotMyFriends.json');

export default function AccountPage() {
  const router = useRouter()
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    // alert("Signing out");
    signOut
    router.replace('/(auth)')
  }

  const handleClassPress = (item: ClassData) => {
    console.log('Clicked class:', item.name); // temporary
  };

  return (
    <ScrollView style={styles.bigContainer}>
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
      <View style={styles.friendContainer}>
        <ThemedText type="title">My Friends</ThemedText>
        <ClassList data={myFriendsData} onItemPress={handleClassPress} />
      </View>
      <View style={styles.friendContainer}>
        <ThemedText type="title">Add Friends</ThemedText>
        <ClassList data={notMyFriendsData} onItemPress={handleClassPress} />
        {/* TODO: add vertical scroll to see the bottom, or fit to screen */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    marginBottom: 83,
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 18, // lowered so the cards don't fall out the bottom...
    backgroundColor: "#fff",
  },
  friendContainer: {
    flex: 1,
    // padding: 2,
    marginTop: 20,
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
  item: {
    padding: 8,
    margin: 4,
    backgroundColor: "cornflowerblue",
    borderRadius: 15,
    fontSize: 18,
  },
  message: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },
});
