import { Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./theme/ThemeContext";

export default function Index() {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background, 
      }}
    >
      <Text style={{ color: theme.text }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}