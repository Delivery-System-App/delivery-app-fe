import { useState, useEffect } from "react";
import restaurantApi from "../api/restaurantApi";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    searchApi("pasta");
  }, []);

  const searchApi = async (searchTerm) => {
    try {
      const response = await restaurantApi.get("/filter/filter", {
        params: {
          // count: 50,
          // entity_id: 4,
          // entity_type: "city",
          dish: searchTerm,
        },
      });
      setResults(response.data);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return [searchApi, results, errorMessage];
};
