// TODO
export type Disclosure = {
  id: string;
  label?: string; // optional, for UI like "Work", "Private"
  text: string; // what gets shown
  sensitive?: boolean; // default false
};
