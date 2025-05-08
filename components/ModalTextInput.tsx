import { View, Text, TextInput } from "react-native";

interface ModalTextInputProps {
  value: string;
  title: string;
  onChangeText: (text: string) => void;
}

export const ModalTextInput: React.FC<ModalTextInputProps> = ({
  value,
  title,
  onChangeText,
}) => {
  return (
    <View>
      <Text className="text-black dark:text-white font-semibold">{title}</Text>
      <TextInput
        placeholder=""
        value={value}
        onChangeText={onChangeText}
        className="bg-white text-black p-2 my-2 rounded-lg"
      />
    </View>
  );
};
