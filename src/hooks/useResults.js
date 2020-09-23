import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../redux/actions";
import { notify } from "../../utils/notify";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    searchApi("pasta", "ernakulam");
  }, []);

  const searchApi = async (searchTerm, city) => {
    try {
      setLoading(true);
      dispatch(filter(searchTerm, city)).then((res) => {
        if (res !== undefined) {
          if (res.data) {
            setResults(res.data);
          }
          if (res.data.length > 0) {
            notify("Restaurants fetched!!");
          } else {
            notify("No restaurants matches your search!!");
          }
        }
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
  };

  return [searchApi, results, errorMessage, loading];
};
