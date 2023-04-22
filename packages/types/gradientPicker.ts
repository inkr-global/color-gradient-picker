import { Gradient, Point } from "./color";

export interface GradientStop extends Point {
  isActive: boolean;
  pointX?: number;
}

export interface GradientLimits {
  min: number;
  max: number;
  drop?: number;
}

export interface ColorStopProps {
  stop: GradientStop;
  limits: GradientLimits;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: (id: number) => void;
  theme?: "light" | "dark";
}

export interface StopHoldersProps {
  stops: GradientStop[];
  limits: GradientLimits;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: (id: number) => void;
  theme?: "light" | "dark";
}

export interface PalletteProps {
  points: Point[];
  degree: number;
  onAddColor: (offset: number) => void;
  disabled?: boolean;
  theme?: "light" | "dark";
}

export interface GradientPickerProps {
  gradient : Gradient;
  onLinearGradientChange: (gradient: Gradient) => void;
  stopRemovalDrop?: number;
  maxStops?: number;
  minStops?: number;
  theme?: "light" | "dark";
}
