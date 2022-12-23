import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import { inferProcedureInput } from "@trpc/server";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import type { AppRouter } from "~/server/routers/_app";

import { Configuration, FrontendApi, Session, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";
import { useRouter } from "next/router";

const ory = new FrontendApi(new Configuration(edgeConfig));

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username;

const IndexPage: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.list.invalidate();
    },
  });
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );

  // ORY
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url);
        });
      })
      .catch(() => {
        // Redirect to login page
        return router.push(edgeConfig.basePath + "/ui/login");
      });
  }, [router]);

  if (!session) {
    // Still loading
    return null;
  }

  // end ORY

  return (
    <>
      <h1 className="m-8 text-blue-500">Welcome to your tRPC starter!</h1>
      <p>
        If you get stuck, check <a href="https://trpc.io">the docs</a>, write a
        message in our <a href="https://trpc.io/discord">Discord-channel</a>, or
        write a message in{" "}
        <a href="https://github.com/trpc/trpc/discussions">
          GitHub Discussions
        </a>
        .
      </p>
      <h2 className="text-bold text-3xl text-blue-800">
        {getUserName(session?.identity)}
      </h2>

      <h2>
        Latest Posts
        {postsQuery.status === "loading" && "(loading)"}
      </h2>

      <button
        onClick={() => postsQuery.fetchPreviousPage()}
        disabled={
          !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
        }
      >
        {postsQuery.isFetchingPreviousPage
          ? "Loading more..."
          : postsQuery.hasPreviousPage
          ? "Load More"
          : "Nothing more to load"}
      </button>

      {postsQuery.data?.pages.map((page, index) => (
        <Fragment key={page.items[0]?.id || index}>
          {page.items.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <Link href={`/post/${item.id}`}>View more</Link>
            </article>
          ))}
        </Fragment>
      ))}

      <hr />

      <h3>Add a Post</h3>

      <form
        onSubmit={async (e) => {
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @see https://react-hook-form.com/
           * @see https://kitchen-sink.trpc.io/react-hook-form
           */
          e.preventDefault();
          const $form = e.currentTarget;
          const values = Object.fromEntries(new FormData($form));
          type Input = inferProcedureInput<AppRouter["post"]["add"]>;
          //    ^?
          const input: Input = {
            title: values.title as string,
            text: values.text as string,
          };
          try {
            await addPost.mutateAsync(input);

            $form.reset();
          } catch (cause) {
            console.error({ cause }, "Failed to add post");
          }
        }}
      >
        <label htmlFor="title">Title:</label>
        <br />
        <input
          id="title"
          name="title"
          type="text"
          disabled={addPost.isLoading}
        />

        <br />
        <label htmlFor="text">Text:</label>
        <br />
        <textarea id="text" name="text" disabled={addPost.isLoading} />
        <br />
        <input type="submit" disabled={addPost.isLoading} />
        {addPost.error && (
          <p style={{ color: "red" }}>{addPost.error.message}</p>
        )}
      </form>
      <a href={logoutUrl}>Log out</a>
    </>
  );
};

export default IndexPage;
