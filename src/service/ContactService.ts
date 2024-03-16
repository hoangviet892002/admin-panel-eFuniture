import axios from "axios";
import { toast } from "react-toastify";
import { Contact, Appointment, Status, OrderProcessing } from "../interface";

const API_URL = process.env.REACT_APP_API + `/Contract`;
const initialContacts: Contact[] = [
  {
    id: "33",
    description: "Gia công vài đồ",
    title: "Gia công vài đồ",
    nameCustomer: "Khách khứa",
    pay: 100,
    status: 1,
    value: 2000,
  },
  {
    id: "332",
    description: "Gia công vài đồ",
    title: "Gia công vài đồ",
    nameCustomer: "Khách khứa",
    pay: 100,
    status: 1,
    value: 2000,
  },
  {
    id: "3333",
    description: "Gia công vài đồ",
    title: "Gia công vài đồ",
    nameCustomer: "Khách khứa",
    pay: 100,
    status: 1,
    value: 2000,
  },
];

const contact: Contact = {
  id: "33",
  description: "Gia công vài đồ",
  title: "Gia công vài đồ",
  nameCustomer: "Khách khứa",
  pay: 100,
  status: 4,
  value: 2000,
};
const initialStatus: Status[] = [
  { id: "2", date: "14/2/2002", status: 1 },
  { id: "23", date: "23/2/2002", status: 2 },
  { id: "222", date: "24/2/2002", status: 3 },
];
const initialItem: OrderProcessing[] = [
  {
    id: "2131",
    name: "Loli 1",
    price: 2313,
    quantity: 3124,
    status: 1,
  },
];
class ContactService {
  static async getContactsByPage(page: number) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(
        `${API_URL}/GetContractsByPage?pageIndex=${page}&pageSize=10`
      );
      if (response.data.isSuccess === true) {
        response.data.data.items.map((item: any) => {
          item.id = item.contractID;
          item.status = item.statusContract;
        });
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getTotalPages(searchName: string, date: string) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/Contacts/total-pages`, {
        params: { searchName },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async createContact(
    idCustomer: string,
    item: any[],
    form: any,
    value: number,
    pay: number
  ) {
    item.map((item) => {
      item.productId = item.idProduct;
    });
    console.log(item);

    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.post(`${API_URL}/CreateContract`, {
        customerId: idCustomer,
        title: form.title,
        description: form.description,
        value: value,
        pay: pay,
        phoneNumber: form.phoneNumber,
        email: form.email,
        address: form.address,
        name: form.name,
        items: item,
      });
      if (response.data.isSuccess === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async deleteContact(ContactId: string) {
    toast.success(`Deleted Contact with ID: ${ContactId}`);
    return 0;
    try {
      const response = await axios.delete(`${API_URL}/Contacts/${ContactId}`);
      if (response.data.success !== true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  }

  static async updateContact(ContactData: Contact) {
    toast.success(`Updated Contact with ID: ${ContactData.id}`);
    return;
    try {
      const response = await axios.put(
        `${API_URL}/Contacts/${ContactData.id}`,
        ContactData
      );
      if (response.data.success !== true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getContactById(ContactId: string) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.get(
        `${API_URL}/GetContractItem?contractId=${ContactId}`
      );
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  static async getContactStatus(orderId: string) {
    return initialStatus;
  }
  static async getContactItem(orderId: string) {
    return initialItem;
  }
}

export { ContactService as default };
