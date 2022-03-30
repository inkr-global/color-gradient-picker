import { VALUE_COLOR_TYPE } from "../../types";
import s from "./ColorTypeSelect.module.css";

interface ColorTypeSelectProps {
  value: VALUE_COLOR_TYPE;
  onChange: (value: VALUE_COLOR_TYPE) => void;
}

const ColorTypeSelect = ({ value, onChange }: ColorTypeSelectProps) => {
  return (
    <>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4294 0.714828H0.715123C0.636551 0.714828 0.572266 0.779114 0.572266 0.857686V3.1434C0.572266 3.22197 0.636551 3.28626 0.715123 3.28626H1.71512C1.79369 3.28626 1.85798 3.22197 1.85798 3.1434V2.00054H4.85798V12.0005H3.21512C3.13655 12.0005 3.07227 12.0648 3.07227 12.1434V13.1434C3.07227 13.222 3.13655 13.2863 3.21512 13.2863H7.92941C8.00798 13.2863 8.07227 13.222 8.07227 13.1434V12.1434C8.07227 12.0648 8.00798 12.0005 7.92941 12.0005H6.28655V2.00054H9.28655V3.1434C9.28655 3.22197 9.35084 3.28626 9.42941 3.28626H10.4294C10.508 3.28626 10.5723 3.22197 10.5723 3.1434V0.857686C10.5723 0.779114 10.508 0.714828 10.4294 0.714828ZM15.3008 10.4648H14.1437V3.53626H15.3008C15.408 3.53626 15.4687 3.41126 15.4026 3.32733L13.6026 1.04876C13.5907 1.03334 13.5754 1.02085 13.5579 1.01227C13.5404 1.00368 13.5212 0.999211 13.5017 0.999211C13.4822 0.999211 13.463 1.00368 13.4455 1.01227C13.428 1.02085 13.4128 1.03334 13.4008 1.04876L11.6008 3.32733C11.5858 3.34639 11.5765 3.3693 11.5739 3.39341C11.5714 3.41753 11.5756 3.44189 11.5862 3.4637C11.5969 3.4855 11.6134 3.50387 11.634 3.51671C11.6546 3.52954 11.6784 3.53632 11.7026 3.53626H12.858V10.4648H11.7008C11.5937 10.4648 11.533 10.5898 11.5991 10.6738L13.3991 12.9505C13.4508 13.0166 13.5508 13.0166 13.6008 12.9505L15.4008 10.6738C15.416 10.6549 15.4254 10.6321 15.4282 10.6081C15.431 10.584 15.4269 10.5597 15.4164 10.5379C15.406 10.5161 15.3896 10.4976 15.3692 10.4847C15.3487 10.4718 15.325 10.4649 15.3008 10.4648Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>

      <select
        className={s.select}
        value={value}
        onChange={(e) => {
          onChange(e.target.value as VALUE_COLOR_TYPE);
        }}
        style={{ width: value === VALUE_COLOR_TYPE.GRADIENT ? 60 : 40 }}
      >
        <option value={VALUE_COLOR_TYPE.SOLID}>Solid</option>
        <option value={VALUE_COLOR_TYPE.GRADIENT}>Gradient</option>
      </select>

      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.23656 0.42865H7.48321C7.43199 0.42865 7.38377 0.453762 7.35364 0.494945L4.49995 4.42843L1.64627 0.494945C1.61614 0.453762 1.56792 0.42865 1.51669 0.42865H0.763346C0.698056 0.42865 0.659886 0.50298 0.698056 0.556217L4.2398 5.43892C4.36837 5.6157 4.63154 5.6157 4.75911 5.43892L8.30085 0.556217C8.34002 0.50298 8.30185 0.42865 8.23656 0.42865Z"
          fill="#8C8C8C"
        />
      </svg>
    </>
  );
};

export default ColorTypeSelect;
