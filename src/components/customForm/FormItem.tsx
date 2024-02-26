import React from "react";
import { TextField } from "@mui/material";
import "./Form.css"; // Đường dẫn đến file CSS cho form

export interface FormItemProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      margin="normal"
      required
      fullWidth
      className="formItem"
    />
  );
};

export default FormItem;
