import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SelectorMateria from "../components/SelectorMateria";
import { useState } from "react";
import { ModalTextInput } from "../components/ModalTextInput";
import { useDB } from "../database/Queries";
import { router } from "expo-router";

export default function AddClassModal() {
  const [horaInicio, setHoraInicio] = useState<string | null>(null);
  const [horaFin, setHoraFin] = useState<string | null>(null);
  const { dia_id } = useLocalSearchParams();
  const { addClass } = useDB();
  const [asignatureid, setAsignatureid] = useState<string | null>("1");

  const handleSubmit = async () => {
    console.log("Asignature ID:", asignatureid);
    console.log("Hora de Inicio:", horaInicio);
    console.log("Hora de Fin:", horaFin);
    console.log("Dia ID:", dia_id);

    await addClass(asignatureid, horaInicio, horaFin, dia_id);
    router.back();
  };

  return (
    <SafeAreaView>
      <SelectorMateria
        asignatureid={asignatureid}
        setAsignatureid={setAsignatureid}
      />
      <ModalTextInput
        title="Hora de Inicio"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <ModalTextInput
        title="Hora de Fin"
        value={horaFin}
        onChangeText={setHoraFin}
      />
      <TouchableOpacity onPress={async () => handleSubmit()}>
        <Text>Agregar Clase</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
