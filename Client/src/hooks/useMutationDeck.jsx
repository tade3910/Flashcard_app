import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to edit a deck's metadata
 * @returns edited deck
 */
function useMutationDeck() {
  const queryClient = useQueryClient();

  const addDeck = async (deck) => {
    try {
      const { id, name, tag, tTColor, tCColor, dTColor, dColor } = deck;
      const url = `http://localhost:3100/deck/${id}`;
      const data = await axios.put(url, {
        name,
        tag,
        tTColor,
        tCColor,
        dTColor,
        dColor,
      });
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (deck) => {
      return addDeck(deck);
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

export default useMutationDeck;
