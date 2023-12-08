import { LESSON_1_1 } from "../../../src/pages/lessons/lesson-1-1";
import { vi, test, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { OPENAI, suggestedOPENAI } from "../../../src/api/openai";

vi.mock("../../../src/api/openai", () => ({
  OPENAI: vi.fn(),
  suggestedOPENAI: vi.fn(),
}));

test("OpenAI Chatbot Integration Test: Simulating a series of chat and responses with chatbot feature", async () => {
  OPENAI.mockImplementation(async () => "42");
  let userMessage = "What is the meaning of life?";
  const { getByTestId, queryByTestId } = render(<LESSON_1_1 />);
  // User input
  const input = getByTestId("user-input");
  fireEvent.change(input, { target: { value: userMessage } });
  expect(input.value).toBe("What is the meaning of life?");
  // Submit button
  let submit = getByTestId("submit-button");
  await act(async () => {
    fireEvent.click(submit);
  });
    expect(OPENAI).toHaveBeenCalledWith(userMessage);
    expect(OPENAI).toHaveBeenCalledTimes(1);
    // Check that the response is correct
    let output = getByTestId("ai-response");
    expect(output.textContent).toBe("42");
    expect(input.value).toBe("");

    // New user message
    userMessage = "Why is it 42?";
    // New OpenAI response
    OPENAI.mockImplementation(async () => "Because it is");
    suggestedOPENAI.mockImplementation(async () => ["1. A\n2. B\n3. C\n4. D\n5. E"]);
    // User input
    fireEvent.change(input, { target: { value: userMessage } });
    expect(input.value).toBe("Why is it 42?");
    // Submit button
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(OPENAI).toHaveBeenCalledWith(userMessage);
    expect(OPENAI).toHaveBeenCalledTimes(2);
    // Check that the response is correct
    output = getByTestId("ai-response");
    expect(output.textContent).toBe("Because it is");

    // User clicks the show suggested questions button
    const showSuggestedQuestions = getByTestId("suggested-questions-button");
    await act(async () => {
        fireEvent.click(showSuggestedQuestions);
    });
    // Check that the suggested questions are displayed
    expect(getByTestId("question-1").textContent).toBe("1. A");
    // User clicks the close button
    const closeButton = getByTestId("close-button");
    await act(async () => {
        fireEvent.click(closeButton);
    });
    // Check that the suggested questions are not displayed
    expect(queryByTestId("question-1")).toBeNull();
});