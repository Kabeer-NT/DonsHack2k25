import { 
StyleSheet,
Image,
FlatList,
StatusBar,
Text,
TouchableOpacity,
ActivityIndicator, } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router'
import React, { useState } from 'react';

// Structure of a class
type ClassData = {
id: string;
unique_class_id: string;
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

// Current class data (TODO: move this to database)
const EMPTY_DATA: ClassData[] = []; // Used for testing no items to display message

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
        keyExtractor={item => item.unique_class_id}
        />
    )}
    </SafeAreaView>
</SafeAreaProvider>
);

let myClassTaking: ClassData[] = [];
let myClassInterested: ClassData[] = [];

export default function TabTwoScreen() {
if (myClassTaking === null || myClassInterested === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;  // Loading state while fetching data
}

interface User {
    name: string;
    pfp: string;
    user_id: string;
}  

const router = useRouter()
// TODO: create pop up from bottom with class info and option (similar to reddit)
const handleClassPress = (item: ClassData) => {
    // router.push('/(tabs)/classes/class-page')
    router.push(`/(tabs)/classes/class-page?id=${item.unique_class_id}`);
    console.log('Clicked class:', item.name); // temporary
};

const classData = require('../../public/DonsHack.classes.json');
const myClassTakingData = require('../../public/MyClassesTaking.json');
const myClassInterestedData = require('../../public/MyClassesInterested.json');
// TODO: add friends stuff

return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    headerImage={
        <IconSymbol // TODO: Change header
        size={310}
        color="#808080"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.headerImage}
        />
    }>

    {/* MY CLASSES */}
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Classes</ThemedText>
    </ThemedView>

    <ThemedText type="subtitle">Taking</ThemedText>
    <ClassList data={myClassTakingData} onItemPress={handleClassPress} />

    <ThemedText type="subtitle">Interested</ThemedText>
    <ClassList data={myClassInterestedData} onItemPress={handleClassPress} />

    {/* MY FRIEND'S CLASSES */}
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends' Classes</ThemedText>
    </ThemedView>
    {/* TODO: create vertical list for displaying friends */}

    {/* TODO: create double list for friend's interested/taking */}
    <ThemedText type="subtitle">Friend 1</ThemedText>
    <ClassList data={EMPTY_DATA} onItemPress={handleClassPress} />
    <ClassList data={EMPTY_DATA} onItemPress={handleClassPress} />

    <ThemedText type="subtitle">Friend 2</ThemedText>
    <ClassList data={EMPTY_DATA} onItemPress={handleClassPress} />
    <ClassList data={EMPTY_DATA} onItemPress={handleClassPress} />

    {/* TRENDING CLASSES */}
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Trending Classes</ThemedText>
    </ThemedView>

    <FlatList
        data={classData}
        renderItem={({item}) => (
        <Class
            item={item}
            onPress={() => handleClassPress(item)}
            item_style={styles.item}
            text_style={styles.message}
        />
        )}
        keyExtractor={item => item.unique_class_id}
        scrollEnabled={false} // Disable scroll on FlatList to make ScrollView the main scroller
    />
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
});
