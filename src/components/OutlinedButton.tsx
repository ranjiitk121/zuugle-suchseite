import { darken, lighten, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type OutlinedButtonProps = ButtonProps & {
  buttonColor?: string;
};

export const OutlinedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "buttonColor",
})<OutlinedButtonProps>(({ theme, buttonColor }) => {
  const color = buttonColor ?? theme.palette.primary.main;

  return {
    backgroundColor: lighten(color, 0.9),
    color,
    height: 40,
    fontWeight: 700,
    transition: "all 0.2s ease-in-out",
    boxShadow: `0 1px 4px ${lighten(color, 0.7)}`,
    "&:hover": {
      backgroundColor: lighten(color, 0.84),
      borderColor: color,
      boxShadow: `0 2px 8px ${lighten(color, 0.62)}`,
      color: darken(color, 0.08),
    },
  };
});
