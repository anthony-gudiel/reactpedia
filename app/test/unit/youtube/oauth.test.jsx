import { render, act } from "@testing-library/react";
import { test, vi, expect } from "vitest";
import { Videos } from "../../../src/pages/videos/videos";
import React from "react";

test("Testing OAuth client", async () => {
  expect(process.env.REACT_APP_OAUTH_CLIENT_ID).toBeDefined();

  // Setup: Define global.window and global.window.google
  global.window = global.window || {};
  global.window.google = {
    accounts: {
      oauth2: {
        initTokenClient: vi.fn(),
      },
    },
  };

  // Mock the OAuth client using the useEffect from the Videos component
  global.window.google.accounts.oauth2.initTokenClient.mockImplementation();

  await act(async () => {
    render(<Videos />);
  });

  // Check that the OAuth client was initialized with the correct arguments
  expect(window.google.accounts.oauth2.initTokenClient).toHaveBeenCalledWith({
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/youtube",
    callback: expect.any(Function),
  });
});
