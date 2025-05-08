import { SQLiteDatabase } from "expo-sqlite";

export const createDbIfNeeded = async (db: SQLiteDatabase) => {
  const dias = [
    { dia_id: 1, nombre: "Lunes" },
    { dia_id: 2, nombre: "Martes" },
    { dia_id: 3, nombre: "Miércoles" },
    { dia_id: 4, nombre: "Jueves" },
    { dia_id: 5, nombre: "Viernes" },
    { dia_id: 6, nombre: "Sábado" },
    { dia_id: 7, nombre: "Domingo" },
  ];
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS asignatures (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, teacher_name TEXT NOT NULL, color TEXT NOT NULL);",
  );
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, asignatureID INTEGER, description TEXT, date TEXT NOT NULL, FOREIGN KEY (asignatureID) REFERENCES asignatures(id) ON DELETE CASCADE);",
  );
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS dias (dia_id INTEGER PRIMARY KEY, nombre TEXT NOT NULL);",
  );
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS clase(id INTEGER PRIMARY KEY, materia_id INTEGER NOT NULL, hora_inicio TEXT NOT NULL, hora_fin TEXT NOT NULL, dia_id INTEGER NOT NULL, FOREIGN KEY (dia_id) REFERENCES dias(dia_id), FOREIGN KEY (materia_id) REFERENCES asignatures(id) ON DELETE CASCADE);",
  );
  dias.map(async (dia) => {
    await db.execAsync(
      `INSERT OR IGNORE INTO dias (dia_id, nombre) VALUES (${dia.dia_id}, '${dia.nombre}');`,
    );
  });
};
