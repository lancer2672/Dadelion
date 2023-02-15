import { object, string } from "yup";

export const accountSchema = object({
  password: string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 ký tự "),
  name: string()
    .required("Tên đăng nhập không được để trống")
    .min(10, "Tên đăng nhập phải có ít nhất 8 ký tự")
    .max(24, "Tên đăng nhập chỉ được tối đa 24 ký tự"),
  email: string().email("Email không hợp lệ"),
});

// parse and assert validity
