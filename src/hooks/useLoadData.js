import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();

        const user = data?.data || data;

        if (user) {
          const { _id, name, email, phone, role } = user;
          dispatch(setUser({ _id, name, email, phone, role }));
        }
      } catch (error) {
        console.error("Auth session expired or invalid:", error);
        dispatch(removeUser());

        if (location.pathname !== "/auth") {
          navigate("/auth", { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return isLoading;
};

export default useLoadData;
