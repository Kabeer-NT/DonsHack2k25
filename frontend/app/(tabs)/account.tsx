import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from 'expo-router'

import { useAuth } from "@clerk/clerk-expo";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol'; // temporary
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const DATA: ClassData[] = [
  {
      "id": "1",
      "class_id": "CS110",
      "name": "Intro to CS I",
      "professor": "Andrew Rothman",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "MW 4:45pm-6:25pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "2",
      "class_id": "CS110",
      "name": "Intro to CS I",
      "professor": "Andrew Rothman",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "MW 6:30pm-8:15pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "3",
      "class_id": "CS110",
      "name": "Intro to CS I",
      "professor": "Nancy Stevens",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "MW 11:15am-1:00pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "4",
      "class_id": "CS110",
      "name": "Intro to CS I",
      "professor": "Kelsey Urgo",
      "professor_image": "url",
      "location": "Lo Schiavo 307",
      "schedule": "TR 9:55am-11:40am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "5",
      "class_id": "CS110",
      "name": "Intro to CS I",
      "professor": "Julia Norfo",
      "professor_image": "url",
      "location": "Lo Schiavo G12",
      "schedule": "TR 2:40pm-4:25pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "6",
      "class_id": "CS111",
      "name": "Foundations of Program Design",
      "professor": "Edward Reese",
      "professor_image": "url",
      "location": "Lo Schiavo 307",
      "schedule": "MW 12:10pm-1:55pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "7",
      "class_id": "CS112",
      "name": "Intro to CS II",
      "professor": "Alark Joshi",
      "professor_image": "url",
      "location": "Lo Schiavo G12",
      "schedule": "TR 9:55am-11:40am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "8",
      "class_id": "CS221",
      "name": "C and Systems Programming",
      "professor": "Paul Haskell",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "MW 9:20am-11:05am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "9",
      "class_id": "CS221",
      "name": "C and Systems Programming",
      "professor": "Paul Haskell",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "MW 1:10pm-2:55pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "10",
      "class_id": "CS245",
      "name": "Data Structures and Algorithms",
      "professor": "David Guy Brizan",
      "professor_image": "url",
      "location": "Education 103",
      "schedule": "MWF 11:45am-12:50pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "11",
      "class_id": "CS256",
      "name": "Career Prep",
      "professor": "Jon Rahoi",
      "professor_image": "url",
      "location": "Lo Schiavo 307",
      "schedule": "R 6:30pm-8:15pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "12",
      "class_id": "CS272",
      "name": "Software Development",
      "professor": "Philip Peterson",
      "professor_image": "url",
      "location": "Harney 148",
      "schedule": "TR 8:00am-9:45am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "13",
      "class_id": "CS315",
      "name": "Computer Architecture",
      "professor": "Gregory Benson",
      "professor_image": "url",
      "location": "Lo Schiavo 307",
      "schedule": "TR 8:00am-9:45am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "14",
      "class_id": "CS345",
      "name": "Programming Language Paradigms",
      "professor": "Kristin Jones",
      "professor_image": "url",
      "location": "Education 103",
      "schedule": "MWF 9:15am-10:20am",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  },
  {
      "id": "15",
      "class_id": "CS490",
      "name": "Senior Team",
      "professor": "Paul Haskell",
      "professor_image": "url",
      "location": "Lone Mountain Main 350",
      "schedule": "MW 4:45pm-6:25pm",
      "students_taking": [],
      "students_interested": [],
      "num_students": 0
  }
]
const EMPTY_DATA: ClassData[] = []; // Used for testing no items to display message

// Structure of a class
type ClassData = {
  id: string;
  class_id: string;
  name: string;
  professor: string;
  professor_image: string;
  location: string;
  schedule: string;
  students_taking: [];
  students_interested: [];
  num_students: number;
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
        source={{uri: item.professor_image}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
        }}
      />
      <Text style={[text_style, {fontWeight: 'bold'}]}>{item.class_id}:</Text>
      <Text style={[text_style, {fontWeight: 'bold'}]}>{item.name}</Text>

      <Text style={text_style}>{item.professor}</Text>
      <Text style={text_style}>{item.schedule}</Text>
      <Text style={text_style}>{item.location}</Text>
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
      <View style={styles.friendContainer}>
        <ThemedText type="title">My Friends</ThemedText>
        <ClassList data={myFriendsData} onItemPress={handleClassPress} />
      </View>
      <View style={styles.friendContainer}>
        <ThemedText type="title">Add Friends</ThemedText>
        <ClassList data={notMyFriendsData} onItemPress={handleClassPress} />
        {/* TODO: add vertical scroll to see the bottom, or fit to screen */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
