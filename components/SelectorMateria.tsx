import { View } from "react-native";
import { AsignatureType } from "../components/Asignature";
import { useDB } from "../database/Queries";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

type Props = {
  setAsignatureid: (id: string) => void;
  asignatureid: string | null;
};

export default function SelectorMateria({
  setAsignatureid,
  asignatureid,
}: Props) {
  const [asignatures, setAsignatures] = useState<AsignatureType[]>();
  const { getAsignatures } = useDB();

  const loadAsignatures = async () => {
    const asignatures = await getAsignatures();
    setAsignatures(asignatures);
  };

  useEffect(() => {
    loadAsignatures();
  }, []);
  return (
    <View>
      <Picker
        selectedValue={asignatureid}
        onValueChange={(itemValue, itemIndex) => setAsignatureid(itemValue)}
      >
        {asignatures?.map((asignature, index) => (
          <Picker.Item
            key={index}
            value={asignature.id}
            label={asignature.name}
          />
        ))}
      </Picker>
    </View>
  );
}
