import * as SQLite from "expo-sqlite";

export function useDB() {
  const db = SQLite.useSQLiteContext();

  const addTask = async (
    asignature_id: string,
    description: string,
    date: string,
  ) => {
    await db.runAsync(
      "INSERT INTO tasks (asignatureID, description, date) VALUES (?, ?, ?);",
      [asignature_id, description, date],
    );
  };

  const getTasks = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT tasks.id, asignatures.name AS asignature_name, tasks.description, tasks.date FROM tasks LEFT JOIN asignatures ON tasks.asignatureID = asignatures.id",
      );
      return result;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  };

  const removeTask = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM tasks WHERE id = ?;", [id]);
    } catch (error) {
      console.error("Error removing task:", error);
      throw error;
    }
  };

  const getAsignatures = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT id, name, color FROM asignatures;",
      );
      return result;
    } catch (error) {
      console.error("Error getting asignatures:", error);
      throw error;
    }
  };

  const getDays = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM dias;");
      return result;
    } catch (error) {
      console.error("Error getting days:", error);
      throw error;
    }
  };
  const getClassesByDay = async (day_id: number) => {
    try {
      const result = await db.getAllAsync(
        "SELECT asignatures.name AS nombre, clase.hora_inicio, clase.hora_fin, asignatures.color FROM clase JOIN asignatures ON clase.materia_id = asignatures.id WHERE clase.dia_id = ?;",
        [day_id],
      );
      return result;
    } catch (error) {
      console.error("Error getting classes by day:", error);
      throw error;
    }
  };

  const addAsignature = async (
    name: string,
    teacher_name: string,
    color: string,
  ) => {
    try {
      await db.runAsync(
        "INSERT INTO asignatures (name,teacher_name,color) VALUES (?,?,?);",
        [name, teacher_name, color],
      );
    } catch (error) {
      console.error("Error adding asignature:", error);
      throw error;
    }
  };
  const addClass = async (
    materia_id: string,
    hora_inicio: string,
    hora_fin: string,
    dia_id: string,
  ) => {
    try {
      await db.runAsync(
        "INSERT INTO clase (materia_id,hora_inicio,hora_fin,dia_id) VALUES (?,?,?,?);",
        [materia_id, hora_inicio, hora_fin, dia_id],
      );
      console.log("Class added successfully");
    } catch (error) {
      console.error("Error adding class:", error);
      throw error;
    }
  };
  return {
    addTask,
    getTasks,
    removeTask,
    getAsignatures,
    getDays,
    getClassesByDay,
    addAsignature,
    addClass,
  };
}
