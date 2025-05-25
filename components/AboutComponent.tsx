import { globalStyles } from "@/styles/globalStyle";
import { View } from "react-native";

export default function AboutComponent({ children }: { children: React.ReactNode }) {
    return (
        <View style={globalStyles.about}>
            {children}
        </View>
    );
}