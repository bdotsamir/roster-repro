import { type GetServerSidePropsContext } from 'next'
import { createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { Database } from '@/lib/supabase.types'
import { AuthError, PostgrestError, User } from '@supabase/supabase-js'

// use with getServerSideProps
export function createClient({ req, res }: GetServerSidePropsContext) {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }))
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          )
        },
      },
    }
  )

  return supabase
}

export interface GetUserResponse {
  user: User | null,
  error: AuthError | PostgrestError | null,
}
export async function getUser(supabase: ReturnType<typeof createClient>): Promise<GetUserResponse> {
  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (!user || getUserError) {
    return {
      user: null,
      error: getUserError
    }
  }

  // More here in the actual app, snipped for brevity.

  return {
    user,
    error: null
  }
}