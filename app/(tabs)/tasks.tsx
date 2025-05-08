import React, { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, View, Animated, Text } from "react-native";
import { Stack } from "expo-router";
import { useDB } from "../../database/Queries";
import { TaskItem, TaskType } from "../../components/TaskItem";
import headerRight from "../../components/headerRight";

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { getTasks } = useDB();

  const loadTasks = async () => {
    const result = await getTasks();
    setTasks(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, []),
  );

  if (tasks.length < 1) {
    return (
      <View className="flex-1 p-5 bg-neutral-200 dark:bg-neutral-800">
        <Stack.Screen
          options={{
            headerRight: () => headerRight("addTaskModal", "#ee5396"),
          }}
        />
        <Text className="text-gray-400 dark:text-neutral-400 font-semibold m-auto">
          Aun no tienes ninguna tarea pendiente :){" "}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-neutral-200 dark:bg-neutral-800">
      <Stack.Screen
        options={{
          headerRight: () => headerRight("addTaskModal", "#ee5396"),
        }}
      />

      <View className="flex-1 w-full">
        <SafeAreaView>
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={tasks}
            style={{ opacity: fadeAnim }}
            renderItem={({ item }) => (
              <TaskItem
                id={item.id}
                asignature_name={item.asignature_name}
                description={item.description}
                date={item.date}
                reloadTasks={loadTasks}
              />
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
