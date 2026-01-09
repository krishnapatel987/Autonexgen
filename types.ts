
import React from 'react';

export interface Message {
  role: 'user' | 'bot';
  content: string;
  id: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags?: string[];
  link?: string;
  accent: 'blue' | 'indigo' | 'purple' | 'orange';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
  isVerified?: boolean;
}

/**
 * Fix: Augment the 'react' module's JSX namespace instead of a global one.
 * This approach ensures that 'iconify-icon' is merged into the existing
 * IntrinsicElements interface provided by React, preventing the shadowing
 * of standard HTML tags like 'div', 'span', etc.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
        flip?: string;
        rotate?: string | number;
        class?: string;
      }, HTMLElement>;
    }
  }
}
