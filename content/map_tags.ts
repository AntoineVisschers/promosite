import * as Tags from "../components/tags";

export const mapTags = {
  alert: Tags.Alert,
  card: Tags.Card,
  title: Tags.Title,
  emphase: Tags.Emphase,
} as const;

export type RegistryKey = keyof typeof mapTags;
