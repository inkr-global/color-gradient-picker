import { Gradient, Point } from "./color";
import { ColorGradientPickerTheme } from "./colorGradientPicker";


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
  deleteDisabled: boolean;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd?: (id: number) => void;
}


export interface StopHoldersProps {
  stops: GradientStop[];
  minStops: number;
  limits: GradientLimits;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd?: (id: number) => void;
}


export interface PalletteProps {
  points: Point[];
  degree: number;
  onAddColor: (offset: number) => void;
  disabled?: boolean;
}


export interface GradientPickerProps {
  gradient: Gradient;
  onLinearGradientChange: (gradient: Gradient) => void;
  stopRemovalDrop?: number;
  maxStops?: number;
  minStops?: number;
  theme: ColorGradientPickerTheme;
}
