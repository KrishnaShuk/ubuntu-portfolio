export interface Contribution {
  id: string;
  repo: string; 
  description: string;
  url: string; 
}

export const contributions: Contribution[] = [
  {
    id: 'contrib-1',
    repo: 'layer5io',
    description: 'Fixed Styles and Spacing issues in interpreting-meshery-designs',
    url: 'https://github.com/layer5io/layer5/pull/6545',
  },
  {
    id: 'contrib-2',
    repo: 'meshery',
    description: 'Added unit/integration test for model view command in go',
    url: 'https://github.com/meshery/meshery/pull/15155',
  },
  {
    id: 'contrib-3',
    repo: 'layer5io',
    description: 'Corrected the redirection of sign-off on your commits link',
    url: 'https://github.com/layer5io/layer5/pull/6536',
  },
  {
    id: 'contrib-4',
    repo: 'Embedded Chat',
    description: 'Fixed Alt + Arrow Key Shortcuts Not Functioning in Message Navigation',
    url: 'https://github.com/RocketChat/EmbeddedChat/pull/991',
  },
  {
    id: 'contrib-4',
    repo: 'Embedded Chat',
    description: 'Fixed Improve GIF handling and display consistency in chat messages',
    url: 'https://github.com/RocketChat/EmbeddedChat/pull/984',
  },
];