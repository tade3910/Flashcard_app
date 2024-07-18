import { Card, Group, Menu, Button, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { BsThreeDots, BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { openConfirmModal } from "@mantine/modals";
import useMutationDeleteDeck from "../hooks/useMutationDeleteDeck";

/**
 * Wrapper object to display infromation of deck
 * @param {*} props : data associated with the deck
 * @returns Deck
 */
function Deck(props) {
  const data = props.data;
  const { deckMutation } = useMutationDeleteDeck();

  const openDeleteModal = () =>
    openConfirmModal({
      title: `Are you sure you want to delete ${data.name} deck`,
      centered: true,
      labels: { confirm: "Delete deck", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => deckMutation.mutate(data.id),
    });

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Group position="right">
          <Menu shadow="sm">
            <Menu.Target>
              <Button variant="subtle">
                <BsThreeDots></BsThreeDots>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Link
                to={`/EditDeck/${data.id}/${data.name}`}
                state={{ info: { data } }}
                style={{ textDecoration: "none" }}
              >
                <Menu.Item>
                  <Group spacing="xs" position="left">
                    <BsFillPencilFill></BsFillPencilFill>
                    Edit
                  </Group>
                </Menu.Item>
              </Link>
              <Menu.Item onClick={openDeleteModal}>
                <Group spacing="xs" position="left">
                  <BsFillTrashFill></BsFillTrashFill>
                  Delete
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Link
        to={`/PracticeDeck/${data.id}`}
        // to="/PracticeDeck"
        state={{ info: { data } }}
        style={{ textDecoration: "none" }}
      >
        <Stack>
          <Title weight={500} align="center" color="blue" fw="700">
            {data.name}
          </Title>
          <Title weight={500} align="center" color="blue" order={3}>
            {data.tag}
          </Title>
        </Stack>
      </Link>
    </Card>
  );
}
export default Deck;
