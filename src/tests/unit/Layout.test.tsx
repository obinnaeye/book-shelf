import Layout from "@/components/layout/Layout";
import { fetchShelves } from "@/services/api";
import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("@/services/api");
const mockFetchShelves = fetchShelves as jest.MockedFunction<
	typeof fetchShelves
>;

describe("Layout Component", () => {
	mockRouter.push("/");
	const mockShelves = [
		{
			id: "TestID",
			title: "Test Title",
		},
	];
	mockFetchShelves.mockResolvedValue(mockShelves);
	test("renders header and footer", async () => {
		render(<Layout>Content</Layout>);

		await waitFor(() => {
			expect(screen.getByText("Bookshelf App")).toBeInTheDocument();
		});
	});

	test("renders children content", async () => {
		render(<Layout>Test Content</Layout>);

		await waitFor(() => {
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});
	});
});
