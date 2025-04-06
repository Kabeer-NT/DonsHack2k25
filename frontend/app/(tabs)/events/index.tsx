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

type EventCard = {
  id: string;
  username: string;
  eventName: string;
  content: string;
  likes: number;
  tags: EventTag[];
}

const sampleEvents: EventCard[] = [
  {
    id: '1',
    username: 'user123',
    eventName: 'Campus Concert',
    content: 'Join us for a night of music with local bands! Free entry for all students. Food and drinks will be available for purchase.',
    likes: 42,
    tags: [EventTag.Music, EventTag.Fun]
  },
  {
    id: '2',
    username: 'study_group',
    eventName: 'Midterm Study Session',
    content: 'Collaborative study session for CS101 midterm. Bring your notes! We\'ll have tutors available to help with difficult concepts.',
    likes: 18,
    tags: [EventTag.Academic, EventTag.Hard]
  },
  {
    id: '3',
    username: 'sports_club',
    eventName: 'Intramural Basketball',
    content: 'Sign up for the spring intramural basketball tournament. Teams of 5 needed. Registration closes Friday!',
    likes: 35,
    tags: [EventTag.Sports, EventTag.Fun]
  },
];

const EventCardComponent = ({ event }: { event: EventCard }) => {
    const router = useRouter()
  const handlePress = () => {
    // routes user to the page of event they have clicked on
    // (includes back button in top left corner)
    router.push('/(tabs)/events/event-page')
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.username}>@{event.username}</ThemedText>
        <ThemedText type="title" style={styles.eventTitle}>{event.eventName}</ThemedText>
        <ThemedText style={styles.content}>{event.content}</ThemedText>
        <View style={styles.tagsContainer}>
          {event.tags.map((tag, index) => (
            <ThemedView key={index} style={styles.tag}>
              <ThemedText style={styles.tagText}>{tag}</ThemedText>
            </ThemedView>
          ))}
        </View>
        <ThemedText style={styles.likes}>♥ {event.likes} likes</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

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
        {sampleEvents.map(event => (
          <EventCardComponent key={event.id} event={event} />
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