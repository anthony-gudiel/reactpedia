import { test, vi, expect } from 'vitest';
import { onSearch } from '../../../src/pages/videos/videos';
import youtube from '../../../src/api/youtube';

test('Testing onSearch function', async () => {
  const keyword = 'react';

  // Mock the youtube.get method
  const mockResponse = {
    ok: true,
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