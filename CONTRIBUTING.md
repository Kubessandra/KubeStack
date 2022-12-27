# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

## How can I contribute?

- **Give us a star.** It may not seem like much, but it really makes a
  difference. This is something that everyone can do to help out Ory CLI. Github
  stars help the project gain visibility and stand out.

- **Join the community.** Sometimes helping people can be as easy as listening
  to their problems and offering a different perspective. Join our Slack, have a
  look at discussions in the forum and take part in community events. More info
  on this in [Communication](#communication).

- **Help with open issues.** Sometimes, issues lack necessary information and some
  are duplicates of older issues.
  You can help out by guiding people through the process of filling out the
  issue template, asking for clarifying information or pointing them to existing
  issues that match their description of the problem.

- **Review documentation changes.** Most documentation just needs a review for
  proper spelling and grammar. If you think a document can be improved in any
  way, feel free to hit the `edit` button at the top of the page. More info on
  contributing to the documentation [here](#contribute-documentation).

- **Help with tests.** Pull requests may lack proper tests or test plans. These
  are needed for the change to be implemented safely.

- **Create a pull request.**

## Communication

- We use [Discord](https://discord.gg/v7sbenECgC)
- You can also join us on [Twitter](https://twitter.com/kubessandra)

## Pull request process

All contributions are made via pull requests. To make a pull request, you will
need a GitHub account; if you are unclear on this process, see GitHub's
documentation on [forking](https://help.github.com/articles/fork-a-repo) and
[pull requests](https://help.github.com/articles/using-pull-requests). Pull
requests should be targeted at the `main` branch.

1. Create a feature branch off of `main` so that changes do not get mixed up.
2. [Rebase](http://git-scm.com/book/en/Git-Branching-Rebasing) your local
   changes against the `main` branch.

If a pull request is not ready to be reviewed yet
[it should be marked as a "Draft"](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request).

### Working with forks

```bash
# First you clone the original repository
git clone git@github.com:kubessandra/KubeStack.git
# Next you add a git remote that is your fork:
git remote add fork git@github.com:<YOUR-GITHUB-USERNAME-HERE>/KubeStack.git
# Next you fetch the latest changes from origin for master:
git fetch origin
git checkout main
git pull --rebase
# Next you create a new feature branch off of master:
git checkout my-feature-branch
# Now you do your work and commit your changes:
git add -A
git commit -a -m "fix: this is the subject line" -m "This is the body line. Closes #123"
# And the last step is pushing this to your fork
git push -u fork my-feature-branch
```

Now go to the project's GitHub Pull Request page and click "New pull request"

## Setup

### PNPM

First, you will need to have [`pnpm`](https://pnpm.io/fr/) installed on your machine.

From the [installation page](https://pnpm.io/fr/installation), choose your preferred install method and run it.

### NodeJS

Next, you'll need to have [NodeJS](https://nodejs.org/en/) installed, with the required version. The required version is specified in the [`.npmrc`](.npmrc) root file, aswell as in every `pagakage.json` file :

```json
"engines": {
    "node": "18.4.0"
  },
```

Feel free to use the node-version manager of your choice (like [nvm](https://github.com/nvm-sh/nvm)), but we recommend using the integrated manager of pnpm. The [`pnpm env`](https://pnpm.io/fr/cli/env) command allows you to manage whatever node engine pnpm should use. Go into any `package.json` file and find the required node version, then enter the following command :

```sh
$ pnpm env use --global 18.4.0
```

If you enter the wrong version, or if the required node version changes, pnpm will throw errors until you make the apropriate changes.

> :information_source: Using the `pnpm env` command, pnpm will resolve a separate node instance from the one you installed on your system. Note that the _pnpm_ version will be used for dependencies resolution **aswell** as for scripts.

### Ory CLI

For authentication, the [KubeStack](https://github.com/Kubessandra/KubeStack) uses [Ory](https://www.ory.sh/docs/welcome).

In order to be run locally, Ory relies on it's CLI to create a proxy tunnel to the API.

Install the CLI through the [official documentation page](https://www.ory.sh/docs/getting-started/local-development).

### Environment variables.

> :construction: TODO

> :construction: Probably includes Ory stuff

> :construction: @Kubessandra please fill this up, I could have played the guessing game or watched Twitch replays, but I'm layzy. :zzz: I'll gladly keep on working on this once I can get the project up & running

## Development workflow

To get started with the project, run `pnpm` in the root directory to install the required dependencies for each package:

```sh
pnpm i
pnpm dev
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

```sh
pnpm lint
pnpm lint-fix
```

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or
  advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email
  address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [INSERT CONTACT METHOD]. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.0,
available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at https://www.contributor-covenant.org/translations.
