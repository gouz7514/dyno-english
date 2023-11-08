import { IMetadata } from "@/types/types";

import { METADATA } from "../constants/constatns";

export function genPageMetadata({ title, description, openGraph }: IMetadata) {
  const baseOpenGraph = METADATA.home.openGraph
  return {
    title: title || METADATA.home.title,
    description: description || METADATA.home.description,
    openGraph: {
      ...baseOpenGraph,
      title: openGraph?.title || METADATA.home.openGraph.title,
      description: openGraph?.description || METADATA.home.openGraph.description,
    }
  }
}