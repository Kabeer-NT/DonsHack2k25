import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

type Comment = {
  id: string;
  username: string;
  content: string;
  likes: number;
};

type Event = {
  id: string;
  username: string;
  eventName: string;
  content: string;
  likes: number;
  tags: string[];
  comments: Comment[];
};

const allEvents: Event[] = [
  {
    id: '1',
    username: 'user123',
    eventName: 'Campus Concert',
    content: 'Join us for a night of music with local bands! Free entry for all students. Food and drinks will be available for purchase.',
    likes: 42,
    tags: ['Music', 'Fun'],
    comments: [
      { id: '1', username: 'music_lover', content: "Can't wait for this! Who's performing?", likes: 5 },
      { id: '2', username: 'band_member', content: 'Our band will be there! Starts at 7pm.', likes: 12 },
    ],
  },
  {
    id: '2',
    username: 'study_group',
    eventName: 'Midterm Study Session',
    content: 'Collaborative study session for CS101 midterm. Bring your notes! We\'ll have tutors available to help with difficult concepts.',
    likes: 18,
    tags: ['Academic', 'Hard'],
    comments: [
      { id: '3', username: 'cs_student', content: 'Will you cover recursion?', likes: 3 },
      { id: '4', username: 'tutor_jane', content: 'Yes, we\'ll go over recursion and sorting algorithms', likes: 8 },
    ],
  },
  {
    id: '3',
    username: 'sports_club',
    eventName: 'Intramural Basketball',
    content: 'Sign up for the spring intramural basketball tournament. Teams of 5 needed. Registration closes Friday!',
    likes: 35,
    tags: ['Sports', 'Fun'],
    comments: [
      { id: '5', username: 'baller', content: 'Looking for a team!', likes: 2 },
      { id: '6', username: 'team_captain', content: 'We need one more player for our team', likes: 4 },
    ],
  },
];

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const [commentText, setCommentText] = useState('');
  const [events, setEvents] = useState<Event[]>(allEvents);

  const currentEvent = events.find(event => event.id === id);

  if (!currentEvent) {
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
        }
      >
        <ThemedView style={styles.notFoundContainer}>
          <ThemedText type="title">Event not found</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        username: 'current_user',
        content: commentText,
        likes: 0,
      };

      const updatedEvents = events.map(event => {
        if (event.id === id) {
          return {
            ...event,
            comments: [...event.comments, newComment],
          };
        }
        return event;
      });

      setEvents(updatedEvents);
      setCommentText('');
    }
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
      }
    >
      <ThemedView style={styles.eventContainer}>
        <ThemedText type="defaultSemiBold" style={styles.username}>
          @{currentEvent.username}
        </ThemedText>
        <ThemedText type="title" style={styles.eventTitle}>
          {currentEvent.eventName}
        </ThemedText>
        <ThemedText style={styles.content}>{currentEvent.content}</ThemedText>
        <View style={styles.tagsContainer}>
          {currentEvent.tags.map((tag, index) => (
            <ThemedView key={index} style={styles.tag}>
              <ThemedText style={styles.tagText}>{tag}</ThemedText>
            </ThemedView>
          ))}
        </View>
        <ThemedText style={styles.likes}>♥ {currentEvent.likes} likes</ThemedText>
      </ThemedView>

      <ThemedView style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddComment}
          disabled={!commentText.trim()}
        >
          <ThemedText
            style={[
              styles.submitButtonText,
              !commentText.trim() && styles.submitButtonDisabled,
            ]}
          >
            Post
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.commentsTitle}>
        Comments ({currentEvent.comments.length})
      </ThemedText>
      <View style={styles.commentsContainer}>
        {currentEvent.comments.map(comment => (
          <ThemedView key={comment.id} style={styles.comment}>
            <ThemedText type="defaultSemiBold">@{comment.username}</ThemedText>
            <ThemedText style={styles.commentContent}>{comment.content}</ThemedText>
            <ThemedText style={styles.commentLikes}>♥ {comment.likes}</ThemedText>
          </ThemedView>
        ))}
      </View>
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  eventContainer: {
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
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  submitButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  submitButtonDisabled: {
    color: '#C7C7CC',
  },
  commentsTitle: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  commentsContainer: {
    paddingBottom: 20,
  },
  comment: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  commentContent: {
    marginVertical: 8,
    lineHeight: 20,
  },
  commentLikes: {
    color: '#ff4757',
    textAlign: 'right',
  },
});