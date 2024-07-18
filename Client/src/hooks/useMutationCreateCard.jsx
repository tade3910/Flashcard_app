import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to create new card in database
 * @returns new card
 */
function useMutationCreateCard() {
  const queryClient = useQueryClient();

  const addCard = async (card) => {
    try {
      const { term, definition, deckId } = card;
      const url = "http://localhost:3100/card";
      const data = await axios.post(url, { term, definition, deckId });
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (card) => {
      return addCard(card);
    },
    {
      onSuccess: (card) => {
        queryClient.setQueryData(["card"], () => {
          return card;
        });
        queryClient.invalidateQueries();
      },
    }
  );

  return {
    cardMutation: mutation,
  };
}

export default useMutationCreateCard;
