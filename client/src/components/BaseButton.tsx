import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface BaseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "inherit";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: React.CSSProperties;
}

const StyledButton = styled(Button)<{ sx?: React.CSSProperties }>(({ sx }) => ({
  ...sx, // Aplica estilos personalizados dinâmicos
}));

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  sx,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={sx}
    >
      {children}
    </StyledButton>
  );
};

export default BaseButton;
