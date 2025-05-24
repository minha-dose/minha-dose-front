import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function About() {
    return (
        <View>
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <Link href="/about/bruno" push asChild>
                <Button title="Clique para ver sobre Bruno"></Button>
            </Link>
            <Link href="/about/douglas" push asChild>
                <Button title="Clique para ver sobre Douglas"></Button>
            </Link>
            <Link href="/about/emmanuel" push asChild>
                <Button title="Clique para ver sobre Emmanuel"></Button>
            </Link>
            <Link href="/about/isabela" push asChild>
                <Button title="Clique para ver sobre Isabela"></Button>
            </Link>
            <Link href="/about/joana" push asChild>
                <Button title="Clique para ver sobre Joana"></Button>
            </Link>
                        <Link href="/about/joyce" push asChild>
                <Button title="Clique para ver sobre Joyce"></Button>
            </Link>
            <Link href="/about/leonardo" push asChild>
                <Button title="Clique para ver sobre Leonardo"></Button>
            </Link>
        </View>
    );
}