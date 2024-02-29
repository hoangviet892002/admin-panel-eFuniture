import { Box, Button, Input } from "@mui/material";
import React, { useState } from "react";

interface ActionProps {
  id: string;
  handler: (id: string, quantity: number) => void;
}

const Action: React.FC<ActionProps> = ({ id, handler }) => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="myForm-button"
        onClick={() => handler(id, quantity)}
      >
        Update
      </Button>
    </Box>
  );
};
export default Action;
