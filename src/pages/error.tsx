import CenteredOnPage from "@/components/CenteredOnPage";
import { Blockquote, Text } from "@mantine/core";

export default function ErrorPage() {
  return (
    <CenteredOnPage>
      <Blockquote>
        <Text size="lg" fw={700}>An error occurred.</Text>
        <Text>Sorry about that.</Text>
      </Blockquote>
    </CenteredOnPage>
  )
}