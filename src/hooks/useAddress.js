import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filter, getUser } from "../redux/actions";
import { notify } from "../../utils/notify";

export default () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      setLoading(true);
      dispatch(getUser()).then((res) => {
        if (res && res.status === 200) {
          setResults(res.data.data.address);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  return [results];
};
