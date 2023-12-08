import createFetchMock from 'vitest-fetch-mock';
import { test, vi, expect } from "vitest";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();