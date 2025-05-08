import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useDB } from "../database/Queries";
import { useColorScheme } from "nativewind";
import { ModalTextInput } from "../components/ModalTextInput";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";
import SelectorMateria from "../components/SelectorMateria";
export default function AddTaskModal() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const defaultClassNames = useDefaultClassNames();
  const [desc, setDesc] = useState("");
  const [asignatureid, setAsignatureid] = useState<string | null>("1");
  const [selected, setSelected] = useState<DateType>();
  const { addTask } = useDB();

  const handleSubmit = async () => {
    if (!selected || !asignatureid || !desc.trim()) {
      alert("Completa todos los campos.");
      return;
    }
    addTask(asignatureid, desc.trim(), selected.toString());
    router.back();
  };
  return (
    <ScrollView>
      <SafeAreaView className="bg-neutral-200 dark:bg-neutral-800 flex-1">
        <Stack.Screen
          options={{
            title: "Agregar Tarea",
            headerStyle: {
              backgroundColor: isDarkMode ? "#161616" : "#ffffff",
            },
            headerTintColor: isDarkMode ? "#be95ff" : "#ee5396",
          }}
        />
        <View className="max-w-70 m-auto">
          <SelectorMateria
            asignatureid={asignatureid}
            setAsignatureid={setAsignatureid}
          />
          <ModalTextInput
            title="Descripcion"
            value={desc}
            onChangeText={setDesc}
          />
          <DateTimePicker
            mode="single"
            date={selected}
            onChange={({ date }) => setSelected(date)}
            minDate={new Date()}
            className="p-2 my-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
            classNames={{
              ...defaultClassNames,
              weekday_label: "text-black dark:text-gray-300", // Change the color of the day labels
              year_selector_label: "text-black dark:text-gray-300", // Change the color of the year label
              month_selector_label: "text-black dark:text-gray-300", // Change the color of the month label
              day_label: "text-black dark:text-gray-300", // Change the color of the day labels
              today: "rounded-lg border-2 border-primary dark:border-secondary", // Add a border to today's date
              selected: "bg-primary dark:bg-secondary rounded-lg", // Highlight the selected day
              selected_label: "text-white", // Highlight the selected day label
              day: `${defaultClassNames.day}`, // Change background color on hover
              disabled: "opacity-30", // Make disabled dates appear more faded
            }}
          />
          <TouchableOpacity
            onPress={async () => handleSubmit()}
            className="bg-white p-3 my-2 rounded-lg"
          >
            <Text className="font-semibold">Guardar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
