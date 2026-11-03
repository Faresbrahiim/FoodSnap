import { View, Text } from "react-native";

export default function Accueil() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF3E6",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#3A2418" }}>
        message
      </Text>
    </View>
  );
}