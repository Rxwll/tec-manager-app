import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DBProvider } from "../database/";
import { StatusBar } from "expo-status-bar";
import { createDbIfNeeded } from "../database/createDbIfNeeded";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DBProvider databaseName="app.db" onInit={createDbIfNeeded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="addTaskModal"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="addAsignatureModal"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="editTaskModal"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="addClassModal"
            options={{ presentation: "modal" }}
          />
        </Stack>
        <StatusBar />
      </DBProvider>
    </GestureHandlerRootView>
  );
}
