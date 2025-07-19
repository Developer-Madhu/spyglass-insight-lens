import { CompetitorUpdate } from '../types/update';

export const mockUpdates: CompetitorUpdate[] = [
  {
    id: '1',
    product: 'Notion',
    date: '2025-01-15',
    title: 'AI Writing Assistant Enhancement',
    type: 'Feature',
    summary: 'Notion upgraded their AI assistant with better context understanding and multi-language support.',
    why_it_matters: 'This strengthens their position in the AI-powered productivity space, potentially reducing need for external AI tools.',
    link: 'https://www.notion.so/releases',
    content: 'The AI writing assistant now understands context better and supports 15+ languages...'
  },
  {
    id: '2',
    product: 'Linear',
    date: '2025-01-14',
    title: 'Advanced Project Timeline Views',
    type: 'UI',
    summary: 'Linear introduced Gantt chart-style timeline views with dependency tracking.',
    why_it_matters: 'Directly competes with project management tools like Asana and Monday.com for enterprise customers.',
    link: 'https://linear.app/changelog',
    content: 'New timeline views allow teams to visualize project dependencies...'
  },
  {
    id: '3',
    product: 'Figma',
    date: '2025-01-13',
    title: 'Real-time Performance Optimization',
    type: 'Performance',
    summary: 'Figma reduced loading times by 40% for large files and improved real-time collaboration.',
    why_it_matters: 'Addresses key pain points that could drive users to competitors like Adobe XD or Sketch.',
    link: 'https://www.figma.com/releases/',
    content: 'Major performance improvements reduce file loading times...'
  },
  {
    id: '4',
    product: 'Notion',
    date: '2025-01-12',
    title: 'Team Workspace Pricing Update',
    type: 'Pricing',
    summary: 'Notion increased team workspace pricing by 20% but added more AI credits and storage.',
    why_it_matters: 'Price increase might push small teams to alternatives, but added value could justify cost for larger teams.',
    link: 'https://www.notion.so/releases',
    content: 'Starting February 1st, team workspaces will see updated pricing...'
  },
  {
    id: '5',
    product: 'Linear',
    date: '2025-01-11',
    title: 'Mobile App Critical Bug Fixes',
    type: 'Bug Fix',
    summary: 'Fixed several critical bugs in the mobile app affecting issue creation and sync.',
    why_it_matters: 'Mobile reliability is crucial for field teams and on-the-go product managers.',
    link: 'https://linear.app/changelog',
    content: 'This release addresses several critical issues reported by mobile users...'
  },
  {
    id: '6',
    product: 'Figma',
    date: '2025-01-10',
    title: 'Advanced Prototyping Variables',
    type: 'Feature',
    summary: 'Figma added support for complex variable systems in prototypes with conditional logic.',
    why_it_matters: 'Reduces need for external prototyping tools, making Figma more comprehensive for design systems.',
    link: 'https://www.figma.com/releases/',
    content: 'Variables in prototypes now support conditional expressions...'
  }
];