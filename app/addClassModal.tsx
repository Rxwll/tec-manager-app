import { Button, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SelectorMateria from "../components/SelectorMateria";
import { useState } from "react";
import { useDB } from "../database/Queries";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const formatTwoDigits = (n: number) => n.toString().padStart(2, "0");
const formatHora = (date: Date) =>
  `${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}`;

export default function AddClassModal() {
  const [horaInicio, setHoraInicio] = useState<string | null>(null);
  const [horaFin, setHoraFin] = useState<string | null>(null);
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFin, setShowPickerFin] = useState(false);
  const { dia_id } = useLocalSearchParams();
  const { addClass } = useDB();
  const [asignatureid, setAsignatureid] = useState<string | null>("1");

  const onChangeInicio = (_event: any, selectedDate?: Date) => {
    setShowPickerInicio(false);
    if (selectedDate) {
      setHoraInicio(formatHora(selectedDate));
    }
  };

  const onChangeFin = (_event: any, selectedDate?: Date) => {
    setShowPickerFin(false);
    if (selectedDate) {
      setHoraFin(formatHora(selectedDate));
    }
  };
  const handleSubmit = async () => {
    await addClass(asignatureid, horaInicio, horaFin, dia_id);
    router.back();
  };

  return (
    <SafeAreaView>
      <SelectorMateria
        asignatureid={asignatureid}
        setAsignatureid={setAsignatureid}
      />
      <Button
        title="Seleccionar Hora de Inicio"
        onPress={() => setShowPickerInicio(true)}
      />
      {horaInicio && <Text>Hora de inicio: {horaInicio}</Text>}

      <Button
        title="Seleccionar Hora de Fin"
        onPress={() => setShowPickerFin(true)}
      />
      {horaFin && <Text>Hora de fin: {horaFin}</Text>}

      {showPickerInicio && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeInicio}
        />
      )}

      {showPickerFin && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeFin}
        />
      )}

      <TouchableOpacity onPress={async () => handleSubmit()}>
        <Text>Agregar Clase</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
