import { Button, Text, Stack, Group, Center, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useQueryDeck from "../hooks/useQueryDeck";
import EditCard from "../Components/EditCard";
import { openConfirmModal } from "@mantine/modals";
import useMutationDeleteCard from "../hooks/useMutationDeleteCard";
import useMutationDeleteDeck from "../hooks/useMutationDeleteDeck";
import ReactCardFlip from "react-card-flip";
import { useParams } from "react-router-dom";

/**
 * Page to use main flash card functionality
 * @returns Practice deck
 */
function PracticeDeck() {
  const [cards, setCards] = useState();
  const [index, setIndex] = useState(0);
  const { deckId: id } = useParams();
  const [answer, setAnswer] = useState(false);
  const [editing, setEditing] = useState(false);
  const { status, data } = useQueryDeck(id);
  const [mutatedCard, setMutatedCard] = useState();
  const { cardMutation } = useMutationDeleteCard();
  const [redirect, setRedirect] = useState(false);
  const { deckMutation } = useMutationDeleteDeck();
  const [deckinfo, setDeckInfo] = useState({
    ttColor: "#ffffff",
    dtColor: "#ffffff",
    tcColor: "#ffffff",
    dcColor: "#ffffff",
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
        deckMutation.mutate(id);
        setRedirect(true);
      },
    });

  /**
   *  Updates local state of cards when card has been edited
   */
  useEffect(() => {
    if (!editing && mutatedCard) {
      let tempDeck = [...cards];
      tempDeck[index] = mutatedCard;
      setCards(tempDeck);
      setMutatedCard(null);
    }
  }, [editing, cards, index, mutatedCard]);

  /**
   *  Sets cards state when successful get request from API is made
   */
  useEffect(() => {
    if (status === "success") {
      setCards(data.cards);
      let tempDeckInfo = { ...deckinfo };
      tempDeckInfo.ttColor = data.termTextColor;
      tempDeckInfo.tcColor = data.termCardColor;
      tempDeckInfo.dcColor = data.definitionCardColor;
      tempDeckInfo.dtColor = data.definitionTextColor;
      setDeckInfo(tempDeckInfo);
    }
  }, [status, data]);

  /**
   * Displays next card in cards
   */
  const nextButton = () => {
    setAnswer(false);
    let tempIndex = index + 1;
    tempIndex >= cards.length ? setIndex(0) : setIndex(tempIndex);
  };

  /**
   * Displays previous card in cards
   */
  const backButton = () => {
    setAnswer(false);
    let tempIndex = index - 1;
    tempIndex <= -1 ? setIndex(cards.length - 1) : setIndex(tempIndex);
  };

  /**
   * Toggles between card term and definition
   */
  const showAnswer = () => {
    setAnswer(!answer);
  };

  /**
   * Enables user to edit card
   */
  const handleEdit = () => {
    setEditing(true);
  };

  /**
   * Deletes card from deck
   */
  const handleDelete = () => {
    if (cards.length <= 1) {
      openDeleteModal();
    } else {
      cardMutation.mutate(cards[index].id);
      let tempDeck = [...cards];
      tempDeck.splice(index, 1);
      setCards(tempDeck);
      setAnswer(false);
      setIndex(0);
      setEditing(false);
    }
  };

  /**
   * Redirects user back to home page
   * @returns Navigate components
   */
  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Center>
      {renderRedirect()}
      {Array.isArray(cards) ? (
        <Stack style={{ width: "50%" }}>
          {editing ? (
            <Stack>
              <EditCard
                props={cards[index]}
                changeEdit={setEditing}
                changeCard={setMutatedCard}
              ></EditCard>
              <Button radius="lg" color="red" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          ) : (
            <>
              <ReactCardFlip isFlipped={answer} flipDirection="vertical">
                <Center
                  onClick={showAnswer}
                  style={{
                    backgroundColor: `${deckinfo.tcColor}`,
                    height: "30vh",
                    borderRadius: "2%",
                  }}
                >
                  <Title
                    align="center"
                    color={deckinfo.ttColor}
                    vairant="light"
                    fw={600}
                  >
                    {cards[index].term}
                  </Title>
                </Center>
                <Center
                  style={{
                    backgroundColor: `${deckinfo.dcColor}`,
                    height: "30vh",
                    borderRadius: "2%",
                  }}
                  onClick={showAnswer}
                >
                  <Title
                    align="center"
                    fw={600}
                    vairant="light"
                    color={deckinfo.dtColor}
                  >
                    {cards[index].definition}
                  </Title>
                </Center>
              </ReactCardFlip>
              <Group position="apart">
                <Button radius="lg" variant="light" onClick={backButton}>
                  {" "}
                  Back{" "}
                </Button>
                <Button radius="lg" variant="light" onClick={handleEdit}>
                  {" "}
                  Edit{" "}
                </Button>
                <Button radius="lg" variant="light" onClick={nextButton}>
                  {" "}
                  Next{" "}
                </Button>
              </Group>
            </>
          )}
        </Stack>
      ) : (
        <>Looks like the server is acting up ... maybe wait a lil :/</>
      )}
    </Center>
  );
}
export default PracticeDeck;
