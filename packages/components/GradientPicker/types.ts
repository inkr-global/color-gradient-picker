export interface GradientStop {
  id: number;
  color: string;
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
  color: string;
  offset: number;
  alpha?: number;
}

export interface ColorStopProps {
  stop: GradientStop;
  limits: GradientLimits;
  onPosChange: (id: number, offset: number) => void;
  onAddColor: (offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
}

export interface StopHoldersProps {
  width: number;
  stops: GradientStop[];
  limits: GradientLimits;
  disabled?: boolean;
  onPosChange: (id: number, offset: number) => void;
  onAddColor: (offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  // onDragEnd: () => void;
}

export interface PalletteProps {
  palette: PalletteColor[];
  degree: number;
}

export interface GradientPickerProps {
  palette: PalletteColor[];
  degree: number;
  onPaletteChange: (palette: PalletteColor[]) => void;
  onColorStopSelect: (color: PalletteColor) => void;
  stopRemovalDrop?: number;
  maxStops?: number;
  minStops?: number;
}
