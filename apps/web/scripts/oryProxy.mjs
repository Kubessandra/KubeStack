import { execSync } from "child_process";

const main = () => {
  execSync(`ory tunnel --dev http://localhost:3000`, {
    stdio: "inherit",
  });
};

main();
