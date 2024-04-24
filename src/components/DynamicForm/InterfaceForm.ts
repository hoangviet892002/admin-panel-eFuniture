export interface FormField {
  type: "text" | "number" | "password" | "select" | "image" | "date" | "image1";
  name: string;
  label: string;
  options?: Array<{ label: string; value: string | number }>;
}

export interface FormValues {
  [key: string]: string | FileList | null | string[];
}
export interface FormProps {
  fields: FormField[];
  onSubmit: (values: any) => void;
}
export interface SelectedImages {
  [key: string]: string[];
}
