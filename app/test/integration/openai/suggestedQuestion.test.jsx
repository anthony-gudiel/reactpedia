import { LESSON_1_1 } from "../../../src/pages/lessons/lesson-1-1";
import { vi, test, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { OPENAI, suggestedOPENAI } from "../../../src/api/openai";

vi.mock("../../../src/api/openai", () => ({
  OPENAI: vi.fn(),
  suggestedOPENAI: vi.fn(),
}));

// Helper function to setup the test, from the chatbot test
async function setupTest() {
    OPENAI.mockImplementation(async () => "Sample response");
    suggestedOPENAI.mockImplementation(async () => ["1. Question 1\n2. Question 2\n3. Question 3\n4. Question 4\n5. Question 5"]);
    var userMessage = "What is the meaning of life?";
    const { getByTestId } = render(<LESSON_1_1 />);
    // User input
    const input = getByTestId("user-input");
    fireEvent.change(input, { target: { value: userMessage } });
    // Submit button
    const submit = getByTestId("submit-button");
    await act(async () => {
      fireEvent.click(submit);
    });
  
    return { getByTestId, userMessage };
  }

test("OpenAI Suggested Questions Integration Test: Test multiple questions and related responses", async () => {
    // Setup the test
    const { getByTestId, userMessage } = await setupTest();
    // Check that the response is correct
    expect(getByTestId("ai-response").textContent).toBe("Sample response");
    expect(getByTestId("user-input").value).toBe("");
    // Check that the suggested questions exist
    expect(suggestedOPENAI).toHaveBeenCalledWith("Sample response");

    // Click the show suggested questions button
    const showSuggestedQuestions = getByTestId("suggested-questions-button");
    await act(async () => {
        fireEvent.click(showSuggestedQuestions);
    });
    // Check that the suggested questions are displayed
    expect(getByTestId("question-1").textContent).toBe("1. Question 1");
    expect(getByTestId("question-2").textContent).toBe("2. Question 2");
    expect(getByTestId("question-3").textContent).toBe("3. Question 3");
    expect(getByTestId("question-4").textContent).toBe("4. Question 4");
    expect(getByTestId("question-5").textContent).toBe("5. Question 5");

    // New OpenAI response
    OPENAI.mockImplementation(async () => "Question 1 answer");
    suggestedOPENAI.mockImplementation(async () => ["1. A\n2. B\n3. C\n4. D\n5. E"]);

    // Click the first suggested question
    const question1 = getByTestId("question-1-button");
    await act(async () => {
        fireEvent.click(question1);
    });
    expect(OPENAI).toHaveBeenCalledWith("Question 1");
    expect(getByTestId("user-input").value).toBe("");
    // Check that the response is correct
    expect(getByTestId("ai-response").textContent).toBe("Question 1 answer");
    // Check that the suggested questions exist
    expect(suggestedOPENAI).toHaveBeenCalledWith("Question 1 answer");
    expect(getByTestId("question-1").textContent).toBe("1. A");
    expect(getByTestId("question-2").textContent).toBe("2. B");
    expect(getByTestId("question-3").textContent).toBe("3. C");
    expect(getByTestId("question-4").textContent).toBe("4. D");
    expect(getByTestId("question-5").textContent).toBe("5. E");
});