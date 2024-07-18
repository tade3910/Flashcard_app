import { Button, Card, Group, Stack, Textarea } from "@mantine/core";
import React from "react";
import useMutationCard from "../hooks/useMutationCard";
import { isNotEmpty, useForm } from "@mantine/form";

/**
 * Component to edit a card
 * @param id : id of the card to edit
 * @parm changeEdit : function to change state of parent page to false once card has been edited
 * @param changeCard: card that is edited in database
 * @returns AddCard
 */
function EditCard({ props, changeEdit, changeCard }) {
  const { cardMutation } = useMutationCard();

  const form = useForm({
    initialValues: {
      term: props.term,
      definition: props.definition,
    },
    validate: {
      term: isNotEmpty("Term cannot be blank"),
      definition: isNotEmpty("Definition cannot be blank"),
    },
  });

  /**
   * Edits card in database
   */
  const handleConfirm = () => {
    let mutatedCard = {
      id: props.id,
      term: form.getInputProps("term").value,
      definition: form.getInputProps("definition").value,
    };
    cardMutation.mutate(mutatedCard);
    changeEdit(false);
    changeCard(mutatedCard);
  };

  return (
    <form onSubmit={form.onSubmit(handleConfirm)}>
      <Card withBorder shadow="sm" radius="md" style={{ height: "30vh" }}>
        <Stack>
          <Textarea
            align="center"
            withAsterisk
            autosize
            label="term"
            {...form.getInputProps(`term`)}
          ></Textarea>

          <Textarea
            align="center"
            label="definition"
            withAsterisk
            autosize
            {...form.getInputProps("definition")}
          ></Textarea>
          <Card.Section>
            <Group position="center">
              <Button
                radius="lg"
                variant="light"
                type="submit"
                style={{ height: "5vh" }}
              >
                Confirm
              </Button>
              <Button
                radius="lg"
                variant="light"
                onClick={() => {
                  changeEdit(false);
                }}
                style={{ height: "5vh" }}
              >
                Cancel
              </Button>
            </Group>
          </Card.Section>
        </Stack>
      </Card>
    </form>
  );
}

export default React.memo(EditCard);
