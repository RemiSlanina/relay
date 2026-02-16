import { Card } from "@/domain/cards/Card";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CardView({ card }: { card: Card }) {
  const { getDisclosureById } = useDisclosure();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.cardView}>
          {card.disclosureIds?.map((id) => {
            const disclosure = getDisclosureById(id);
            if (!disclosure) return null;
            return (
              <Text key={id} style={styles.cardDisclosure}>
                {disclosure.text}
              </Text>
            );
          })}
          <Text style={styles.cardMessage}>{card.message}</Text>
          {card.list && card.list.length > 0 ? (
            <View style={styles.cardList}>
              {card.list?.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // or your preferred background color
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardView: {
    width: "100%", // or a fixed width if you prefer
    backgroundColor: "#8181811c",
    padding: 20,
    borderRadius: 8,
    alignItems: "center", // center children horizontally
  },
  cardDisclosure: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 12,
    textAlign: "center",
  },
  cardMessage: {
    fontSize: 35,
    fontWeight: "300",
    marginVertical: 12,
    textAlign: "center",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: "#b6b6b6",
    paddingVertical: 12,
    width: "100%", // ensure the border spans the full width
  },
  cardList: {
    width: "100%",
    padding: 12,
  },
  listItem: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});
