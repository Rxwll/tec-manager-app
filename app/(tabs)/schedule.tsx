import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router, Stack } from "expo-router";
import { useDB } from "../../database/Queries";
import { useState } from "react";
import headerRight from "../../components/headerRight";
import "../../global.css";
import Clase from "../../components/Clase";

type DayType = {
  dia_id: number;
  nombre: string;
};

export default function Schedule() {
  const [days, setDays] = useState<DayType[]>([]);
  const { getDays } = useDB();

  const loadDays = async () => {
    const result = await getDays();
    setDays(result);
  };

  loadDays();
  return (
    <View className="flex-1  bg-neutral-200 dark:bg-neutral-800">
      <Stack.Screen
        options={{
          headerRight: () => headerRight("addAsignatureModal", "#ee5396"),
        }}
      />
      <View className="w-full">
        <SafeAreaView>
          <FlatList
            data={days}
            renderItem={({ item }) => (
              <View my-auto>
                <TouchableOpacity
                  className="px-4 pt-4 rounded-lg"
                  onPress={() =>
                    router.push({
                      pathname: "addClassModal",
                      params: { dia_id: item.dia_id },
                    })
                  }
                >
                  <Text className="text-lg font-bold text-primary dark:text-secondary">
                    {item.nombre}
                  </Text>
                </TouchableOpacity>
                <Clase dia_id={item.dia_id} />
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
