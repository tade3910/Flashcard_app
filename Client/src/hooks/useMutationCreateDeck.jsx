import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to create new deck
 * @returns deck created in database
 */
function useMutationCreateDeck() {
  const queryClient = useQueryClient();

  const addDeck = async (deck) => {
    try {
      const { name, tag, cards, tTColor, tCColor, dTColor, dColor } = deck;
      const url = "http://localhost:3100/deck";
      const data = await axios.post(url, {
        name,
        tag,
        cards,
        tTColor,
        tCColor,
        dTColor,
        dColor,
      });
      return (await data).data;
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

export default useMutationCreateDeck;
