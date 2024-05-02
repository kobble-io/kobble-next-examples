import {
  SignedIn,
  SignedOut,
  LoginButton,
  LogoutButton,
} from '@kobbleio/next/client'

export default function Home() {
    return (
      <div>
        <SignedIn>
          <p>Welcome</p>
          <LogoutButton />
        </SignedIn>

        <SignedOut>
          <p>Not authenticated</p>
          <LoginButton />
        </SignedOut>
      </div>
  )
}