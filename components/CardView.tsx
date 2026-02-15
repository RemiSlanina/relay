import { Card } from "@/domain/cards/Card";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { StyleSheet, Text, View } from "react-native";

export default function CardView({ card }: { card: Card }) {
  const { getDisclosureById } = useDisclosure();

  return (
    <View style={styles.cardView}>
      {/* <Text style={styles.cardTitle}>{card.title}</Text> */}
      {/* {card.disclosureIds ? (
        // <Text style={styles.cardContext}>{card.disclosureIds}</Text>
        
      ) : null} */}
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
            <Text key={index}>• {item}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: { backgroundColor: "#0e02021c", padding: 12 },
  cardTitle: {
    fontSize: 13,
    fontWeight: 500,
    padding: 12,
  },
  cardDisclosure: { fontSize: 16, fontWeight: 400, padding: 12 },
  cardMessage: {
    fontSize: 28,
    fontWeight: 300,
    padding: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  cardList: { fontSize: 16, fontWeight: 400, padding: 12 },
});
