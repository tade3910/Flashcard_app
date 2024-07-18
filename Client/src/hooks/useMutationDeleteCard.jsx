import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

/**
 * Hook to delete a card
 * @returns deleted card
 */
function useMutationDeleteCard() {
  const queryClient = useQueryClient();

  const deleteCard = async (id) => {
    try {
      const url = `http://localhost:3100/card/${id}`;
      const data = axios.delete(url);
      return (await data).data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (id) => {
      return deleteCard(id);
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

export default useMutationDeleteCard;
