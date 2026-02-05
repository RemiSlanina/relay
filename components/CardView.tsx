import { StyleSheet, Text, View } from "react-native";

type Card = {
  title: string;
  context?: string;
  message: string;
  list?: string[];
};

export default function CardView({ card }: { card: Card }) {
  return (
    <View style={styles.cardView}>
      {/* <Text style={styles.cardTitle}>{card.title}</Text> */}
      {card.context ? (
        <Text style={styles.cardContext}>{card.context}</Text>
      ) : null}
      <Text style={styles.cardMessage}>{card.message}</Text>

      {card.list && card.list.length > 0 ? (
        <View style={styles.cardList}>
          {card.list?.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))}
        </View>
      ) : null}
    </View>

    //   <Text key={card.id} style={styles.heading}>
    //     {card.title}
    //     {card.context}
    //     {card.message}
    //    {card.list}
    //   </Text>
    //   ))}
    // </View>
  );
}

const styles = StyleSheet.create({
  cardView: { backgroundColor: "#0e02021c", padding: 12 },
  cardTitle: {
    fontSize: 13,
    fontWeight: 500,
    padding: 12,
  },
  cardContext: { fontSize: 16, fontWeight: 400, padding: 12 },
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
