export interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  ariaLabel?: string;
}
