import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Field<T> {
  id: keyof T;
  label: string;
  type: "string" | "number" | "image";
}

interface ObjectUpdateFormProps<T> {
  data: T;
  fields: Field<T>[];
}

function ObjectDisplayForm<T>({ data, fields }: ObjectUpdateFormProps<T>) {
  const [formData, setFormData] = useState<T>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

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
      default:
        return null;
    }
  };
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      {fields.map(renderInputField)}
    </Box>
  );
}

export default ObjectDisplayForm;
