import { test, vi, expect } from 'vitest';
import { onSearch, handleNext, handlePrevious} from '../src/pages/content/tutorials';
import React from 'react';
import youtube from '../src/api/youtube';

test('Testing onSearch function', async () => {
  const keyword = 'react';

  // Mock the youtube.get method
  const mockResponse = {
    data: {
      items: Array(25).fill({ id: { videoId: '123' } }),
    },
  };
  const getSpy = vi.spyOn(youtube, 'get').mockImplementation(() => Promise.resolve(mockResponse));

  // Mock the setState function
  const setState = vi.fn();

  await onSearch(keyword, setState);

  // Check that youtube.get was called with the correct arguments
  expect(getSpy).toHaveBeenCalledWith('/search', {
    params: {
      q: keyword,
      type: 'video',
      maxResults: 25,
    },
  });

  // Check that setState was called
  expect(setState).toHaveBeenCalled();

  // Restore the youtube.get method
  getSpy.mockRestore();
});

test('handlePrevious updates state correctly', () => {
  // Initial state
  const initialState = {
    videos: [
      { id: { videoId: '123' } },
      { id: { videoId: '456' } },
      { id: { videoId: '789' } },
    ],
    currentVideoIndex: 0, // Assuming an initial index
  };

  // Mock useState to control the component's state
  const mockSetState = vi.fn();
  vi.spyOn(React, 'useState').mockImplementation((initial) => [initial, mockSetState]);

  // Call handlePrevious
  handlePrevious(initialState, mockSetState);

  // Get the function that setState was called with
  let setStateFunction = mockSetState.mock.calls[0][0];

  // Call the function with the initial state to get the new state
  let newState = setStateFunction(initialState);

  // Check that the new state is correct
  expect(newState).toEqual({
    ...initialState,
    currentVideoIndex: 2, // Expected new index after calling handlePrevious
  });

  expect(newState.videos[newState.currentVideoIndex].id.videoId).toEqual('789');

  // Call handlePrevious again
  handlePrevious(newState, mockSetState);

  // Get the function that setState was called with
  setStateFunction = mockSetState.mock.calls[1][0];

  // Call the function with the new state to get the updated state
  newState = setStateFunction(newState);

  // Check that the updated state is correct
  expect(newState).toEqual({
    ...initialState,
    currentVideoIndex: 1, // Expected new index after calling handlePrevious again
  });

  expect(newState.videos[newState.currentVideoIndex].id.videoId).toEqual('456');

  // Clean up the mock
  vi.restoreAllMocks();
});

test('handleNext updates state correctly', () => {
  // Initial state
  const initialState = {
    videos: [
      { id: { videoId: '123' } },
      { id: { videoId: '456' } },
      { id: { videoId: '789' } },
    ],
    currentVideoIndex: 1, // Assuming an initial index
  };

  // Mock useState to control the component's state
  const mockSetState = vi.fn();
  vi.spyOn(React, 'useState').mockImplementation((initial) => [initial, mockSetState]);

  // Call handleNext
  handleNext(initialState, mockSetState);

  // Get the function that setState was called with
  let setStateFunction = mockSetState.mock.calls[0][0];

  // Call the function with the initial state to get the new state
  let newState = setStateFunction(initialState);

  // Check that the new state is correct
  expect(newState).toEqual({
    ...initialState,
    currentVideoIndex: 2, // Expected new index after calling handleNext
  });

  expect(newState.videos[newState.currentVideoIndex].id.videoId).toEqual('789');

  // Call handleNext again
  handleNext(newState, mockSetState);

  // Get the function that setState was called with
  setStateFunction = mockSetState.mock.calls[1][0];

  // Call the function with the new state to get the updated state
  newState = setStateFunction(newState);

  // Check that the updated state is correct
  expect(newState).toEqual({
    ...initialState,
    currentVideoIndex: 0, // Expected new index after calling handleNext again
  });

  expect(newState.videos[newState.currentVideoIndex].id.videoId).toEqual('123');

  // Clean up the mock
  vi.restoreAllMocks();
});