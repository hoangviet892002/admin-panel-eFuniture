import React, { useState } from "react";
import { IconButton, Input, InputAdornment, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface AmountActionProps {
  id: string;
  onAdd: (rowId: string, amount: number) => void;
  onSubtract: (rowId: string, amount: number) => void;
}

const AmountAction: React.FC<AmountActionProps> = ({
  id,
  onAdd,
  onSubtract,
}) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <IconButton onClick={() => onAdd(id, amount)} aria-label="add">
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => onSubtract(id, amount)} aria-label="subtract">
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};
export default AmountAction;
