import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DUMMY_CARDS } from "../constants/cards";

export default function IndexScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Cards</Text>
      {DUMMY_CARDS.map((card) => (
        <Pressable
          key={card.id}
          onPress={() => router.push(`/card?id=${card.id}`)} //f.erouter.push("/card?id=finding-tickets-en")
          style={{ paddingVertical: 12 }}
        >
          <Text style={{ fontSize: 18 }}>{card.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {/* <Image
//           style={styles.tinyLogo}
//           source={require("../../assets/images/logo.svg")}
//         /> */}
//         {DUMMY_CARDS.map((card) => (
//           <Text key={card.id} style={styles.card}>
//             {card.title}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderBottomWidth: 1, borderColor: "#ccc" },
  // tinyLogo: {
  //   width: 50,
  //   height: 50,
  //   marginLeft: 12,
  //   marginTop: 6,
  //   opacity: 0.6,
  // },
});
