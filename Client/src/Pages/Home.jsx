import { SimpleGrid, Button, Space, Stack } from "@mantine/core";
import { useState } from "react";
import Deck from "../Components/Deck";
import { Link } from "react-router-dom";
import useQueryDecks from "../hooks/useQueryDecks";
import { useEffect } from "react";

/**
 * Home page of application
 * @returns Home
 */
function Home() {
  const [decks, setDecks] = useState([]);
  const { isLoading, error, data } = useQueryDecks();

  /**
   *  Sets decks state when successful get request from API is made
   */
  useEffect(() => {
    if (!isLoading && !error && Array.isArray(data)) {
      setDecks(data);
    }
  }, [isLoading, error, data]);

  return (
    <Stack align="center">
      <SimpleGrid cols="4">
        {decks.map((currentDeck, index) => (
          <Deck data={currentDeck} key={index}></Deck>
        ))}
      </SimpleGrid>
      <Space h="lg" />
      <Link to="/AddDeck">
        <Button variant="light" color="blue" radius="md">
          {" "}
          Add deck
        </Button>
      </Link>
    </Stack>
  );
}

export default Home;
