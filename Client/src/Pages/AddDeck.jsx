import {
  Button,
  Stack,
  Card,
  Group,
  Textarea,
  Center,
  TextInput,
  SimpleGrid,
  Space,
  ColorInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, Navigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import useMutationCreateDeck from "../hooks/useMutationCreateDeck";
import { useState } from "react";
import ColorPreview from "../Components/ColorPreview";

/**
 * Page to create new deck
 * @returns AddDeck
 */
function AddDeck() {
  const [redirect, setRedirect] = useState(false);
  const { deckMutation } = useMutationCreateDeck();

  //Needs to rerorute to home when submited

  const form = useForm({
    initialValues: {
      ttColor: "#000000",
      dtColor: "#000000",
      tcColor: "#ffffff",
      dcColor: "#ffffff",
      cards: [
        {
          term: "",
          definition: "",
        },
      ],
      name: "",
      tag: "",
    },
    validate: {
      name: isNotEmpty("Name cannot be empty"),
      cards: {
        term: isNotEmpty("Term cannot be empty"),
        definition: isNotEmpty("Definition cannot be empty"),
      },
      ttColor: isNotEmpty("You must enter a color"),
      dtColor: isNotEmpty("You must enter a color"),
      tcColor: isNotEmpty("You must enter a color"),
      dcColor: isNotEmpty("You must enter a color"),
    },
  });

  /**
   * Adds deck to database
   */
  const handleSubmit = async () => {
    const addedDeck = {
      name: form.values.name,
      tag: form.values.tag,
      cards: form.values.cards,
      tTColor: form.values.ttColor,
      tCColor: form.values.tcColor,
      dTColor: form.values.dtColor,
      dColor: form.values.dcColor,
    };
    deckMutation.mutate(addedDeck);
    setRedirect(true);
  };

  /**
   * Removes card with indicated index from form
   * @param index is index of card to remove
   */
  const handleDelete = (index) => {
    if (form.values.cards.length <= 1) {
      showNotification({
        title: "Length error",
        message: "A deck must have at least one card",
        color: "red",
      });
    } else {
      form.removeListItem("cards", index);
    }
  };

  /**
   * Adds card to form
   */
  const handleAdd = () => {
    form.insertListItem("cards", { term: "", definition: "" });
  };

  /**
   * Redirects user to homepage when deck is submitted
   * @returns Navigate component
   */
  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {renderRedirect()}
      <Stack>
        <Group position="center">
          <SimpleGrid cols={2}>
            <TextInput
              {...form.getInputProps("name")}
              label="Name"
              withAsterisk
              variant="filled"
            ></TextInput>
            <TextInput
              {...form.getInputProps("tag")}
              label="Tag"
              variant="filled"
            ></TextInput>
            <ColorInput
              label="Term text color"
              withAsterisk
              variant="filled"
              {...form.getInputProps("ttColor")}
            ></ColorInput>
            <ColorInput
              label="Term card color"
              withAsterisk
              variant="filled"
              {...form.getInputProps("tcColor")}
            ></ColorInput>
            <ColorInput
              label="Definition text color"
              withAsterisk
              variant="filled"
              {...form.getInputProps("dtColor")}
            ></ColorInput>
            <ColorInput
              label="Definition card color"
              withAsterisk
              variant="filled"
              {...form.getInputProps("dcColor")}
            ></ColorInput>
          </SimpleGrid>
          <ColorPreview
            ttColor={form.values.ttColor}
            dtColor={form.values.dtColor}
            tcColor={form.values.tcColor}
            dcColor={form.values.dcColor}
          ></ColorPreview>
        </Group>

        <Stack>
          {form.values.cards.map((currentCard, index) => (
            <Center key={index}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                key={index}
                style={{ width: "50%" }}
              >
                <SimpleGrid cols={2}>
                  <Textarea
                    label="Term"
                    variant="filled"
                    //TODO: Diiferent heights
                    size="md"
                    withAsterisk
                    autosize
                    {...form.getInputProps(`cards.${index}.term`)}
                  ></Textarea>

                  <Textarea
                    label="Definition"
                    variant="filled"
                    size="md"
                    withAsterisk
                    autosize
                    {...form.getInputProps(`cards.${index}.definition`)}
                  ></Textarea>
                </SimpleGrid>
                <Space h="md" />
                <Group position="center">
                  <Button
                    color="red"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              </Card>
            </Center>
          ))}
        </Stack>
        <Group position="center">
          <Button radius="lg" variant="light" onClick={handleAdd}>
            {" "}
            Add Card
          </Button>
          <Button radius="lg" variant="light" type="submit">
            Submit
          </Button>
          <Link to={"/"}>
            <Button radius="lg" variant="light">
              Cancel
            </Button>
          </Link>
        </Group>
      </Stack>
    </form>
  );
}
export default AddDeck;
