import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function headerRight(modal: string, color: string) {
  return (
    <TouchableOpacity
      onPress={() => router.push(modal)}
      className="mr-5 p-2 rounded-full"
    >
      <MaterialIcons name="add" size={24} color={color} />
    </TouchableOpacity>
  );
}
