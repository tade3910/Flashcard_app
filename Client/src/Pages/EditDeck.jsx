import {
  Button,
  Card,
  ColorInput,
  Group,
  Menu,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useQueryDeck from "../hooks/useQueryDeck";
import EditCard from "../Components/EditCard";
import AddCard from "../Components/AddCard";
import { BsFillPencilFill, BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import useMutationDeleteCard from "../hooks/useMutationDeleteCard";
import useMutationDeck from "../hooks/useMutationDeck";
import useMutationDeleteDeck from "../hooks/useMutationDeleteDeck";
import ColorPreview from "../Components/ColorPreview";

/**
 * Page to edit deck metadata and cards associated with deck
 * @returns Edit Deck
 */
function EditDeck() {
  const { deckId: id, deckName } = useParams();
  const { isLoading, error, data } = useQueryDeck(id);
  const [cards, setCards] = useState();
  const [edit, setEdit] = useState(false);
  const [mutatedCard, setMutatedCard] = useState();
  const [mutatedIndex, setMutatedIndex] = useState(-1);
  const [adding, setAdding] = useState(false);
  const { cardMutation } = useMutationDeleteCard();
  const { deckMutation } = useMutationDeck();
  const [redirect, setRedirect] = useState(false);
  const { deckMutation: deleteDeck } = useMutationDeleteDeck();

  const form = useForm({
    initialValues: {
      name: deckName,
      tag: " ",
      ttColor: "#ffffff",
      dtColor: "#ffffff",
      tcColor: "#ffffff",
      dcColor: "#ffffff",
    },
    validate: {
      name: hasLength(
        { min: 1 },
        "Name must have minimum length of one character"
      ),
      ttColor: isNotEmpty("You must enter a color"),
      dtColor: isNotEmpty("You must enter a color"),
      tcColor: isNotEmpty("You must enter a color"),
      dcColor: isNotEmpty("You must enter a color"),
    },
  });

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete Deck",
      centered: true,
      children: (
        <Text size="sm">
          Deleting all cards will delete deck. Are you sure you want to delete
          this deck?
        </Text>
      ),
      labels: { confirm: "Delete deck", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteDeck.mutate(id);
        setRedirect(true);
      },
    });

  /**
   *  Updates local state of cards when card has been edited
   */
  useEffect(() => {
    if (!edit && mutatedCard) {
      let tempDeck = [...cards];
      tempDeck[mutatedIndex] = mutatedCard;
      setCards(tempDeck);
      setMutatedCard(null);
    }
  }, [edit, mutatedCard, mutatedIndex, cards]);

  /**
   *  Sets cards state when successful get request from API is made
   */
  useEffect(() => {
    if (!isLoading && !error) {
      setCards(data.cards);
      form.setFieldValue("tag", data.tag);
      form.setFieldValue("dcColor", data.definitionCardColor);
      form.setFieldValue("dtColor", data.definitionTextColor);
      form.setFieldValue("tcColor", data.termCardColor);
      form.setFieldValue("ttColor", data.termTextColor);
    }
  }, [isLoading, error, data]);

  /**
   * Edits deck metadata in database
   */
  const handleSubmit = () => {
    let mutatedDeck = {
      id: id,
      name: form.values.name,
      tag: form.values.tag,
      tTColor: form.values.ttColor,
      tCColor: form.values.tcColor,
      dTColor: form.values.dtColor,
      dColor: form.values.dcColor,
    };
    deckMutation.mutate(mutatedDeck);
    setRedirect(true);
  };

  /**
   * Deletes card or deck if all cards of deck are to be deleted
   * @param index : index of card to delete
   */
  const handleDelete = (index) => {
    if (cards.length <= 1) {
      openDeleteModal();
    } else {
      cardMutation.mutate(cards[index].id);
      let tempDeck = [...cards];
      tempDeck.splice(index, 1);
      setCards(tempDeck);
    }
  };

  const handleReset = () => {
    form.reset();
    if (!isLoading && !error) {
      form.setFieldValue("dcColor", data.definitionCardColor);
      form.setFieldValue("dtColor", data.definitionTextColor);
      form.setFieldValue("tcColor", data.termCardColor);
      form.setFieldValue("ttColor", data.termTextColor);
    }
  };

  /**
   * reditects user to homepage when edit has been made
   * @returns navigate component
   */
  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {renderRedirect()}
        <Group position="center">
          <SimpleGrid cols={2}>
            <TextInput
              style={{ fontSize: "30px" }}
              {...form.getInputProps("name")}
              withAsterisk
              variant="filled"
              label="Name"
            ></TextInput>
            <TextInput
              style={{ fontSize: "30px" }}
              {...form.getInputProps("tag")}
              variant="filled"
              label="Description"
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
        <Space h="md" />
        <Group position="center">
          <Button type="submit" style={{ width: "20%" }}>
            Submit
          </Button>
          <Button style={{ width: "20%" }} onClick={handleReset}>
            Reset
          </Button>
        </Group>
      </form>
      <Space h="lg" />
      {Array.isArray(cards) ? (
        <>
          <SimpleGrid cols={3}>
            {adding ? (
              <AddCard
                id={id}
                changeAdding={setAdding}
                changeCard={setMutatedCard}
              ></AddCard>
            ) : (
              <Card
                withBorder
                shadow="sm"
                radius="md"
                style={{ height: "30vh" }}
                onClick={() => setAdding(true)}
              >
                <Stack>
                  <Text color="blue" fz="xl" fw="xl" align="center">
                    +
                  </Text>
                  <Text color="blue" fz="xl" fw="xl" align="center">
                    Add card
                  </Text>
                </Stack>
              </Card>
            )}
            {cards.map((currentCard, index) => {
              if (mutatedIndex === index && edit) {
                return (
                  <EditCard
                    key={index}
                    props={cards[index]}
                    changeEdit={setEdit}
                    changeCard={setMutatedCard}
                  ></EditCard>
                );
              }
              return (
                <Card
                  key={index}
                  withBorder
                  shadow="sm"
                  radius="md"
                  style={{ height: "30vh" }}
                >
                  <Card.Section>
                    <Group position="right">
                      <Menu>
                        <Menu.Target>
                          <Button variant="subtle">
                            <BsThreeDots></BsThreeDots>
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>
                            <Group
                              spacing="xs"
                              position="left"
                              onClick={() => {
                                setMutatedIndex(index);
                                setEdit(true);
                              }}
                            >
                              <BsFillPencilFill></BsFillPencilFill>
                              Edit
                            </Group>
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            <Group spacing="xs" position="left">
                              <BsFillTrashFill></BsFillTrashFill>
                              Delete
                            </Group>
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>
                  <Stack>
                    <Text color="blue" fz="xl" fw="xl" align="center">
                      Term : {currentCard.term}
                    </Text>
                    <Text color="blue" fz="xl" fw="xl" align="center">
                      Definition : {currentCard.definition}
                    </Text>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
          {/* <Space h="md" />
        <Center>
        <Button type="submit" style={{width:"50%"}}>
          Submit
        </Button>
        </Center> */}
        </>
      ) : (
        <>Server issues :/</>
      )}
    </>
  );
}

export default EditDeck;
