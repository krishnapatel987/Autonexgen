
import React from 'react';

// Added missing AppView type export to fix errors in Navbar.tsx and App.tsx
export type AppView = 'home' | 'services' | 'results' | 'reviews' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'landing';

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
 * Fix: Use 'declare module "react"' to correctly augment the JSX namespace.
 * This ensures that standard HTML elements like 'div', 'span', and 'button' are preserved
 * through interface merging within React's own JSX definition. The previous 
 * 'declare global' declaration was unintentionally shadowing the entire namespace,
 * leading to widespread "Property ... does not exist on type 'JSX.IntrinsicElements'" errors.
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
