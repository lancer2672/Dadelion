import { object, string, ref } from "yup";
export const accountSchema = object({
  username: string()
    .required("Tên đăng nhập không được để trống")
    .min(8, "Tên đăng nhập phải có ít nhất 8 ký tự")
    .max(24, "Tên đăng nhập chỉ được tối đa 24 ký tự"),
  password: string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 ký tự "),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")], "Mật khẩu không trùng khớp"),
  email: string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
});

// parse and assert validity
