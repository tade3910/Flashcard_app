import {
  ActionIcon,
  Button,
  Group,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

function CustomHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Header height={60} p="xs">
      <Group position="apart">
        <Link to="/" style={{ align: "center" }}>
          <Button variant="subtle">Fun With Flash Cards</Button>
        </Link>

        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <BsFillSunFill /> : <BsMoonFill />}
        </ActionIcon>
      </Group>
    </Header>
  );
}

export default CustomHeader;
