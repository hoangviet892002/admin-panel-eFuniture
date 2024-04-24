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
    if (value instanceof FileList) {
      // Create file URLs from the new files and append them to the existing files
      const newFileURLs = Array.from(value).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [name]: [...(prevImages[name] || []), ...newFileURLs],
      }));

      setFormValues((prevValues: any) => ({
        ...prevValues,
        [name]: [...(prevValues[name] || []), ...Array.from(value)],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (fieldName: string, index: number) => {
    setSelectedImages((prev) => {
      const updatedImages = [...prev[fieldName]];
      updatedImages.splice(index, 1);
      return { ...prev, [fieldName]: updatedImages };
    });

    setFormValues((prev: any) => {
      const updatedFiles = prev[fieldName] ? [...prev[fieldName]] : [];
      updatedFiles.splice(index, 1);

      return { ...prev, [fieldName]: updatedFiles };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };
  const renderImages = (images: any, fieldName: string) => {
    return images.map((src: any, index: any) => (
      <Box key={index} position="relative" display="inline-block" m={1}>
        <img
          src={src}
          alt={`Selected ${index}`}
          style={{ maxWidth: "200px", height: "auto" }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemoveImage(fieldName, index)}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          Remove
        </Button>
      </Box>
    ));
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
              hidden
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => {
                const fileInput = document.getElementById(
                  field.name
                ) as HTMLInputElement;
                if (fileInput) fileInput.click();
              }}
            >
              Add Images
            </Button>
            {selectedImages[field.name] && (
              <Box mt={2}>
                {selectedImages[field.name]
                  ? renderImages(selectedImages[field.name], field.name)
                  : null}
              </Box>
            )}
          </Box>
        );

      case "image1":
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
              hidden
            />
            {selectedImages[field.name] && (
              <Box position="relative" display="inline-block" m={1}>
                <img
                  src={
                    selectedImages[field.name][
                      selectedImages[field.name].length - 1
                    ]
                  }
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => {
                const fileInput = document.getElementById(
                  field.name
                ) as HTMLInputElement;
                if (fileInput) fileInput.click();
              }}
            >
              Choose Image
            </Button>
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
