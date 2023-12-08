import { Quizzes } from "../../../src/pages/quizzes/quizzes";
import { vi, test, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { OPENAI } from "../../../src/api/openai";

vi.mock("../../../src/api/openai", () => ({
  OPENAI: vi.fn(),
  suggestedOPENAI: vi.fn(),
}));

test("OpenAI Quiz Integration Test: Choosing a lesson from dropdown and submitting", async () => {
  OPENAI.mockImplementation(async () => "This is a sample quiz");
  const { getByTestId, getByText } = render(<Quizzes />);
  // Get the selected option element
  const selectedOption = getByText("Lesson 2 - React Basics: JSX");
  // Quiz dropdown menu
  const dropdown = getByTestId("quiz-dropdown");
  fireEvent.change(dropdown, { target: { value: selectedOption.value } });

  // Check that the selected option is actually selected
  expect(selectedOption.selected).toBe(true);
  expect(dropdown.value).toBe(selectedOption.value);

    // Submit button
    const submit = getByTestId("submit-button");
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(OPENAI).toHaveBeenCalledWith("Your one and only job is to create a quiz for " + selectedOption.value);

    // Check that the response is correct
    expect(getByTestId("quiz-output").textContent).toBe("This is a sample quiz");

    // The user selects another lesson
    const selectedOption2 = getByText("Lesson 7 - Component Lifecycle in React");
    fireEvent.change(dropdown, { target: { value: selectedOption2.value } });
    // Check that the selected option is actually selected
    expect(selectedOption2.selected).toBe(true);
    expect(dropdown.value).toBe(selectedOption2.value);
    OPENAI.mockImplementation(async () => "This is a different quiz");
    // Submit button
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(OPENAI).toHaveBeenCalledWith("Your one and only job is to create a quiz for " + selectedOption2.value);
    // Check that the response is correct
    expect(getByTestId("quiz-output").textContent).toBe("This is a different quiz");

    // The user generates another quiz for the same lesson
    expect(selectedOption2.selected).toBe(true);
    expect(dropdown.value).toBe(selectedOption2.value);
    OPENAI.mockImplementation(async () => "This is another different quiz");
    // Submit button
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(OPENAI).toHaveBeenCalledWith("Your one and only job is to create a quiz for " + selectedOption2.value);
    // Check that the response is correct
    expect(getByTestId("quiz-output").textContent).toBe("This is another different quiz");
});