import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image" | "select";
  options?: Array<{ label: string; value: string | number }>;
  name?: string;
}

interface ObjectUpdateFormProps<T> {
  data: T;
  fields: Field<T>[];
  onSave: (updatedData: T) => void;
}

function ObjectUpdateForm<T>({
  data,
  fields,
  onSave,
}: ObjectUpdateFormProps<T>) {
  const [formData, setFormData] = useState<T>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (id: keyof T, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleFileChange = (id: keyof T, files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        handleChange(id, e.target?.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const renderInputField = (field: Field<T>) => {
    switch (field.type) {
      case "string":
      case "number":
        return (
          <TextField
            key={String(field.id)}
            type={field.type}
            margin="normal"
            required
            fullWidth
            id={String(field.id)}
            label={field.label}
            name={String(field.id)}
            value={(formData[field.id as keyof T] || "") as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            variant="outlined"
          />
        );
      case "image":
        return (
          <Box key={String(field.id)} sx={{ margin: "normal", width: "100%" }}>
            <label htmlFor={String(field.id)}>{field.label}</label>
            <input
              type="file"
              id={String(field.id)}
              name={String(field.id)}
              onChange={(e) => handleFileChange(field.id, e.target.files)}
              accept="image/*"
            />
            {formData[field.id] && (
              <Card sx={{ maxWidth: 345 }}>
                {" "}
                <CardMedia
                  component="img"
                  height="140"
                  image={formData[field.id] as string}
                  alt="Preview"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Image Preview
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        );
      case "select":
        return (
          <FormControl fullWidth margin="normal" key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={(formData[field.id as keyof T] || "") as string}
              label={field.label}
              onChange={(e) => handleChange(field.id, e.target.value as string)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {fields.map(renderInputField)}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Lưu
      </Button>
    </Box>
  );
}

export default ObjectUpdateForm;
