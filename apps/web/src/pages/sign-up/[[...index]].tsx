import { SignUp } from "@clerk/nextjs";
import securedRoutes from "~/utils/routing";

const SignUpPage = () => (
  <div className="flex flex-1 items-center justify-center">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl={securedRoutes.DASHBOARD.path}
    />
  </div>
);

export default SignUpPage;
