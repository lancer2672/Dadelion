import { object, string, ref } from "yup";
export const accountSchema = object({
  username: string()
    .trim("Tên đăng nhập không được chứa khoảng trắng")
    .required("Tên đăng nhập không được để trống")
    .min(8, "Tên đăng nhập phải có ít nhất 8 ký tự")
    .max(24, "Tên đăng nhập chỉ được tối đa 24 ký tự"),
  password: string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 ký tự ")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa và 1 chữ số"
    ),
  confirmPassword: string()
    .required("Mật khẩu không được để trống")
    .oneOf([ref("password")], "Mật khẩu không trùng khớp"),
  email: string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
});

export const nameSchema = object({
  firstname: string()
    .required("Không được để trống")
    .trim("Tên không được chứa khoảng trắng")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "Tên không được chứa ký tự đặc biệt"
    ),
  lastname: string()
    .required("Không được để trống")
    .trim("Tên không được chứa khoảng trắng")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "Tên không được chứa ký tự đặc biệt"
    ),
});

export const ageLimit = 13;
