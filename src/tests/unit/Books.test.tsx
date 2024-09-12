import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Books from "@/components/ui/Books";
import { fetchBookById, fetchBookIds } from "@/services/api";
import { testImage } from "./utils/mock-data";
import { BookDisplayModel } from "@/services/util";

jest.mock("@/services/api");

describe("Books component", () => {
	const mockedFetchBookById = fetchBookById as jest.MockedFunction<
		typeof fetchBookById
	>;
	const mockedFetchBookIds = fetchBookIds as jest.MockedFunction<
		typeof fetchBookIds
	>;

	const mockBookIds = ["book1", "book2"];
	const mockBooks: BookDisplayModel[] = [
		{
			id: "book1",
			cover: testImage,
			title: "Book One Title",
			authors: "Author Name",
			price: "$10",
		},
		{
			id: "book2",
			title: "Book Two Title",
			cover: testImage,
			authors: "Author Two",
			price: "$15",
		},
	];

	beforeEach(() => {
		mockedFetchBookIds.mockResolvedValue(mockBookIds);
		mockedFetchBookById.mockImplementation((id: string) =>
			Promise.resolve(mockBooks.find((book) => book.id === id))
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders books correctly", async () => {
		render(<Books shelfId="123" />);

		await waitFor(() => {
			expect(screen.getByText("Book One Title")).toBeInTheDocument();
			expect(screen.getByText("Book Two Title")).toBeInTheDocument();
		});
	});
});
