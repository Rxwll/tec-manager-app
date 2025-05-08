import { Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ColorPicker, { Swatches } from "reanimated-color-picker";
import { runOnJS } from "react-native-reanimated";
import { useDB } from "../database/Queries";
import { useState } from "react";
import { ModalTextInput } from "../components/ModalTextInput";
import { router, Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function AddAsignatureModal() {
  const { colorScheme } = useColorScheme();
  const [asignatureName, setAsignatureName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [teacherName, setTeacherName] = useState("");
  const { addAsignature } = useDB();

  const onSelectColor = ({ hex }) => {
    "worklet";
    console.log(hex);
    runOnJS(setColor)(hex);
  };
  const handleSubmit = async () => {
    addAsignature(asignatureName, teacherName, color);
    console.log("Asignature added:", {
      name: asignatureName,
      teacher_name: teacherName,
      color: color,
    });
    router.back();
  };
  return (
    <ScrollView className="m-auto w-full flex-1 bg-neutral-200 dark:bg-neutral-800">
      <SafeAreaView className="flex-1 max-w-75 m-auto my-5 bg-neutral-200 dark:bg-neutral-800">
        <Stack.Screen
          options={{
            title: "Agregar Materia",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#161616" : "#ffffff",
            },
            headerTintColor: colorScheme === "dark" ? "#be95ff" : "#ee5396",
          }}
        />
        <View>
          <ModalTextInput
            value={asignatureName}
            onChangeText={setAsignatureName}
            title="Nombre de la materia"
          />
          <ModalTextInput
            value={teacherName}
            onChangeText={setTeacherName}
            title="Nombre del profesor"
          />
          <Text className="text-black dark:text-white font-semibold">
            Selecciona un color para la materia
          </Text>

          <View className="m-auto w-11/12 p-2">
            <ColorPicker value={color} onComplete={onSelectColor}>
              <Swatches swatchStyle={{ marginVertical: 5 }} />
            </ColorPicker>
          </View>

          <TouchableOpacity
            onPress={async () => handleSubmit()}
            className="bg-neutral-300 dark:bg-neutral-700 p-2 rounded-md m-2"
          >
            <Text>guardar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
