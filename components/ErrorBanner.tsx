import { Colors } from "@/constants/theme";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

type Props = {
  message: string;
};
export default function ErrorBanner({ message }: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "light" ? "light" : "dark"];
  return (
    <View
      style={[styles.banner, { backgroundColor: theme.errorBackground }]}
      accessibilityRole="alert"
    >
      <Text style={[styles.bannerText, { color: theme.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    textAlign: "left",
    alignItems: "center",
    borderRadius: 9,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "left",
  },
});
