import { object, string } from "yup";

export const accountSchema = object({
  name: string()
    .min(10, "Tên đăng nhập phải có ít nhất 8 ký tự")
    .max(24, "Tên đăng nhập chỉ được tối đa 24 ký tự")
    .required("Tên đăng nhập không được để trống"),
  password: string()
    .min(8, "Mật khẩu phải dài hơn 8 ký tự bao gồm: chữ hoa, chữ thường, và số")
    .lowercase(1, "Mật khẩu phải chứa ký tự viết thường")
    .uppercase(1, "Mật khẩu phải chứa ký tự viết hoa"),
  email: string().email(),
});

// parse and assert validity
