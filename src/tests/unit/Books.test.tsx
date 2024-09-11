import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Books from "@/components/ui/Books";
import { fetchBooksInShelf } from "@/services/api";
import { testImage } from "./utils/mock-data";

jest.mock("@/services/api");

const mockFetchBooksInShelf = fetchBooksInShelf as jest.MockedFunction<
	typeof fetchBooksInShelf
>;

describe("Books Component", () => {
	test("renders books correctly", async () => {
		const mockBooks = [
			{
				id: "1",
				cover: testImage,
				title: "Book Title",
				authors: "Author Name",
				price: "$10",
			},
		];

		mockFetchBooksInShelf.mockResolvedValue(mockBooks);

		render(<Books shelfId="123" />);

		await waitFor(() => {
			expect(screen.getByText("Book Title")).toBeInTheDocument();
		});
	});
});
