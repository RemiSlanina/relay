import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAccessibility } from "@/domain/accessibility/AccessibilityContext";
import { Colors, Spacing, Typography, BorderRadius } from "@/constants/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, toggleSetting, resetToDefaults } = useAccessibility();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
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
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
                contentContainerStyle={styles.content}>
      <View style={styles.innerContent}>
        <Text style={[styles.title, { color: theme.text }]}>Accessibility Settings</Text>
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Comfort Settings</Text>
        
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
            trackColor={{ false: theme.border, true: theme.success }}
            thumbColor={settings.calmMode ? theme.surface : theme.surface}
          />
        </View>
        
        <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>High Contrast Mode</Text>
            <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                  accessible={true}>
              Increases color contrast for better visibility
            </Text>
          </View>
          <Switch
            value={settings.highContrast}
            onValueChange={() => toggleSetting("highContrast")}
            trackColor={{ false: theme.border, true: theme.success }}
            thumbColor={settings.highContrast ? theme.surface : theme.surface}
          />
        </View>
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Motion Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Motion</Text>
            <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                  accessible={true}>
              {getSettingLabel("motion", settings.motion)}
            </Text>
          </View>
          <Pressable
            style={styles.valueButton}
            onPress={() => toggleSetting("motion")}
            disabled={settings.calmMode}
            accessible={true}
            accessibilityLabel={`Motion setting, currently ${getSettingLabel("motion", settings.motion)}`}
          >
            <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("motion", settings.motion)}</Text>
            <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
          </Pressable>
        </View>
        
        {showAdvanced && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Advanced Settings</Text>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Haptic Feedback</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("haptics", settings.haptics)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("haptics")}
                disabled={settings.calmMode}
                accessible={true}
                accessibilityLabel={`Haptic feedback setting, currently ${getSettingLabel("haptics", settings.haptics)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("haptics", settings.haptics)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Sound Effects</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("sound", settings.sound)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("sound")}
                disabled={settings.calmMode}
                accessible={true}
                accessibilityLabel={`Sound effects setting, currently ${getSettingLabel("sound", settings.sound)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("sound", settings.sound)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Color Intensity</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("colorIntensity", settings.colorIntensity)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("colorIntensity")}
                accessible={true}
                accessibilityLabel={`Color intensity setting, currently ${getSettingLabel("colorIntensity", settings.colorIntensity)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("colorIntensity", settings.colorIntensity)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Layout Density</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("density", settings.density)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("density")}
                accessible={true}
                accessibilityLabel={`Layout density setting, currently ${getSettingLabel("density", settings.density)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("density", settings.density)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Theme</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("theme", settings.theme)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("theme")}
                accessible={true}
                accessibilityLabel={`Theme setting, currently ${getSettingLabel("theme", settings.theme)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("theme", settings.theme)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Text Size</Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}
                      accessible={true}>
                  {getSettingLabel("textSize", settings.textSize)}
                </Text>
              </View>
              <Pressable
                style={styles.valueButton}
                onPress={() => toggleSetting("textSize")}
                accessible={true}
                accessibilityLabel={`Text size setting, currently ${getSettingLabel("textSize", settings.textSize)}`}
              >
                <Text style={[styles.valueButtonText, { color: theme.text }]}>{getSettingLabel("textSize", settings.textSize)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
          </>
        )}
        
        <Pressable
          style={styles.advancedToggle}
          onPress={() => setShowAdvanced(!showAdvanced)}
          accessible={true}
          accessibilityLabel={showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
        >
          <Text style={[styles.advancedToggleText, { color: theme.primary }]}
                accessible={true}>
            {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
          </Text>
          <MaterialIcons 
            name={showAdvanced ? "expand-less" : "expand-more"} 
            size={24} 
            color={theme.primary}
          />
        </Pressable>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.actionButton, styles.resetButton, { backgroundColor: theme.surface }]}
            onPress={resetToDefaults}
            accessible={true}
            accessibilityLabel="Reset all settings to default values"
          >
            <Text style={[styles.resetButtonText, { color: theme.textSecondary }]}>Reset to Defaults</Text>
          </Pressable>
        </View>
        
        {settings.calmMode && (
          <View style={[styles.calmModeNotice, { backgroundColor: theme.surface }]}
                accessible={true}
                accessibilityLabel="Calm mode is active">
            <MaterialIcons name="check-circle" size={20} color={theme.success} />
            <Text style={[styles.calmModeNoticeText, { color: theme.primary }]}
                  accessible={true}>
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
  },
  content: {
    flexGrow: 1,
  },
  innerContent: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.xxl,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semiBold,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: Typography.sm,
  },
  valueButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  valueButtonText: {
    fontSize: Typography.md,
    marginRight: Spacing.xs,
  },
  advancedToggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    marginTop: Spacing.xl,
  },
  advancedToggleText: {
    fontSize: Typography.md,
    marginRight: Spacing.xs,
    fontWeight: Typography.medium,
  },
  buttonContainer: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
  },
  resetButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
  },
  calmModeNotice: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
  },
  calmModeNoticeText: {
    fontSize: Typography.sm,
    marginLeft: Spacing.xs,
    flex: 1,
  },
});