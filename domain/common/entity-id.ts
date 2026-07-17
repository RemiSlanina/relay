export function templateIdToUserId(templateId: string): string {
  return `usr${templateId.slice(3)}-${Date.now()}`;
}
