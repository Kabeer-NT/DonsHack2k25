import { StyleSheet, ScrollView, View, Alert, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router'

enum EventTag {
  Fun = 'Fun',
  Hard = 'Hard',
  Music = 'Music',
  Sports = 'Sports',
  Academic = 'Academic',
  Social = 'Social',
  Other = 'Other'
}

type User = {

};
type Comment = {
  id: string;
  username: string;
  content: string;
  likes: number;
};
// type EventCard = {
//   id: string;
//   username: string;
//   eventName: string;
//   content: string;
//   likes: number;
//   tags: EventTag[];
// }
type EventCard = {
  _id: string;
  post_id: string;
  poster_id: string;
  poster_username: string;
  poster_pfp: string;
  title: string;
  content: string;
  tags: EventTag[];
  people_going: User[];
  comments: Comment[];
}

const EventCardComponent = ({ event }: { event: EventCard }) => {
    const router = useRouter()
  const handlePress = () => {
    // routes user to the page of event they have clicked on
    // (includes back button in top left corner)
    router.push(`/(tabs)/events/event-page?id=${event.post_id}`);
  };
  

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.username}>@{event.poster_username}</ThemedText>
        <ThemedText type="title" style={styles.eventTitle}>{event.title}</ThemedText>
        <ThemedText style={styles.content}>{event.content}</ThemedText>
        <View style={styles.tagsContainer}>
          {event.tags.map((tag, index) => (
            <ThemedView key={index} style={styles.tag}>
              <ThemedText style={styles.tagText}>{tag}</ThemedText>
            </ThemedView>
          ))}
        </View>
        {/* <ThemedText style={styles.likes}>♥ {event.likes} likes</ThemedText> */}
        <ThemedText style={styles.likes}>♥ 5 likes</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const eventsData:EventCard[] = require('../../public/DonsHack.events.json');

export default function TabFourScreen() {
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Events</ThemedText>
      </ThemedView>
      
      <ScrollView contentContainerStyle={styles.eventsContainer}>
        {eventsData.map(event => (
          <EventCardComponent key={event.post_id} event={event} />
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
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
});