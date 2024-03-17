import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  CustomTable,
  SidebarMenu,
  Pagination,
  Loading,
} from "../../components";
import { ContactService } from "../../service";
import { Contact } from "../../interface";

const ContactListPage = () => {
  const statusLabels: Record<number, string> = {
    1: "Pending",
    2: "Cancel",
    3: "Accepts",
    4: "Require Again",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns = [
    { id: "customerContractName", label: "Customer Name ", minWidth: 150 },
    {
      id: "title",
      label: "Title",
      minWidth: 150,
    },
    { id: "value", label: "Value", minWidth: 100 },
    { id: "pay", label: "Deposit", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      format: (value: number) => statusLabels[value],
    },
    {
      id: "id",
      label: "Action",
      minWidth: 170,
      format: (value: string) => (
        <IconButton onClick={() => onViewDetails(value)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];
  const fetchContacts = async () => {
    try {
      const response = await ContactService.getContactsByPage(currentPage);
      setContacts(response.items);
      setTotalPages(response.totalPagesCount - 1);
    } catch (error) {
      console.error("Failed to fetch vouchers");
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setLoading(true);

    fetchContacts();
    setLoading(false);
  }, [currentPage, searchTerm, date]);
  const [Contacts, setContacts] = useState<Contact[]>([]);
  const onViewDetails = (id: string) => {
    navigate(`${id}`);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contract List
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("add");
              }}
            >
              Contract Create
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Loading />
        ) : (
          <>
            <CustomTable columns={columns} data={Contacts} />
            <Pagination
              total={totalPages}
              selected={currentPage}
              onChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
export default ContactListPage;
