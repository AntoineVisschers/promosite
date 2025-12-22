import * as Tags from "../components/tags";

export const mapTags = {
  alert: Tags.Alert,
  card: Tags.Card,
} as const;

export type RegistryKey = keyof typeof mapTags;
