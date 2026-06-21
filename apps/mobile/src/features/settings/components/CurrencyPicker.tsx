import { Picker } from "@react-native-picker/picker";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencyPicker({
  value,
  onChange,
}: Props) {
  return (
    <Picker
      selectedValue={value}
      onValueChange={onChange}
    >
      <Picker.Item label="🇮🇳 INR" value="INR" />
      <Picker.Item label="🇺🇸 USD" value="USD" />
      <Picker.Item label="🇪🇺 EUR" value="EUR" />
      <Picker.Item label="🇬🇧 GBP" value="GBP" />
      <Picker.Item label="🇯🇵 JPY" value="JPY" />
    </Picker>
  );
}