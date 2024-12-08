import { redirect } from "react-router-dom";

// const Logout = () => {
//   // const logoutHandler = () => {
//   //   localStorage.removeItem("token");
//   //   localStorage.removeItem("expirationTime");
//   // };

//   return redirect("/");
// };

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");

  redirect("/");
}

// export default Logout;
