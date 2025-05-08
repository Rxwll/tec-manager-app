import { View, Animated, Text } from "react-native";
import { useCallback, useRef, useState } from "react";
import { useDB } from "../database/Queries";
import { useFocusEffect } from "@react-navigation/native";

type ClaseType = {
  nombre: string;
  hora_inicio: string;
  hora_fin: string;
  color: string;
};

type ClaseProps = {
  dia_id: number;
};

export default function Clase({ dia_id }: ClaseProps) {
  const [classes, setClasses] = useState<ClaseType[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { getClassesByDay } = useDB();

  const loadClasses = async () => {
    const result = await getClassesByDay(dia_id);
    setClasses(result);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      loadClasses();
    }, []),
  );

  if (classes.length === 0) {
    return (
      <View className="dark:bg-neutral-800 py-5">
        <Text className="text-sm text-gray-400 dark:text-neutral-400 font-semibold m-auto">
          No hay ninguna clase programada para este dia
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={classes}
        style={{ opacity: fadeAnim }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg p-10 w-full flex-1 ml-2">
            <Text style={{ color: item.color }} className="font-semibold">
              {item.nombre}
            </Text>
            <Text className="text-gray-500 dark:text-neutral-400">
              {item.hora_inicio} - {item.hora_fin}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
