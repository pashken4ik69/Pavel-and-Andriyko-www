import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdateMeMutation } from "../api/usersApi";
import type { IUserUpdate } from "../model/users-type";
import { updateUserSchema } from "../model/user-scheme";
import { useAppSelector } from "../../../app/store/store";

function ProfileForm() {
  const { user } = useAppSelector((state) => state.auth);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const [updateMe] = useUpdateMeMutation();

  const submitHandler = async (user: IUserUpdate) => {
    await updateMe(user).unwrap();
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <label>
        Имя:
        <input
          placeholder="Введите имч"
          style={errors.name ? { borderColor: "red" } : undefined}
          type="text"
          {...register("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label>
        Email:
        <input
          placeholder="Введите email"
          style={errors.email ? { borderColor: "red" } : undefined}
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      <label>
        Пароль:
        <input
          placeholder="Введите пароль"
          style={errors.password ? { borderColor: "red" } : undefined}
          type="password"
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <button type="submit">сохранить</button>
    </form>
  );
}

export default ProfileForm;
