import { User } from "@prisma/client";

export default function Profile({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user: User) => {
        return <p key={user.id}>{user.email}</p>;
      })}
    </div>
  );
}
