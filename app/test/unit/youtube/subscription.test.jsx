import { handleSubscriptionToggle } from "../../../src/pages/videos/videos";
import { test, vi, expect } from "vitest";

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

// First test case
test("Testing handleSubscriptionToggle: User is not logged in", async () => {
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "";
  const videoItem = {
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Fetch response when the user is subscribed
  const mockResponse = {
    items: [
      {
        id: "mockSubscriptionId",
      },
    ],
  };

  fetch.mockResolvedValue(createFetchResponse(mockResponse));

  const setSubscribed = vi.fn();

  await handleSubscriptionToggle(
    tokenClient,
    accessToken,
    videoItem,
    setSubscribed
  );

  // Assertions
  expect(tokenClient.requestAccessToken).toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
  vi.clearAllMocks();
});

// Second test case
test("Testing handleSubscriptionToggle: User is subscribed", async () => {
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "mockAccessToken";
  const videoItem = {
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Fetch response when the user is subscribed
  const mockResponse = {
    items: [
      {
        id: "mockSubscriptionId",
      },
    ],
  };

  fetch.mockResolvedValue(createFetchResponse(mockResponse));

  const setSubscribed = vi.fn();

  await handleSubscriptionToggle(
    tokenClient,
    accessToken,
    videoItem,
    setSubscribed
  );

  // Assertions
  expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
  // Get the subscription status
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=mockChannelId",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  // Unsubscribe
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/subscriptions?id=mockSubscriptionId",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(setSubscribed).toHaveBeenCalledWith(false);
  vi.clearAllMocks();
});

// Third test case
test("Testing handleSubscriptionToggle: User is not subscribed", async () => {
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "mockAccessToken";
  const videoItem = {
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Fetch response when the user is not subscribed
  const mockResponse = {};

  fetch.mockResolvedValue(createFetchResponse(mockResponse));

  const setSubscribed = vi.fn();

  await handleSubscriptionToggle(
    tokenClient,
    accessToken,
    videoItem,
    setSubscribed
  );

  // Assertions
  expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
  // Get the subscription status
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=mockChannelId",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  // Subscribe
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          resourceId: {
            kind: "youtube#channel",
            channelId: videoItem.snippet.channelId,
          },
        },
      }),
    }
  );
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(setSubscribed).toHaveBeenCalledWith(true);
  vi.clearAllMocks();
});

// Fourth test case
test("Testing handleSubscriptionToggle: YouTube API response error", async () => {
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "mockAccessToken";
  const videoItem = {
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Fetch response
  const mockResponse = {};

  // Mock the fetch function to return an error
  fetch.mockResolvedValue(createFetchResponse(mockResponse, 404, "Not found"));

  const setSubscribed = vi.fn();
  const logSpy = vi.spyOn(console, "error");

  await handleSubscriptionToggle(
    tokenClient,
    accessToken,
    videoItem,
    setSubscribed
  );

  // Assertions
  expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
  // Check if error is catched
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=mockChannelId",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  expect(logSpy).toHaveBeenCalledWith(
    "Error fetching subscription status:",
    "Not found"
  );
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(setSubscribed).not.toHaveBeenCalled();
  vi.clearAllMocks();
});
