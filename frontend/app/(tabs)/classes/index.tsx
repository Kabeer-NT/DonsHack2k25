import { 
StyleSheet,
Image,
FlatList,
StatusBar,
Text,
TouchableOpacity, } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router'

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

// Current class data (TODO: move this to database)
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

export default function TabTwoScreen() {

const router = useRouter()
// TODO: create pop up from bottom with class info and option (similar to reddit)
const handleClassPress = (item: ClassData) => {
    router.push('/(tabs)/classes/class-page')
    console.log('Clicked class:', item.name); // temporary
};

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
    <ClassList data={DATA} onItemPress={handleClassPress} />

    <ThemedText type="subtitle">Interested</ThemedText>
    <ClassList data={EMPTY_DATA} onItemPress={handleClassPress} />

    {/* MY FRIEND'S CLASSES */}
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends' Classes</ThemedText>
    </ThemedView>
    {/* TODO: create vertical list for displaying friends */}

    {/* TODO: create double list for friend's interested/taking */}
    <ThemedText type="subtitle">Friend 1</ThemedText>
    <ClassList data={DATA} onItemPress={handleClassPress} />
    <ClassList data={DATA} onItemPress={handleClassPress} />

    <ThemedText type="subtitle">Friend 2</ThemedText>
    <ClassList data={DATA} onItemPress={handleClassPress} />
    <ClassList data={DATA} onItemPress={handleClassPress} />

    {/* TRENDING CLASSES */}
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Trending Classes</ThemedText>
    </ThemedView>
    {/* TODO: create vertical list for displaying all classes,
        and make it reusable for potential search results.
        (width of screen)
    */}

    <ClassList data={DATA} onItemPress={handleClassPress} />
    <ClassList data={DATA} onItemPress={handleClassPress} />
    <ClassList data={DATA} onItemPress={handleClassPress} />
    <ClassList data={DATA} onItemPress={handleClassPress} />
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
