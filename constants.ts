
import { ServiceItem, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'agents',
    title: 'AI Agents & Chatbots',
    description: '24/7 intelligent support for your Website and WhatsApp. Our agents can qualify leads, book appointments, and handle customer queries instantly using natural language processing.',
    icon: 'lucide:bot-message-square',
    tags: ['Voice Agents', 'WhatsApp Bots', 'Lead Gen', 'Support Desks'],
    accent: 'blue'
  },
  {
    id: 'workflows',
    title: 'Workflow Automation',
    description: 'Connect your apps. Eliminate manual data entry. We are experts in Make.com, n8n, and Zapier integration to bridge data silos.',
    icon: 'lucide:workflow',
    accent: 'indigo'
  },
  {
    id: 'custom',
    title: 'Custom AI Solutions',
    description: 'Every business is different. We analyze your operations, identify bottlenecks, and build custom AI solutions aligned with your goals—designed to fit your processes, scale with growth, and deliver measurable efficiency.',
    icon: 'lucide:code-2',
    accent: 'blue',
    link: '#contact'
  },
  {
    id: 'strategy',
    title: 'AI Strategy Consulting',
    description: 'We help you navigate the complex landscape of GenAI, identifying the highest ROI opportunities for your specific industry vertical.',
    icon: 'lucide:lightbulb',
    accent: 'purple'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How much does a custom AI agent cost?',
    answer: 'Pricing depends on complexity. Simple chatbot integrations start at competitive rates, while fully autonomous enterprise agents with deep RAG integration require custom quoting. Book a consultation for a detailed estimate.'
  },
  {
    question: 'Do you work with startups?',
    answer: 'Yes, we specialize in helping startups and SMEs scale operations with minimal headcount by implementing high-efficiency automation layers.'
  },
  {
    question: 'Can you integrate with my existing CRM?',
    answer: 'Absolutely. We have extensive experience integrating with HubSpot, Salesforce, Zoho, and custom proprietary databases using secure API connectors.'
  }
];

export const PROCESS_STEPS = [
  { id: '01', title: 'Discovery', description: 'We analyze your bottlenecks and identify high-ROI automation opportunities.', icon: 'lucide:search', color: 'blue' },
  { id: '02', title: 'Build', description: 'Developing agents, connecting APIs, and setting up the infrastructure layer.', icon: 'lucide:code-2', color: 'indigo' },
  { id: '03', title: 'Deploy', description: 'Live implementation, staff training, and rigorous performance testing.', icon: 'lucide:rocket', color: 'purple' },
  { id: '04', title: 'Scale', description: 'Continuous monitoring, analytics reporting, and iterative improvements.', icon: 'lucide:bar-chart-2', color: 'emerald' }
];
