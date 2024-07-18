import { Card, Group, Stack, Title } from "@mantine/core";

function ColorPreview({ ttColor, dtColor, tcColor, dcColor }) {
  return (
    <Stack>
      <Title align="center">Preview</Title>
      <Group>
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: `${tcColor}`,
          }}
        >
          <Title align="center" color={ttColor} variant="light" fw={600}>
            -- term --
          </Title>
        </Card>
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: `${dcColor}`,
          }}
        >
          <Title align="center" color={dtColor} variant="light" fw={600}>
            Definition
          </Title>
        </Card>
      </Group>
    </Stack>
  );
}

export default ColorPreview;
