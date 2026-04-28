import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
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
  } = useForm<IUserUpdate>({
    resolver: yupResolver(updateUserSchema) as any,
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const submitHandler: SubmitHandler<IUserUpdate> = async (data) => {
    try {
      await updateMe(data).unwrap();
      alert("Данные успешно обновлены!");
    } catch (err: any) {
      alert(err.data?.message || "Ошибка при обновлении профиля");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(submitHandler)}>
      <h2>Настройки профиля</h2>
      
      <div className="field">
        <label>Имя:</label>
        <input
          placeholder="Введите имя"
          style={errors.name ? { border: "1px solid red"} : undefined}
          type="text"
          {...register("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label>Email:</label>
        <input
          placeholder="Введите email"
          style={errors.email ? { border: "1px solid red"} : undefined}
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="field">
        <label>Новый пароль (необязательно):</label>
        <input
          placeholder="Введите новый пароль"
          style={errors.password ? { border: "1px solid red"} : undefined}
          type="password"
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Сохранить изменения"}
      </button>
    </form>
  );
}

export default ProfileForm;
