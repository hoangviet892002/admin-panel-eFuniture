import { Box, Button, Input } from "@mui/material";
import React, { useState } from "react";

interface ActionProps {
  id: string;
  handler: (id: string, name: string) => void;
}

const Action: React.FC<ActionProps> = ({ id, handler }) => {
  const [name, setName] = useState<string>("");

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input
        type="string"
        value={name}
        onChange={(e) => setName(String(e.target.value))}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="myForm-button"
        onClick={() => handler(id, name)}
      >
        Update
      </Button>
    </Box>
  );
};
export default Action;
