import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "../model/user-scheme";
import type { IUserReg } from "../model/users-type";
import { useRegisterMutation } from "../api/usersApi";
import { useNavigate } from "react-router";

function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [registration] = useRegisterMutation();
  const navigate = useNavigate();

  const submitHandler = async (user: IUserReg) => {
    await registration(user).unwrap();
    navigate("/login");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(submitHandler)}>
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

      <label>
        Повторите пароль:
        <input
          placeholder="Повторите пароль"
          style={errors.rpassword ? { borderColor: "red" } : undefined}
          type="password"
          {...register("rpassword")}
        />
        {errors.rpassword && (
          <p className="error">{errors.rpassword.message}</p>
        )}
      </label>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegisterForm;
