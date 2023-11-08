import { IMetadata } from "@/types/types";

import { METADATA } from "../constants/constatns";

export class Metadata implements IMetadata {
  title: string
  description: string
  openGraph: {
    [key: string]: string
  }

  constructor() {
    const { title, description, openGraph } = METADATA.home;
    this.title = title;
    this.description = description;
    this.openGraph = openGraph;
  }
}

export class CustomMetadata extends Metadata {
  title: string
  description: string;

  constructor(data: IMetadata) {
    super();
    const { title, description, openGraph } = data;
    this.title = title || '다이노 영어';
    this.description = description || '다이노 영어와 함께 영어를 배워보세요!';
    this.openGraph.title = openGraph?.title || '다이노 영어';
    this.openGraph.description = openGraph?.description || '다이노 영어와 함께 영어를 배워보세요!';
  }

  getMetadata() {
    return {
      title: this.title,
      description: this.description,
      openGraph: this.openGraph,
    }
  }
}