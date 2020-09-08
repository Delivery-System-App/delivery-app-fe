import { useState, useEffect } from "react";
import restaurantApi from "../api/restaurantApi";
import { useDispatch } from "react-redux";
import { filter } from "../redux/actions";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    searchApi("pasta");
  }, []);

  const searchApi = async (searchTerm) => {
    try {
      dispatch(filter([searchTerm])).then((res) => {
        if (res.data) {
          setResults(res.data);
          console.log(res.data);
        }
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return [searchApi, results, errorMessage];
};
