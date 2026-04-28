import * as yup from "yup"

export const rewiewsCreateSchema = yup.object({
  spaceId: yup.string().required("Обязательное поле!"),
  text: yup.string().required("Обязательное поле!"),
  rating: yup.number().typeError("Должно быть числом!").required("Обязательное поле!"),
})
