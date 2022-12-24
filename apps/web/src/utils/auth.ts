import { Configuration, FrontendApi } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

export interface IAuthSession {
  email: string;
}

export interface IAuth {
  loginURL: string;
  logoutURL: string;
  signupURL: string;
  getSession: () => Promise<IAuthSession>;
}

class OryAuth implements IAuth {
  #ory;
  #logout_url?: string;
  loginURL;
  signupURL;

  constructor() {
    this.loginURL = edgeConfig.basePath + "/ui/login";
    this.signupURL = edgeConfig.basePath + "/ui/registration";
    this.#ory = new FrontendApi(new Configuration(edgeConfig));
  }

  async getSession() {
    try {
      const { data: session } = await this.#ory.toSession();
      const { data: logoutFlow } = await this.#ory.createBrowserLogoutFlow();
      this.#logout_url = logoutFlow.logout_url;
      return { email: session.identity.traits.email };
    } catch (e) {
      throw e;
    }
  }

  get logoutURL() {
    if (!this.#logout_url)
      throw new Error("No logout url, the user is not connected");
    return this.#logout_url;
  }
}

const auth: IAuth = new OryAuth();
export default auth;
