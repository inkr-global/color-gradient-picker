import { Rgb } from "../../utils/colorTypes";

export interface GradientStop {
  id: number;
  color: Rgb;
  alpha: number;
  offset: number;
  isActive: boolean;
  pointX?: number;
}

export interface GradientLimits {
  min: number;
  max: number;
  drop?: number;
}

export interface PalletteColor {
  id: number;
  color: Rgb;
  alpha: number;
  offset: number;
}

export interface ColorStopProps {
  stop: GradientStop;
  limits: GradientLimits;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: (id: number) => void;
}

export interface StopHoldersProps {
  stops: GradientStop[];
  limits: GradientLimits;
  disabled?: boolean;
  onPosChange: (id: number, offset: number) => void;
  onAddColor: (offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: (id: number) => void;
}

export interface PalletteProps {
  palette: PalletteColor[];
  degree: number;
}

export interface GradientPickerProps {
  palette: PalletteColor[];
  degree: number;
  activeStopId?: number;
  stopRemovalDrop?: number;
  maxStops?: number;
  minStops?: number;
  onPaletteChange: (palette: PalletteColor[]) => void;
  onColorStopSelect: (color: PalletteColor) => void;
}
