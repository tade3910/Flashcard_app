import { useQuery } from "react-query";
import axios from "axios";

/**
 * Gets all decks in the database
 * @returns all decks
 */
function useQueryDecks() {
  const queryKey = ["deck"];

  const getDeck = async () => {
    try {
      const url = "http://localhost:3100/deck";
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

export default useQueryDecks;
