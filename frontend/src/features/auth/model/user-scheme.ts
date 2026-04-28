import * as yup from "yup"

export const registerSchema = yup.object({
  name: yup.string().required("Обязательное поле!"),
  email: yup.string().email("Неверный формат Email!").required("Обязательное поле!"),
  password: yup.string().required("Обязательное поле!"),
  rpassword: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают!").required("Обязательное поле!"),
})

export const updateUserSchema = yup.object({
  name: yup.string().required("Обязательное поле!"),
  email: yup.string().email("Неверный формат Email!").required("Обязательное поле!"),
  password: yup.string(),
})

export const loginSchema = yup.object({
  email: yup.string().email("Неверный формат Email!").required("Обязательное поле!"),
  password: yup.string().required("Обязательное поле!"),
})