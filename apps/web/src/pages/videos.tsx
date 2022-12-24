import { useSession } from "~/hooks/useSession";
import auth from "~/utils/auth";

const Videos = () => {
  const session = useSession(true);

  if (!session) return null;

  return (
    <div>
      <h1>Welcome to videos</h1>
      <h2>{session.email}</h2>

      <a href={auth.logoutURL}>Logout</a>
    </div>
  );
};

export default Videos;
