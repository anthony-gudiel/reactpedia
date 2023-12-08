import {
  Videos,
  handleSubscriptionToggle,
} from "../../../src/pages/videos/videos";
import { test, vi, expect } from "vitest";
import { act, render, fireEvent } from "@testing-library/react";
import React from "react";

global.fetch = vi.fn();

const createFetchResponse = (
  data,
  status = 200,
  statusText = "Successful"
) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText,
  json: () => new Promise((resolve) => resolve(data)),
});

test("Subscription Integration test: Testing the OAuth Client, then subscribe and unsubscribe", async () => {
  let mockOAuthToken = "";
  let subscribed = { value: false };
  const mockRequestAccessToken = vi.fn(() => {
    mockOAuthToken = "mockToken";
  });

  const mockTokenClient = {
    requestAccessToken: mockRequestAccessToken,
  };

  // Define global.window and global.window.google
  global.window = global.window || {};
  global.window.google = {
    accounts: {
      oauth2: {
        initTokenClient: vi.fn().mockResolvedValue(mockTokenClient),
      },
    },
  };

  // Constants
  const mockVideoItem = {
    id: {
      videoId: "mockVideoId",
    },
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Mock subscribed response
  const mockSubscribedResponse = {
    items: [
      {
        id: "mockSubscriptionId",
      },
    ],
  };

  // Mock not subscribed response
  const mockNotSubscribedResponse = {
    items: [],
  };

  const { getByTestId } = render(
    <Videos tokenClient={mockTokenClient} accessToken={mockOAuthToken} />
  );

  // Assert initial state
  const subscribeButton = getByTestId("subscribe-button");
  expect(subscribeButton.textContent).toBe("Subscribe");
  expect(mockOAuthToken).toBe("");

  // Mock the user clicking the subscribe button without logging in
  await act(async () => {
    fireEvent.click(subscribeButton);
  });
  expect(mockTokenClient.requestAccessToken).toHaveBeenCalled();
  expect(mockOAuthToken).toBe("mockToken");
  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
  fetch.mockClear();
  expect(mockTokenClient.requestAccessToken).not.toHaveBeenCalled();

  // Spy on setSubscribed
  const setSubscribed = vi.fn((value) => (subscribed.value = value));
  // Assert that the user is not subscribed
  expect(subscribed.value).toBe(false);
  // Set fetch response to mockNotSubscribedResponse
  fetch.mockResolvedValue(createFetchResponse(mockNotSubscribedResponse));

  // Call handleSubscribeToggle again
  await handleSubscriptionToggle(
    mockTokenClient,
    mockOAuthToken,
    mockVideoItem,
    setSubscribed
  );
  expect(mockTokenClient.requestAccessToken).not.toHaveBeenCalled();
  expect(subscribed.value).toBe(true);
  expect(fetch).toHaveBeenCalledTimes(2);

  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
  fetch.mockClear();

  // Assert that the user is subscribed
  expect(subscribed.value).toBe(true);
  // Set fetch response to mockSubscribedResponse
  fetch.mockResolvedValue(createFetchResponse(mockSubscribedResponse));
  // Call handleSubscribeToggle again
  await handleSubscriptionToggle(
    mockTokenClient,
    mockOAuthToken,
    mockVideoItem,
    setSubscribed
  );

  // Assert that the user is not subscribed
  expect(subscribed.value).toBe(false);
  expect(fetch).toHaveBeenCalledTimes(2);

  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
});
