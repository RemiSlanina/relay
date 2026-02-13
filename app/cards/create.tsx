import {
  QuickAccessPolicy,
  SharingPolicy,
} from "@/domain/cards/Card.constants";
import { Card } from "@/domain/cards/Card";
import { useCards } from "@/domain/cards/CardsContext";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
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
            <Text style={styles.disclosureText}>{getDisclosureText()}</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => router.back()} color="#666" />
          <Button title="Save" onPress={handleSave} color="#4CAF50" />
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

            <Button
              title="Cancel"
              onPress={() => setShowDisclosureModal(false)}
              color="#666"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  disclosureSelector: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 50,
    justifyContent: "center",
  },
  disclosureText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  disclosureOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  disclosureOptionText: {
    fontSize: 16,
  },
});
