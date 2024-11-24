import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

interface BaseInputProps {
  label?: string;
  type?: string; // Tipo de input: text, number, email, password, etc.
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number; // Número de linhas para inputs multiline
  error?: boolean;
  helperText?: string; // Texto de ajuda ou de erro
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  sx?: React.CSSProperties; // Estilização dinâmica
  InputProps?: object; // Props extras para o campo input
}

const StyledTextField = styled(TextField)<{
  sx?: React.CSSProperties;
}>(({ sx }) => ({
  ...sx, // Aplica estilos personalizados dinâmicos
}));

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  fullWidth = false,
  disabled = false,
  multiline = false,
  rows,
  error = false,
  helperText,
  size = "medium",
  variant = "outlined",
  sx,
  InputProps,
}) => {
  return (
    <StyledTextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      error={error}
      helperText={helperText}
      size={size}
      variant={variant}
      sx={sx}
      InputProps={InputProps}
    />
  );
};

export default BaseInput;
