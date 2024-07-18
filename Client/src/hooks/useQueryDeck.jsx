import { useQuery } from "react-query";
import axios from "axios";

/**
 * Hook to get a deck by it's id
 * @param id : the id of the deck to get
 * @returns deck with associated id
 */
function useQueryDeck(id) {
  const queryKey = ["deck"];

  const getDeck = async () => {
    try {
      const url = `http://localhost:3100/deck/${id}`;
      const severReq = await axios.get(url);
      return severReq.data;
    } catch (err) {
      throw err;
    }
  };
  return {
    ...useQuery(queryKey, getDeck),
  };
}

export default useQueryDeck;
