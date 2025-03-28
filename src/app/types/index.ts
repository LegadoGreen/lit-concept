export interface ImpactMetricProps {
  value: number | string;
  label: string;
}

export interface ConditionProps {
  value: string;
  label: string;
}

export interface AchievementProps {
  title: string;
  region: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface CardProps {
  serialNumber: string;
  metrics: ImpactMetricProps[];
  conditions: ConditionProps[];
  achievements: AchievementProps[];
  mintDate?: string;
}

export interface ParticleProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
}
