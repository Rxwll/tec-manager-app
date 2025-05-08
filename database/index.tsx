import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { createDbIfNeeded } from "./createDbIfNeeded";
import { ReactNode } from "react";

export function DBProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName="app.db" onInit={createDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
}

export { useSQLiteContext };
