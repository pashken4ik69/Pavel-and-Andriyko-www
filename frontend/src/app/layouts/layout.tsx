import { NavLink, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearUser } from "../../features/auth/model/user-slice";

function Layout() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <div>
      <nav className="header">
        <NavLink to={"/"}>Домой</NavLink>
        <NavLink to={"/register"}>Регистрация</NavLink>
        <NavLink to={"/login"}>Логин</NavLink>
        <NavLink to={"/spaces"}>Места</NavLink>
        <NavLink to={"/profile"}>Профиль</NavLink>
        <NavLink to={"/my-bookings"}>Мои брони</NavLink>
        <NavLink to={"/manage-bookings"}>Брони менеджера</NavLink>
        <a href="#" onClick={() => dispatch(clearUser())}>
          Выйти
        </a>
        <a href="#">{user?.name}</a>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
