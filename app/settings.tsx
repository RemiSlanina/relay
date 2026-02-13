import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, toggleSetting, resetToDefaults } = useAccessibility();
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const motionOptions = [
    { value: "full", label: "Full Animations" },
    { value: "reduced", label: "Reduced Motion" },
    { value: "none", label: "No Motion" },
  ];
  
  const getSettingLabel = (setting: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      motion: {
        full: "Full Animations",
        reduced: "Reduced Motion",
        none: "No Motion",
      },
      haptics: {
        normal: "Normal Feedback",
        minimal: "Minimal Feedback",
        off: "No Feedback",
      },
      sound: {
        on: "Sounds On",
        soft: "Soft Sounds",
        off: "Sounds Off",
      },
      colorIntensity: {
        normal: "Normal Colors",
        muted: "Muted Colors",
      },
      density: {
        compact: "Compact Layout",
        comfortable: "Comfortable Layout",
      },
      theme: {
        system: "System Theme",
        light: "Light Theme",
        dark: "Dark Theme",
      },
      textSize: {
        normal: "Normal Text",
        large: "Large Text",
        larger: "Larger Text",
      },
    };
    
    return labels[setting]?.[value] || value;
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Accessibility Settings</Text>
        
        <Text style={styles.sectionTitle}>Comfort Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Calm Mode</Text>
            <Text style={styles.settingDescription}>
              Reduces animations, sounds, and visual stimulation for a calmer experience
            </Text>
          </View>
          <Switch
            value={settings.calmMode}
            onValueChange={() => toggleSetting("calmMode")}
            trackColor={{ false: "#6c757d", true: "#28a745" }}
            thumbColor={settings.calmMode ? "white" : "white"}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>High Contrast Mode</Text>
            <Text style={styles.settingDescription}>
              Increases color contrast for better visibility
            </Text>
          </View>
          <Switch
            value={settings.highContrast}
            onValueChange={() => toggleSetting("highContrast")}
            trackColor={{ false: "#6c757d", true: "#28a745" }}
            thumbColor={settings.highContrast ? "white" : "white"}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Motion Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Motion</Text>
            <Text style={styles.settingDescription}>
              {getSettingLabel("motion", settings.motion)}
            </Text>
          </View>
          <Pressable
            style={styles.valueButton}
            onPress={() => toggleSetting("motion")}
            disabled={settings.calmMode}
          >
            <Text style={styles.valueButtonText}>{getSettingLabel("motion", settings.motion)}</Text>
            <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
          </Pressable>
        </View>
        
        {showAdvanced && (
          <>
            <Text style={styles.sectionTitle}>Advanced Settings</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Haptic Feedback</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("haptics", settings.haptics)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("haptics")}
                disabled={settings.calmMode}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("haptics", settings.haptics)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Sound Effects</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("sound", settings.sound)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("sound")}
                disabled={settings.calmMode}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("sound", settings.sound)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Color Intensity</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("colorIntensity", settings.colorIntensity)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("colorIntensity")}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("colorIntensity", settings.colorIntensity)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Layout Density</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("density", settings.density)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("density")}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("density", settings.density)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("theme", settings.theme)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("theme")}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("theme", settings.theme)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Text Size</Text>
                <Text style={styles.settingDescription}>
                  {getSettingLabel("textSize", settings.textSize)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("textSize")}
              >
                <Text style={styles.valueButtonText}>{getSettingLabel("textSize", settings.textSize)}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#6c757d" />
              </Pressable>
            </View>
          </>
        )}
        
        <Pressable
          style={styles.advancedToggle}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text style={styles.advancedToggleText}>
            {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
          </Text>
          <MaterialIcons 
            name={showAdvanced ? "expand-less" : "expand-more"} 
            size={24} 
            color="#6c757d"
          />
        </Pressable>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.actionButton, styles.resetButton]}
            onPress={resetToDefaults}
          >
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </Pressable>
        </View>
        
        {settings.calmMode && (
          <View style={styles.calmModeNotice}>
            <MaterialIcons name="check-circle" size={20} color="#28a745" />
            <Text style={styles.calmModeNoticeText}>
              Calm Mode is active. Some settings are automatically adjusted for comfort.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#495057",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#212529",
  },
  settingDescription: {
    fontSize: 14,
    color: "#6c757d",
  },
  valueButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  valueButtonText: {
    fontSize: 16,
    color: "#495057",
    marginRight: 8,
  },
  advancedToggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
  },
  advancedToggleText: {
    fontSize: 16,
    color: "#1976d2",
    marginRight: 8,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    backgroundColor: "#f1f3f5",
  },
  resetButtonText: {
    color: "#6c757d",
    fontSize: 16,
    fontWeight: "600",
  },
  calmModeNotice: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    marginTop: 20,
  },
  calmModeNoticeText: {
    fontSize: 14,
    color: "#1976d2",
    marginLeft: 8,
    flex: 1,
  },
});