export type Capability = {
  title: string;
  description: string;
  score: number;
  radarLabel: string;
};

export type PortfolioProject = {
  id: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  highlights: readonly string[];
  links?: readonly {
    label: string;
    href: string;
  }[];
};

export type ExperienceEntry = {
  id: string;
  kind: '工作' | '实习' | '教育';
  title: string;
  period: string;
  start: readonly [year: number, month: number];
  end: readonly [year: number, month: number];
  location?: string;
  tags: readonly string[];
  highlights: readonly string[];
};
