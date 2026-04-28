import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../model/user-scheme";
import type { IUserLog } from "../model/users-type";
import { useLoginMutation } from "../api/usersApi";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/store/store";
import { addUser } from "../model/user-slice";

function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (user: IUserLog) => {
    const res = await login(user).unwrap();
    dispatch(addUser(res));
    navigate("/spaces");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(submitHandler)}>
      <label>
        Email:
        <input
          placeholder="Введите имя"
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

      <button type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;
