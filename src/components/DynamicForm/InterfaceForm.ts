export interface FormField {
  type: "text" | "number" | "password" | "select" | "image" | "date";
  name: string;
  label: string;
  options?: Array<{ label: string; value: string | number }>;
  // Các thuộc tính khác...
}

export interface FormValues {
  [key: string]: string | FileList | null; // Thêm null để xử lý trường hợp không có file được chọn
}
export interface FormProps {
  fields: FormField[];
  onSubmit: (values: any) => void; // Sử dụng any cho mục đích demo, bạn có thể cụ thể hóa kiểu dữ liệu nếu muốn
}
export interface SelectedImages {
  [key: string]: string; // Key là tên trường, giá trị là URL của hình ảnh
}
