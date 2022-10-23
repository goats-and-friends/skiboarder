import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session && session.user !== undefined) {
    const image = session.user.image ?? "";
    return (
      <>
        Signed in as {session.user.email} <br />
        <Image
          src={image}
          alt="user avatar"
          width="100"
          height="100"
          referrerPolicy="no-referrer"
        />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
