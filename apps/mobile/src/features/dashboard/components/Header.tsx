import { View, Text, StyleSheet } from "react-native";
import { Profile } from "../../settings/types/profile";
import { useTranslation } from "react-i18next";

type Props = {
  profile?: Profile;
};
export default function Header({ profile }: Props) {
  const { t } = useTranslation();
  console.log("Header Profile:", profile);
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 10,
  },

  greeting: {
    color: "#94A3B8",
    fontSize: 16,
  },

  name: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 6,
  },
});