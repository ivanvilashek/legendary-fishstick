import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate(ROUTES.LOGIN);
    }
  });

  return <h1 style={{ textAlign: "center" }}>Home page</h1>;
};
