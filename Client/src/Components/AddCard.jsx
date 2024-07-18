import { Button, Card, Group, Stack, Textarea } from "@mantine/core";
import React from "react";
import useMutationCreateCard from "../hooks/useMutationCreateCard";
import { isNotEmpty, useForm } from "@mantine/form";

/**
 * Component to add new card to a deck.
 * @param id : id of the deck card to be added is associated with
 * @parm changeAdding : function to change state of parent page to false once card has been
 *                      added to database
 * @param changeCard: card that is added to database
 * @returns AddCard
 */
function AddCard({ id, changeAdding, changeCard }) {
  const form = useForm({
    initialValues: {
      deckId: id,
      term: "",
      definition: "",
    },
    validate: {
      term: isNotEmpty("Term cannot be empty"),
      definition: isNotEmpty("Definition cannot be empty"),
    },
  });

  const { cardMutation } = useMutationCreateCard();
  /**
   * Adds card to database
   */
  const handleConfirm = () => {
    let mutatedCard = {
      deckId: form.values.deckId,
      term: form.values.term,
      definition: form.values.definition,
    };
    cardMutation.mutate(mutatedCard);
    changeAdding(false);
    changeCard(mutatedCard);
  };

  return (
    <form onSubmit={form.onSubmit(handleConfirm)}>
      <Card withBorder shadow="sm" radius="md" style={{ height: "30vh" }}>
        <Stack>
          <Card.Section>
            <Group position="right">
              <Button
                radius="lg"
                color="red"
                onClick={() => {
                  changeAdding(false);
                }}
                style={{ height: "5vh" }}
              >
                Cancel
              </Button>
              <Button
                radius="lg"
                variant="light"
                type="submit"
                style={{ height: "5vh" }}
              >
                Confirm
              </Button>
            </Group>
          </Card.Section>
          <Textarea
            align="center"
            withAsterisk
            autosize
            label="term"
            {...form.getInputProps("term")}
          ></Textarea>

          <Textarea
            align="center"
            label="definition"
            withAsterisk
            autosize
            {...form.getInputProps("definition")}
          ></Textarea>
        </Stack>
      </Card>
    </form>
  );
}

export default React.memo(AddCard);
