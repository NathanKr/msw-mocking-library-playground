import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../components/JsonPlaceholder";
import { render } from "@testing-library/react";
import JsonPlaceholder from "../components/JsonPlaceholder";

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ name: "Jim" }]));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

test("first and last names appears", async () => {
  const { findByText } = render(<JsonPlaceholder />);
  const item = await findByText("Jim");
  expect(item).not.toBeNull();
});
