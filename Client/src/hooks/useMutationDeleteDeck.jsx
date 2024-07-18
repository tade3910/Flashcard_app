import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to delete a deck
 * @returns delete deck
 */
function useMutationDeleteDeck() {
  const queryClient = useQueryClient();

  const removeDeck = async (id) => {
    try {
      const url = `http://localhost:3100/deck/${id}`;
      const data = await axios.delete(url);
      return (await data).data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (id) => {
      return removeDeck(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("deck");
      },
    }
  );

  return {
    deckMutation: mutation,
  };
}

export default useMutationDeleteDeck;
