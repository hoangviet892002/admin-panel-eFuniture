import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  FormField,
  FormProps,
  FormValues,
  SelectedImages,
} from "./InterfaceForm";
import "./MyForm.css";
const MyForm: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [selectedImages, setSelectedImages] = useState<SelectedImages>({});

  const handleChange = (name: string, value: string | FileList) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Xử lý chọn hình ảnh
    if (name === "image" && value instanceof FileList && value.length > 0) {
      const fileURL = URL.createObjectURL(value[0]);
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [name]: fileURL,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "number":
      case "password":
        return (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case "select":
        return (
          <FormControl fullWidth margin="normal" key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              label={field.label}
              onChange={(e) =>
                handleChange(field.name, e.target.value as string)
              }
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "image":
        return (
          <Box marginY={2} key={field.name}>
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <input
              type="file"
              id={field.name}
              multiple
              onChange={(e) =>
                handleChange(field.name, e.target.files as FileList)
              }
            />
            {selectedImages[field.name] && (
              <Box mt={2}>
                <img
                  src={selectedImages[field.name]}
                  alt="Selected"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </Box>
            )}
          </Box>
        );

      case "date":
        return (
          <TextField
            key={field.name}
            label={field.label}
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="myForm-container">
      {fields.map((field, index) => (
        <div key={index} className="myForm-field">
          {renderField(field)}
        </div>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="myForm-button"
      >
        Submit
      </Button>
    </form>
  );
};

export default MyForm;
