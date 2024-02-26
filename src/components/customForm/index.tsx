import React from "react";
import { Button, Box, Container, Typography, Paper } from "@mui/material";

import FormItem, { FormItemProps } from "./FormItem";
interface FormProps {
  formData: FormItemProps[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

const Form: React.FC<FormProps> = ({ formData, onSubmit, buttonText }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          {formData.map((item, index) => (
            <FormItem
              key={index}
              label={item.label}
              name={item.name}
              type={item.type}
              value={item.value}
              onChange={(e) => item.onChange(e)}
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {buttonText}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Form;
