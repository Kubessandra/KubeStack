import { SignIn } from "@clerk/nextjs";
import securedRoutes from "~/utils/routing";

const SignInPage = () => (
  <div className="flex flex-1 items-center justify-center">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl={securedRoutes.DASHBOARD.path}
    />
  </div>
);

export default SignInPage;
