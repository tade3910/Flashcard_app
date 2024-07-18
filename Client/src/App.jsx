import { AppShell, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./Components/CustomHeader";
import AddDeck from "./Pages/AddDeck";
import Home from "./Pages/Home";
import PracticeDeck from "./Pages/PracticeDeck";
import EditDeck from "./Pages/EditDeck";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <NotificationsProvider position="top-right">
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <AppShell
                  padding="md"
                  header={<CustomHeader />}
                  styles={(theme) => ({
                    main: {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.colors.gray[0],
                    },
                  })}
                >
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="AddDeck" element={<AddDeck />}></Route>
                    <Route
                      path="PracticeDeck/:deckId"
                      element={<PracticeDeck />}
                    ></Route>
                    <Route
                      path="EditDeck/:deckId/:deckName"
                      element={<EditDeck />}
                    ></Route>
                  </Routes>
                </AppShell>
              </QueryClientProvider>
            </BrowserRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
