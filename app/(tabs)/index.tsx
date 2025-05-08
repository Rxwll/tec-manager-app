import "../../global.css";
import { useDB } from "../../database/Queries";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TaskItem, TaskType } from "../../components/TaskItem";

type ClassType = {
  id: number; // ID de la clase
  hora_inicio: string; // Ej: "09:00"
  hora_fin: string; // Ej: "10:30"
  dia_id: number; // Ej: 1 para Lunes
  materia: string; // Nombre de la asignatura
  color: string; // Color asociado a la asignatura
};
export default function Dashboard() {
  const { getNextClass, getTasks } = useDB();
  const now = new Date();
  const [nextClass, setNextClass] = React.useState<ClassType | null>(null);
  const [tasks, setTasks] = React.useState<TaskType[]>([]);
  // const dia = now.getDay();
  // const dia_id = dia === 0 ? 7 : dia;
  // const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  const dia_id = 1;
  const currentTime = "06:30"; // Para pruebas

  const loadTasks = async () => {
    const result = await getTasks();
    setTasks(result);
  };
  const loadNextClass = async () => {
    const result = await getNextClass(dia_id, currentTime);
    console.log(result);
    setNextClass(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadNextClass();
    }, []),
  );

  return (
    <View className="flex-1 dark:bg-neutral-800 bg-neutral-200">
      <View>
        <Text className="p-2 text-lg font-bold text-primary dark:text-secondary">
          Siguiente clase
        </Text>
        <View className="flex flex-row justify-between py-10 px-2 my-5 mx-10 rounded-lg bg-white">
          <Text className="text-gray-400 dark:text-neutral-400 font-semibold ">
            {nextClass?.materia}
          </Text>
          <Text className="text-gray-400 dark:text-neutral-400 font-semibold">
            14 : 00
          </Text>
        </View>
      </View>
      <View className="flex-1 w-full">
        <Text className="p-2 text-lg font-bold text-primary dark:text-secondary">
          Tareas Pendientes
        </Text>
        <SafeAreaView>
          <FlatList
            data={tasks}
            showsHorizontalScrollIndicator={false}
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
