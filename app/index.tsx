import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { useCards } from "@/domain/cards/CardsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";

// // @ts-ignore
// window.AsyncStorage = AsyncStorage;
// // @ts-ignore
// window.CardStorage = CardStorage;

// window.AsyncStorage = AsyncStorage;
// // @ts-ignore
// window.CardStorage = CardStorage;

// TODO: sort cards alphabetically (by title)
// TODO: delete and edit function

export default function IndexScreen() {
  const router = useRouter();
  const { cards, loaded } = useCards();
  const { settings } = useAccessibility();

  // Use motion setting from accessibility context
  const shouldAnimate = settings.motion !== "none";

  // Animation configurations based on accessibility settings
  const customFadeIn = shouldAnimate ? FadeIn : undefined;
  const customBounceIn = shouldAnimate ? BounceIn : undefined;
  const customFadeOut = shouldAnimate ? FadeOut : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cards</Text>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push("/settings")}
          accessibilityLabel="Settings"
          accessibilityHint="Open accessibility and app settings"
        >
          <MaterialIcons name="settings" size={24} color="#495057" />
        </Pressable>
      </View>

      {!loaded ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#28a745" />
          <Text style={styles.loadingText}>Loading your cards...</Text>
        </View>
      ) : cards.length === 0 ? (
        <Animated.View entering={customFadeIn} style={styles.emptyState}>
          <MaterialIcons name="note-add" size={48} color="#adb5bd" />
          <Text style={styles.emptyStateText}>
            No cards yet. Tap the + button to create your first card!
          </Text>
        </Animated.View>
      ) : (
        <FlatList
          data={cards ?? []}
          keyExtractor={(item) => String(item.id)} // it's a string, but to be safe
          renderItem={({ item }) => (
            <Animated.View entering={customFadeIn} exiting={customFadeOut}>
              <Pressable
                onPress={() => router.push(`/cards/${item.id}`)}
                style={styles.cardItem}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.source === "user" && (
                  <View style={styles.userCardBadge}>
                    <Text style={styles.userCardBadgeText}>Custom</Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          )}
        />
      )}

      {/* Add Card Button - Fixed at bottom right with animation */}
      <Animated.View
        entering={customBounceIn}
        style={styles.addButtonContainer}
      >
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/cards/create")}
          accessibilityLabel="Create new card"
          accessibilityHint="Opens the card creation form"
        >
          <MaterialIcons name="add" size={28} color="white" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: "relative",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  cardItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2c3e50",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
  },
  userCardBadge: {
    position: "absolute",
    right: 12,
    top: 12,
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  userCardBadgeText: {
    fontSize: 12,
    color: "#1976d2",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 16,
    maxWidth: 250,
  },
  addButtonContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#28a745",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

// ScrollView: (don't forget IMPORT!)
// export default function IndexScreen() {
//   const router = useRouter();
//   const { cards } = useCards();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text>Cards</Text>
//       {cards.map((card) => (
//         <Pressable
//           key={card.id}
//           onPress={() => router.push(`/cards/${card.id}`)}
//           style={{ paddingVertical: 12 }}
//         >
//           <Text style={{ fontSize: 18 }}>{card.title}</Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );
// }
