import CenteredOnPage from "@/components/CenteredOnPage";
import { createClient as createComponentClient } from "@/util/supabase/component";
import { createClient as createServerClient, getUser } from "@/util/supabase/server-props";
import { Blockquote, Button, Stack, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { IconInfoCircle } from "@tabler/icons-react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log("PROPS!", props);

  const supabase = createComponentClient();

  const signInWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback"
      }
    });
  }

  if (props.error) {
    console.log("ERROR!", props.error);

    return (
      <CenteredOnPage>
        <Blockquote icon={<IconInfoCircle />}>
          <Stack gap={3}>
            <Text size="xl" fw={700}>An error occurred.</Text>
            <Text>{props.error}</Text>
          </Stack>
        </Blockquote>
      </CenteredOnPage>
    )
  }

  if (props.user) {
    return (
      <CenteredOnPage>
        <Blockquote>
          <Stack gap={3}>
            <Text size="xl" fw={700}>Welcome, {props.user.email}!</Text>
            <Text>Nice to see you.</Text>
          </Stack>
        </Blockquote>
      </CenteredOnPage>
    )
  }

  return (
    <CenteredOnPage>
      <Blockquote>
        <Text size="lg" fw={700}>No user, yet.</Text>
        <Text>Please log in</Text>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </Blockquote>
    </CenteredOnPage>
  );
}

export interface IndexPageServerSideProps {
  user: User | null,
  error: any,
}
export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const supabase = createServerClient(context);

  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (!user || getUserError) {
    console.log({ user, getUserError });
    return {
      props: {
        user: null,
        error: getUserError?.message
      }
    }
  }

  // More code here, mostly irrelevant. Snipped for brevity.

  return {
    props: {
      user,
      error: null
    }
  }
}) satisfies GetServerSideProps<IndexPageServerSideProps>;