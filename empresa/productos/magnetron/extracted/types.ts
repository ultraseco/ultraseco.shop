
import React from 'react';

export interface Step {
  id: number;
  title: string;
  description: string;
  // Fixed: Import React to provide the React namespace
  icon: React.ReactNode;
}

export interface Feature {
  title: string;
  description: string;
  // Fixed: Import React to provide the React namespace
  icon: React.ReactNode;
  color: string;
}

export interface ImagePart {
  inlineData?: {
    mimeType: string;
    data: string;
  };
  text?: string;
}
