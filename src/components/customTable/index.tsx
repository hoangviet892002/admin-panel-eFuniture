import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { StatusGraph } from "../../helpers";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any, row: any) => React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  onStatusChange?: (rowId: string, newStatus: number) => void;
  statusLabels?: Record<number, string>;
  statusGraph?: StatusGraph;
  onEdit?: (id: string) => void;
  onDelete?: (rowId: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  onStatusChange,
  statusLabels,
  statusGraph,
  onEdit,
  onDelete,
}) => {
  const handleChangeStatus = (rowId: string, newStatus: number) => {
    onStatusChange?.(rowId, newStatus);
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onStatusChange || statusGraph) && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.format ? column.format(value, row) : value}
                    </TableCell>
                  );
                })}

                {(onStatusChange || statusGraph) && (
                  <TableCell>
                    {statusGraph && (
                      <Select
                        value={row.status ? row.status : row.role}
                        onChange={(event) =>
                          handleChangeStatus(row.id, Number(event.target.value))
                        }
                        name={row.status ? "status" : "role"}
                      >
                        {statusGraph
                          .getNextStates(row.status ? row.status : row.role)
                          .map((nextState) => (
                            <MenuItem key={nextState} value={nextState}>
                              {statusLabels
                                ? statusLabels[nextState]
                                : nextState}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  </TableCell>
                )}
                {(onEdit || onDelete) && (
                  <TableCell>
                    {onEdit && (
                      <IconButton onClick={() => onEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton onClick={() => onDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;
