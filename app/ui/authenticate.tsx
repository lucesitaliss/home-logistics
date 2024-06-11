import { doGoogleLogin } from "../actions/authenticate";

export function Authenticate() {
  return (
    <form action={doGoogleLogin}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
export default Authenticate;
