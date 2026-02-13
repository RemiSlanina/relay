import {
  QuickAccessPolicy,
  SharingPolicy,
} from "@/domain/cards/Card.constants";
import { Card } from "@/domain/cards/Card";
import { useCards } from "@/domain/cards/CardsContext";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateCardScreen() {
  const router = useRouter();
  const { addCard } = useCards();
  const { disclosures } = useDisclosure();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDisclosureId, setSelectedDisclosureId] = useState<
    string | null
  >(null);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create New Card</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Card title"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Card message"
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Disclosure (Optional)</Text>
          <Pressable
            style={styles.disclosureSelector}
            onPress={() => setShowDisclosureModal(true)}
          >
            <Text style={styles.disclosureText}>{getDisclosureText() || "Select disclosure (optional)"}</Text>
            <MaterialIcons name={showDisclosureModal ? "arrow-drop-up" : "arrow-drop-down"} size={24} style={styles.disclosureChevron} />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.customButton, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.customButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Card</Text>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Disclosure</Text>

            <Pressable
              style={styles.disclosureOption}
              onPress={() => {
                setSelectedDisclosureId(null);
                setShowDisclosureModal(false);
              }}
            >
              <Text style={styles.disclosureOptionText}>None</Text>
            </Pressable>

            {disclosures.map((disclosure) => (
              <Pressable
                key={disclosure.id}
                style={styles.disclosureOption}
                onPress={() => {
                  setSelectedDisclosureId(disclosure.id);
                  setShowDisclosureModal(false);
                }}
              >
                <Text style={styles.disclosureOptionText}>
                  {disclosure.text}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={[styles.customButton, styles.modalCancelButton]}
              onPress={() => setShowDisclosureModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
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
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
    color: "#2c3e50",
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#495057",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#212529",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  disclosureSelector: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disclosureText: {
    fontSize: 16,
    color: "#495057",
    flex: 1,
  },
  disclosureChevron: {
    color: "#6c757d",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    gap: 16,
  },
  customButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#e9ecef",
  },
  cancelButtonText: {
    color: "#495057",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  disclosureOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  disclosureOptionText: {
    fontSize: 16,
    color: "#212529",
  },
  modalCancelButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f3f5",
  },
  modalCancelButtonText: {
    color: "#6c757d",
    fontSize: 16,
    fontWeight: "500",
  },
});
