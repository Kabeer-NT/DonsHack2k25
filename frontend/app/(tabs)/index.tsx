import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

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

type User = {

};
type Comment = {
  id: string;
  username: string;
  content: string;
  likes: number;
};

// Properties of an Event
type EventProps = {
  item: EventCard;
  onPress: () => void;
  item_style: {};
  text_style: {};
};

type EventCard = {
  _id: string;
  post_id: string;
  poster_id: string;
  poster_username: string;
  poster_pfp: string;
  title: string;
  content: string;
  tags: string[];
  people_going: User[];
  comments: Comment[];
};

const Event = ({item, onPress, item_style, text_style}: EventProps) => (
  <TouchableOpacity onPress={onPress} style={item_style}>
    <ThemedView style={item_style}>
      <Image
        source={{uri: item.poster_pfp}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
        }}
      />
      <Text style={[text_style, {fontWeight: 'bold'}]}>{item.poster_username}:</Text>
      <Text style={[text_style, {fontWeight: 'bold'}]}>{item.title}</Text>

      <Text style={text_style}>{item.content.slice(0,40)}...</Text>
      <View style={styles.divider} />
      <View style={styles.tagsContainer}>
        <Text style={text_style}>{item.tags}</Text>
        <Text style={text_style}>♥ 5 likes</Text>
      </View>
    </ThemedView>
  </TouchableOpacity>
);

// Displaying a list of events
const EventList = ({
  data,
  onItemPress,
}: {
  data: EventCard[];
  onItemPress: (item: EventCard) => void;
}) => (
  <SafeAreaProvider>
    <SafeAreaView>
      {data.length === 0 ? (
        <Text style={styles.message}>No items to display</Text>
      ) : (
        // Scrollable list of events
        <FlatList
          data={data}
          horizontal={true} // scroll horizontally instead of vertically
          renderItem={({item}) => (
            <Event
              item={item}
              onPress={() => onItemPress(item)}
              item_style={styles.item}
              text_style={styles.message}
            />
          )}
          keyExtractor={item => item.post_id}
        />
      )}
    </SafeAreaView>
  </SafeAreaProvider>
);

let myClassTaking: ClassData[] = [];

const fetchDataBeforeRender = async () => {
  try {
    const response = await fetch('http://10.0.0.111:8080/get-my-class-taking-list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log()
    myClassTaking = result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call fetchDataBeforeRender outside of the component before rendering
fetchDataBeforeRender();



const myEventsData = require('../public/MyEvents.json');
const myPostsData = require('../public/MyPosts.json');
const myClassesData = require('../public/MyClassesTaking.json');
const myFriendsActivityData = require('../public/MyFriendsActivity.json');


export default function Page() {
  if (myClassTaking === null) {
      return <ActivityIndicator size="large" color="#0000ff" />;  // Loading state while fetching data
  }

  const handleClassPress = (item: ClassData) => {
    const router = useRouter()
    router.push(`/(tabs)/classes/class-page?id=${item.class_id}`);
  };
  const handleEventPress = (item: EventCard) => {
    const router = useRouter()
    router.push(`/(tabs)/events/event-page?id=${item.post_id}`);
  };

  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={
            <IconSymbol
              size={310}
              color="#808080"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.headerImage}
            />
          }>
      <ThemedText type="title">My Activity</ThemedText>
      <Collapsible title="">
        <ThemedText type="subtitle">My Events</ThemedText>
        <Collapsible title="">
          <EventList data={myEventsData} onItemPress={handleEventPress} />
        </Collapsible>

        <View style={styles.divider} />

        <ThemedText type="subtitle">My Posts</ThemedText>
        <Collapsible title="">
          <ClassList data={myPostsData} onItemPress={handleClassPress} />
        </Collapsible>

        <View style={styles.divider} />


        <ThemedText type="subtitle">My Classes</ThemedText>
        <Collapsible title="">
          <ClassList data={myClassesData} onItemPress={handleClassPress} />
        </Collapsible>

        <View style={styles.divider} />

      </Collapsible>
    
      <View>
        <ThemedText type="title">My Friend's Activity</ThemedText>
        <FlatList
          data={myFriendsActivityData}
          renderItem={({item}) => (
            <Class
              item={item}
              onPress={() => handleClassPress(item)}
              item_style={styles.item}
              text_style={styles.message}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.flatList}  // Make sure the FlatList has a height
          scrollEnabled={false} // Disable scroll on FlatList to make ScrollView the main scroller
        />
      </View>

      <View style={styles.container}>
        <ThemedText type="title">You're up to date!</ThemedText>
        <View style={styles.container}>
          <Text style={styles.message}>maybe go touch some grass...</Text>
        </View>
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 75,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    top: 225,
    alignSelf: 'center',
    paddingLeft:10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 17,
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
  flatList: {
    // height: 200,  // Define a height to prevent FlatList from expanding too much
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: "black",
    marginVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
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
  eventsContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  username: {
    marginBottom: 8,
  },
  likes: {
    color: '#ff4757',
    textAlign: 'right', 
    marginTop: 8, 
  },
  eventTitle: {
    marginBottom: 12,
    fontSize: 20,
  },
  content: {
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
})
