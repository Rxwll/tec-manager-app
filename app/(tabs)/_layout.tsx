import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const { setColorScheme, colorScheme } = useColorScheme();
  setColorScheme("light");
  const isDarkMode = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#161616" : "#ffffff",
        },
        tabBarActiveTintColor: isDarkMode ? "#be95ff" : "#ee5396",
        tabBarInactiveTintColor: isDarkMode ? "#696969" : "#a1a1a1",
        headerStyle: {
          backgroundColor: isDarkMode ? "#161616" : "#ffffff",
        },
        headerTintColor: isDarkMode ? "#be95ff" : "#ee5396",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: " Resumen ",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="home-filled"
              size={size}
              color={color}
              style={{
                transform: [{ translateY: focused ? 0 : 5 }],
              }}
            />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-primary dark:text-secondary text-xs font-semibold">
                Resumen
              </Text>
            ) : null,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Horario",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="schedule"
              size={size}
              color={color}
              style={{
                transform: [{ translateY: focused ? 0 : 5 }],
              }}
            />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-primary dark:text-secondary text-xs font-semibold">
                Horario
              </Text>
            ) : null,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tareas pendientes",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="task-alt"
              size={size}
              color={color}
              style={{
                transform: [{ translateY: focused ? 0 : 5 }],
              }}
            />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text className="text-primary dark:text-secondary text-xs font-semibold">
                Tareas
              </Text>
            ) : null,
        }}
      />
    </Tabs>
  );
}
