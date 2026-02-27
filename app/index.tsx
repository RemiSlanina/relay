import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { resetFirstLaunch } from "@/domain/bootstrap/first-launch";
import { CardStorage, initializeCards } from "@/domain/cards/cards.storage";
import { useCards } from "@/domain/cards/CardsContext";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";
// TODO: sort cards alphabetically (by title)
// TODO: delete and edit function
// TODO: add comments for basic types, methods, ... (REALLY NOW!)

export default function IndexScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  // call getFirstLaunchTime during init in cards.storage instead
  // useEffect(() => {
  //   getFirstLaunchTime().then((time) => {
  //     console.log("First launch: ", time);
  //   });
  // }, []);

  // KEEP THIS
  //reset firstlaunch
  // DO NOT DELETE, STILL NEEDED
  // useEffect(() => {
  //   resetFirstLaunch().then(() => {
  //     console.log("Reset First launch");
  //   });
  // }, []);

  useEffect(() => {
    navigation.setOptions({ title: "Relay _/ _ Communication shortcuts" });
  }, [navigation]);

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Your saved Cards
        </Text>

        {/* settings */}
        <Pressable
          style={[styles.settingsButton, { backgroundColor: theme.surface }]}
          onPress={() => router.push("/settings")}
          accessibilityLabel="Settings"
          accessibilityHint="Open accessibility and app settings"
        >
          <MaterialIcons name="settings" size={24} color={theme.text} />
        </Pressable>
      </View>

      {!loaded ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.success} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading your cards...
          </Text>
        </View>
      ) : cards.length === 0 ? (
        <Animated.View entering={customFadeIn} style={styles.emptyState}>
          <MaterialIcons
            name="note-add"
            size={48}
            color={theme.textSecondary}
          />
          <Text
            style={[styles.emptyStateText, { color: theme.textSecondary }]}
            accessible={true}
          >
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
                style={[
                  styles.cardItem,
                  {
                    backgroundColor: theme.surface,
                    borderBottomColor: theme.border,
                  },
                ]}
                accessible={true}
                accessibilityLabel={`Card: ${item.title}`}
                accessibilityRole="button"
              >
                <Text
                  style={[styles.cardTitle, { color: theme.text }]}
                  accessible={true}
                >
                  {item.title}
                </Text>
                {item.source === "user" && (
                  <View
                    style={[
                      styles.userCardBadge,
                      {
                        backgroundColor: theme.primary + "20",
                      },
                    ]}
                    accessible={true}
                    accessibilityLabel="Custom card"
                  >
                    <Text
                      style={[
                        styles.userCardBadgeText,
                        { color: theme.primary },
                      ]}
                      accessible={true}
                    >
                      Custom
                    </Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          )}
        />
      )}

      {/* ~~~ * debugging section * ~~~ */}
      <View style={styles.devContainer}>
        {/* debugging: clear 'ALL cards*/}
        <Pressable
          style={[styles.devButton, { backgroundColor: "#744242" }]}
          onPress={async () => {
            await CardStorage.clearCards();
            alert("Cards cleared! Please reload to see changes!");
          }}
          accessibilityLabel="Dev only: Delete all cards"
          accessibilityHint="Dev only: Delete all cards in storage"
        >
          <Text>dev only</Text>
          <Ionicons name="skull-sharp" size={24} color="black" />
        </Pressable>

        {/* resetFirstLaunch() and re-initialize all cards */}
        {/* or simply copy them all from templates again (maybe better) */}
        <Pressable
          onPress={async () => {
            await resetFirstLaunch();
            console.log("First launch reset!");
            await initializeCards();
            alert("Cards Re-initialized. Please reload to see changes!");
          }}
          style={[
            styles.devButton,
            { backgroundColor: "#6a658f", marginRight: 60 },
          ]}
          accessibilityLabel="Dev only: Reset first launch"
        >
          <Text>dev only</Text>
          <Ionicons name="reload-circle-outline" size={24} color="black" />
        </Pressable>
      </View>
      {/* / ~~~ * end debugging section * ~~~ */}

      {/* Add Card Button - Fixed at bottom right with animation */}
      <Animated.View
        entering={customBounceIn}
        style={styles.addButtonContainer}
      >
        <Pressable
          style={[styles.addButton, { backgroundColor: theme.success }]}
          onPress={() => router.push("/cards/create")}
          accessibilityLabel="Create new card"
          accessibilityHint="Opens the card creation form"
        >
          <MaterialIcons name="add" size={28} color={theme.surface} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

/********************************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    position: "relative",
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.xl,
  },
  cardItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
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
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
  },
  settingsButton: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  userCardBadge: {
    position: "absolute",
    right: 12,
    top: 12,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  userCardBadgeText: {
    fontSize: Typography.xxs,
    fontWeight: Typography.semiBold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  emptyStateText: {
    fontSize: Typography.md,
    textAlign: "center",
    marginTop: Spacing.md,
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
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  devContainer: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    gap: 4,
    right: 20,
    bottom: 20,
  },
  devButton: {
    width: 70,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: "#a76a6a",
    opacity: 0.9,
  },
});
