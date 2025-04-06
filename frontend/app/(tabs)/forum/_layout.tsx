import { Stack } from 'expo-router';

export default function ForumRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="forum-page" 
        options={{ 
          title: 'Forum',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}