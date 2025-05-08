import "../global.css";
import React, { useRef } from "react";
import { View, Text, Animated, PanResponder } from "react-native";
import { useDB } from "../database/Queries";

// type para los datos de la db
export type TaskType = {
  id: number;
  asignature_name: string;
  description: string;
  date: string;
};

// Interfaz para los props del componente
export interface TaskProps {
  asignature_name: string;
  description: string | null;
  date: string;
  id: number;
  reloadTasks: () => void;
}

export const TaskItem: React.FC<TaskProps> = ({
  asignature_name,
  description,
  date,
  id,
  reloadTasks,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const { removeTask } = useDB();
  const onSwipeRight = () => {
    removeTask(id);
    reloadTasks();
  };
  const onSwipeLeft = () => {
    //TODO edit task
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: translateX }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 200) {
          onSwipeRight();
        } else if (gesture.dx < -200) {
          onSwipeLeft();
        }
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
          friction: 10,
        }).start();
      },
    }),
  ).current;
  const taskDate = new Date(date);
  const today = new Date();
  const diffTime = taskDate.getTime() - today.getTime(); // `getTime()` para obtener milisegundos
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Diferencia en días

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{ transform: [{ translateX }] }}
      className="flex flex-row justify-between p-2"
    >
      <View className="flex-1 w-screen bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        <Text className="text-lg text-primary dark:text-secondary font-semibold p-2">
          {asignature_name}
        </Text>
        <Text className="text-sm text-black dark:text-gray-300 p-2">
          {description}
        </Text>
      </View>

      <View className="items-center justify-center" style={{ marginLeft: 20 }}>
        <Text className="text-xl text-primary dark:text-secondary font-bold">
          {diffDays} Dias
        </Text>
      </View>
    </Animated.View>
  );
};
