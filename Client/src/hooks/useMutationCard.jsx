import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to edit a card in database
 * @returns new edited card
 */
function useMutationCard() {
  const queryClient = useQueryClient();

  const addCard = async (card) => {
    try {
      const { id, term, definition } = card;
      const url = `http://localhost:3100/card/${id}`;
      const data = await axios.put(url, { term, definition });
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
      },
    }
  );

  return {
    cardMutation: mutation,
  };
}

export default useMutationCard;
