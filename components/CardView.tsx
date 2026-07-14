import {
  BorderRadius,
  Colors,
  palette,
  Spacing,
  Typography,
} from "@/constants/theme";
import { Card } from "@/domain/cards/Card";
import { useCards } from "@/domain/cards/CardsContext";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

export default function CardView({ card }: { card: Card }) {
  const { deleteCard, updateCard } = useCards();
  const { getDisclosureById } = useDisclosure();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  // Accessibility: Adjust font sizes based on user preferences
  const getAccessibleFontSize = (baseSize: number) => {
    // This could be enhanced with actual font scaling based on user settings
    return baseSize;
  };

  function handleDeleteCard() {
    console.log("handleDeleteCard called");
    if (Platform.OS === "web") {
      if (window.confirm("Delete card?")) {
        console.log("Deleting: ", card.id);
        deleteCard(card.id);
        console.log("Delete function called.");

        router.back();
      }
    } else {
      Alert.alert(
        "Delete this card?",
        "Are you sure? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              console.log("Deleting: ", card.id);
              deleteCard(card.id);
              console.log("Delete function called.");

              router.back();
            },
          },
        ],
      );
    }

    // deleteCard(card.id);
    // router.push("/");
  }

  function handleEditCard() {
    console.log("handleEditCard called");
    router.push(`/cards/edit/${card.id}`);
    // updateCard(card); // actually, not yet...
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      accessible={true}
      accessibilityLabel="Communication card view"
    >
      <ScrollView
        style={[styles.cardContainer, { backgroundColor: theme.surface }]}
        contentContainerStyle={[
          styles.scrollContainer,
          { justifyContent: "flex-start" },
        ]}
        accessible={true}
        accessibilityLabel={`Card: ${card.title || "Untitled"}`}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Disclosures section - centered but with proper spacing */}
        {card.disclosureIds?.map((id) => {
          const disclosure = getDisclosureById(id);
          if (!disclosure) return null;
          return (
            <Text
              key={id}
              style={[styles.cardDisclosure, { color: theme.textSecondary }]}
              accessible={true}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
              numberOfLines={0}
            >
              {disclosure.text}
            </Text>
          );
        })}

        {/* Main message - the focal point */}
        {/* style={[styles.cardContainer, { backgroundColor: theme.surface }]} */}
        <View
          style={[styles.messageContainer, { justifyContent: "center" }]}
          accessible={true}
          accessibilityLabel="Main message"
        >
          <Text
            style={[
              styles.cardMessage,
              {
                color: theme.text,
                fontSize: getAccessibleFontSize(Typography.xxl),
              },
            ]}
            accessible={true}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
            allowFontScaling={true}
            numberOfLines={0}
          >
            {card.message}
          </Text>
        </View>

        {/* List items if they exist */}
        {card.list && card.list.length > 0 && (
          <View
            style={styles.cardList}
            accessible={true}
            accessibilityLabel="Additional information list"
          >
            {card.list?.map((item, index) => (
              <Text
                key={index}
                style={[styles.listItem, { color: theme.text }]}
                accessible={true}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
                numberOfLines={0}
              >
                • {item}
              </Text>
            ))}
          </View>
        )}

        {/* Add some spacing at the bottom for better scroll experience */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
      {/* Edit and Delete Bttns */}
      <View>
        <Animated.View entering={BounceIn} style={styles.buttonContainer}>
          <Pressable
            style={[styles.crudButton, { backgroundColor: theme.primary }]}
            onPress={handleEditCard}
            accessibilityLabel="Edit card"
            accessibilityHint="Opens the edit card section"
          >
            {/* <Text>Edit</Text> */}
            <MaterialIcons name="mode-edit" size={28} color={theme.surface} />
          </Pressable>

          <Pressable
            style={[styles.crudButton, { backgroundColor: theme.warning }]}
            onPress={() => handleDeleteCard()}
            accessibilityLabel="Delete card"
            accessibilityHint="Deletes the card"
          >
            {/* <Text>Delete</Text> */}
            <MaterialIcons
              name="delete-forever"
              size={28}
              color={theme.surface}
            />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    // Use padding instead of centering everything - gives better visual anchor
  },
  cardContainer: {
    flex: 1,
    maxWidth: 600, // Prevent cards from being too wide on large screens
    width: "100%",
    alignSelf: "center", // Center the card container, but not its contents
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // justifyContent moved to contentContainerStyle
  },
  cardDisclosure: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    marginBottom: Spacing.sm,
    textAlign: "center",
    lineHeight: Typography.sm * 1.5, // Better readability
    // Accessibility: Ensure text is readable
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  messageContainer: {
    // marginVertical: Spacing.md,
    // because equal is a lie:
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxs,
    paddingVertical: Spacing.sm,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    width: "100%",
    alignItems: "center", // Center the text within the container
    // Make borders more accessible
    borderStyle: "solid",
    borderColor: palette.border,
  },
  cardMessage: {
    fontSize: Typography.xxl,
    fontWeight: Typography.light,
    textAlign: "center",
    lineHeight: Typography.xxl * 1.3, // Better line height for readability
    // Accessibility enhancements
    includeFontPadding: false,
    textAlignVertical: "center",
    // Ensure text wraps properly
    flexWrap: "wrap",
    flexShrink: 1,
    // borderTopWidth: 5,
    // borderBottomWidth: 5,
    // borderColor: "red",
  },
  cardList: {
    width: "100%",
    paddingTop: Spacing.sm,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)", // Very subtle separator
    // Flexible layout for different content lengths
    flexGrow: 1,
  },
  listItem: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    textAlign: "center",
    marginBottom: Spacing.xs,
    lineHeight: Typography.md * 1.4,
    // Accessibility
    includeFontPadding: false,
    textAlignVertical: "center",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  // Add a scroll container style for long content
  scrollContainer: {
    flexGrow: 1,
    // justifyContent will be added inline where needed
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    bottom: 20,
    gap: 4,
  },
  crudButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
