import { Card } from "@/domain/cards/Card";
import { useDisclosure } from "@/domain/disclosures/DisclosureContext";
import { StyleSheet, Text, View, useColorScheme, Platform, ScrollView } from "react-native";
import { Colors, Spacing, Typography, BorderRadius } from "@/constants/theme";

export default function CardView({ card }: { card: Card }) {
  const { getDisclosureById } = useDisclosure();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Accessibility: Adjust font sizes based on user preferences
  const getAccessibleFontSize = (baseSize: number) => {
    // This could be enhanced with actual font scaling based on user settings
    return baseSize;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}
          accessible={true}
          accessibilityLabel="Communication card view">
      <ScrollView 
        style={[styles.cardContainer, { backgroundColor: theme.surface }]}
        contentContainerStyle={[styles.scrollContainer, { justifyContent: 'flex-start' }]}
        accessible={true}
        accessibilityLabel={`Card: ${card.title || 'Untitled'}`}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled">
        {/* Disclosures section - centered but with proper spacing */}
        {card.disclosureIds?.map((id) => {
          const disclosure = getDisclosureById(id);
          if (!disclosure) return null;
          return (
            <Text key={id} 
                  style={[styles.cardDisclosure, { color: theme.textSecondary }]}
                  accessible={true}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                  numberOfLines={0}>
              {disclosure.text}
            </Text>
          );
        })}

        {/* Main message - the focal point */}
        <View style={[styles.messageContainer, { borderColor: theme.border }]}
              accessible={true}
              accessibilityLabel="Main message">
          <Text style={[styles.cardMessage, { 
            color: theme.text,
            fontSize: getAccessibleFontSize(Typography.xxl) 
          }]}
                accessible={true}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
                allowFontScaling={true}
                numberOfLines={0}>
            {card.message}
          </Text>
        </View>

        {/* List items if they exist */}
        {card.list && card.list.length > 0 && (
          <View style={styles.cardList}
                accessible={true}
                accessibilityLabel="Additional information list">
            {card.list?.map((item, index) => (
              <Text key={index} 
                    style={[styles.listItem, { color: theme.text }]}
                    accessible={true}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                    numberOfLines={0}>
                • {item}
              </Text>
            ))}
          </View>
        )}
        {/* Add some spacing at the bottom for better scroll experience */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
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
    width: '100%',
    alignSelf: 'center', // Center the card container, but not its contents
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    // Shadow for depth (subtle, not overwhelming)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // Ensure the card has enough space for content to breathe
    // justifyContent moved to contentContainerStyle
  },
  cardDisclosure: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    lineHeight: Typography.sm * 1.5, // Better readability
    // Accessibility: Ensure text is readable
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  messageContainer: {
    marginVertical: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1, // Much more subtle than 5px
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center', // Center the text within the container
    // Make borders more accessible
    borderStyle: 'solid',
  },
  cardMessage: {
    fontSize: Typography.xxl,
    fontWeight: Typography.light,
    textAlign: 'center',
    lineHeight: Typography.xxl * 1.3, // Better line height for readability
    // Accessibility enhancements
    includeFontPadding: false,
    textAlignVertical: 'center',
    // Ensure text wraps properly
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  cardList: {
    width: '100%',
    paddingTop: Spacing.sm,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)', // Very subtle separator
    // Flexible layout for different content lengths
    flexGrow: 1,
  },
  listItem: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    lineHeight: Typography.md * 1.4,
    // Accessibility
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  // Add a scroll container style for long content
  scrollContainer: {
    flexGrow: 1,
    // justifyContent will be added inline where needed
  },
});
