import { Stack } from 'expo-router';

export default function EventsRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="event-page" 
        options={{ 
          title: 'Event',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}