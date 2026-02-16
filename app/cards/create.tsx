import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
  palette,
} from "@/constants/theme";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { Card } from "@/domain/cards/Card";
import {
  QuickAccessPolicy,
  SharingPolicy,
} from "@/domain/cards/Card.constants";
import { useCards } from "@/domain/cards/CardsContext";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

export default function CreateCardScreen() {
  const router = useRouter();
  const { addCard } = useCards();
  const { disclosures } = useDisclosure();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDisclosureId, setSelectedDisclosureId] = useState<
    string | null
  >(null);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const { settings } = useAccessibility();

  // Use motion setting from accessibility context
  const shouldAnimate = settings.motion !== "none";

  const handleSave = () => {
    if (!title.trim() || !message.trim()) {
      alert("Please fill in both title and message");
      return;
    }

    const newCard: Card = {
      id:
        "usr:" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      category: "support", // default category
      priority: 0, // default priority
      lang: "en", // default language
      title: title.trim(),
      disclosureIds: selectedDisclosureId ? [selectedDisclosureId] : [],
      message: message.trim(),
      sharing: SharingPolicy.INHERIT, // default sharing policy
      quickAccess: QuickAccessPolicy.INHERIT, // default quick access
      source: "user", // mark as user-created
      lastEditedAt: new Date().toISOString(),
      // Add any missing optional fields with default values
      list: [],
      media: [],
    };

    addCard(newCard);
    router.back();
  };

  const getDisclosureText = () => {
    if (!selectedDisclosureId) return "None";
    const disclosure = disclosures.find((d) => d.id === selectedDisclosureId);
    return disclosure ? disclosure.text : "None";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.innerContent}>
        <Text style={[styles.title, { color: theme.text }]}>
          Create New Card
        </Text>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Title</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.text },
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Card title"
            placeholderTextColor={theme.textSecondary}
            accessibilityLabel="Card title"
            accessibilityHint="Enter the title for your card"
            importantForAccessibility="yes"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Message</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { borderColor: theme.border, color: theme.text },
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Card message"
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={6}
            accessibilityLabel="Card message"
            accessibilityHint="Enter the main content for your card"
            importantForAccessibility="yes"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Disclosure (Optional)
          </Text>
          <Pressable
            style={[styles.disclosureSelector, { borderColor: theme.border }]}
            onPress={() => setShowDisclosureModal(true)}
            accessibilityLabel={
              getDisclosureText() || "Select disclosure, optional"
            }
            accessibilityHint="Choose a disclosure to add to your card"
            accessibilityRole="button"
          >
            <Text
              style={[styles.disclosureText, { color: theme.text }]}
              accessible={true}
            >
              {getDisclosureText() || "Select disclosure (optional)"}
            </Text>
            <MaterialIcons
              name={showDisclosureModal ? "arrow-drop-up" : "arrow-drop-down"}
              size={24}
              style={[styles.disclosureChevron, { color: theme.textSecondary }]}
            />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.customButton,
              styles.cancelButton,
              { backgroundColor: theme.surface },
            ]}
            onPress={() => router.back()}
            accessibilityLabel="Cancel"
            accessibilityHint="Discard changes and return to cards list"
            accessibilityRole="button"
          >
            <Text
              style={[styles.cancelButtonText, { color: theme.textSecondary }]}
            >
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.customButton,
              styles.saveButton,
              { backgroundColor: theme.success },
            ]}
            onPress={handleSave}
            accessibilityLabel="Save card"
            accessibilityHint="Save your new card"
            accessibilityRole="button"
          >
            <Text style={[styles.saveButtonText, { color: theme.surface }]}>
              Save Card
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Disclosure Selection Modal */}
      <Modal
        visible={showDisclosureModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDisclosureModal(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: "rgba(0, 0, 0, 0.6)" },
          ]}
          accessible={true}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.surface }]}
            accessible={true}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Select Disclosure
            </Text>

            <Pressable
              style={[
                styles.disclosureOption,
                { borderBottomColor: theme.border },
              ]}
              onPress={() => {
                setSelectedDisclosureId(null);
                setShowDisclosureModal(false);
              }}
              accessible={true}
              accessibilityLabel="Select no disclosure"
              accessibilityRole="button"
            >
              <Text
                style={[styles.disclosureOptionText, { color: theme.text }]}
                accessible={true}
              >
                None
              </Text>
            </Pressable>

            {disclosures.map((disclosure) => (
              <Pressable
                key={disclosure.id}
                style={[
                  styles.disclosureOption,
                  { borderBottomColor: theme.border },
                ]}
                onPress={() => {
                  setSelectedDisclosureId(disclosure.id);
                  setShowDisclosureModal(false);
                }}
                accessibilityLabel={`Select disclosure: ${disclosure.text}`}
                accessibilityHint="Add this disclosure to your card"
                accessibilityRole="button"
              >
                <Text
                  style={[styles.disclosureOptionText, { color: theme.text }]}
                  accessible={true}
                >
                  {disclosure.text}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={[
                styles.customButton,
                styles.modalCancelButton,
                { backgroundColor: theme.surface },
              ]}
              onPress={() => setShowDisclosureModal(false)}
              accessibilityLabel="Cancel disclosure selection"
              accessibilityHint="Close disclosure selection without changes"
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.modalCancelButtonText,
                  { color: theme.textSecondary },
                ]}
                accessible={true}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  innerContent: {
    padding: Spacing.xl,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.xxl,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.md,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: Spacing.md,
  },
  disclosureSelector: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disclosureText: {
    fontSize: Typography.md,
    flex: 1,
  },
  disclosureChevron: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  customButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {},
  cancelButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
  },
  saveButton: {},
  saveButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: "85%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  disclosureOption: {
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  disclosureOptionText: {
    fontSize: Typography.md,
  },
  modalCancelButton: {
    marginTop: Spacing.lg,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  modalCancelButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
  },
});
