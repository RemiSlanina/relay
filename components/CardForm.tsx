import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
  palette,
} from "@/constants/theme";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { useCards } from "@/domain/cards";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

/**
 * Type CardFormValues are similar to type Card, but without
 * templateId.
 * Also, only 2 values are mandatory:
 * id, title and message (in contrast to the Card type).
 * - id is usually preserved or constructed, matching urs:-(optional-message-or-nums)-date
 * - title can by created or edited
 * - message can be creaated or edited
 */
// type CardFormValue = {
//   title: string;
//   message: string;
//   id?: string;
//   category?: Category;
//   priority?: number;
//   lang?: string;
//   disclosureIds?: string[];
//   list?: string[] | null | undefined;
//   media?: any[] | null | undefined;
//   sharing?: SharingPolicyType;
//   quickAccess?: QuickAccessPolicyType;
//   intent?: string;
//   tone?: Tone;
//   lastEditedAt: string; // ISO date
//   source?: "template" | "user";
// };

type CardFormValues = {
  title: string;
  message: string;
};

type CardFormProps = {
  initialValues?: CardFormValues;
  onSubmit: (values: CardFormValues) => void;
  onCancel: () => void;
};

export default function CardForm(props: CardFormProps) {
  const { persistenceError } = useCards();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const [title, setTitle] = useState(
    props.initialValues ? props.initialValues.title : "",
  );
  const [message, setMessage] = useState(
    props.initialValues ? props.initialValues.message : "",
  );

  const { settings } = useAccessibility();
  // Use motion setting from accessibility context
  const shouldAnimate = settings.motion !== "none";

  function handleSave() {
    if (!title.trim() || !message.trim()) {
      alert("Title and message must not be empty!");
      return;
    }

    props.onSubmit({
      title,
      message,
    });
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.innerContent}>
        <Text style={[styles.title, { color: theme.text }]}>Card Editor</Text>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textInput }]}>Title</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.textInput },
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Card Title"
            placeholderTextColor={theme.textInputSecondary}
            accessibilityLabel="Card Title"
            accessibilityHint="Enter or edit the title for your card"
            importantForAccessibility="yes"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Message</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { borderColor: theme.border, color: theme.textInput },
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Card Message"
            placeholderTextColor={theme.textInputSecondary}
            multiline
            numberOfLines={5}
            accessibilityLabel="Card message"
            accessibilityHint="Enter or edit the main message for your card"
            importantForAccessibility="yes"
          />
        </View>

        {/* Enter disclosure section later */}

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.customButton,
              styles.cancelButton,
              { backgroundColor: theme.surface },
            ]}
            // router gets called via callback (create or edit)
            onPress={props.onCancel}
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
            // pass on values to create or edit:
            onPress={handleSave}
            accessibilityLabel="Save Card"
            accessibilityHint="Save your edits"
            accessibilityRole="button"
          >
            <Text style={[styles.saveButtonText, { color: theme.surface }]}>
              Save Card
            </Text>
          </Pressable>
        </View>
      </View>
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
