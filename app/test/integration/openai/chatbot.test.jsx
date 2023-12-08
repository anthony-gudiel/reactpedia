import { LESSON_1_1 } from "../../../src/pages/lessons/lesson-1-1";
import { vi, test, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { OPENAI } from "../../../src/api/openai";

vi.mock("../../../src/api/openai", () => ({
  OPENAI: vi.fn(),
  suggestedOPENAI: vi.fn(),
}));

test("Chatbot Integration Test: Simulating a series of chat and responses withchatbot feature", async () => {
  OPENAI.mockImplementation(async () => "42");
  let userMessage = "What is the meaning of life?";
  const { getByTestId } = render(<LESSON_1_1 />);
  // User input
  const input = getByTestId("user-input");
  fireEvent.change(input, { target: { value: userMessage } });
  expect(input.value).toBe("What is the meaning of life?");
  // Submit button
  const submit = getByTestId("submit-button");
  await act(async () => {
    fireEvent.click(submit);
  });
    expect(OPENAI).toHaveBeenCalledWith(userMessage);
    expect(OPENAI).toHaveBeenCalledTimes(1);
    // Check that the response is correct
    const output = getByTestId("ai-response");
    expect(output.textContent).toBe("42");
    expect(input.value).toBe("");
});