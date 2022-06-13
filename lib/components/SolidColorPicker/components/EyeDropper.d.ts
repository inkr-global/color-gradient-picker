/// <reference types="react" />
interface EyeDropperProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    theme?: "light" | "dark";
}
declare const EyeDropper: ({ onClick, theme }: EyeDropperProps) => JSX.Element;
export default EyeDropper;
