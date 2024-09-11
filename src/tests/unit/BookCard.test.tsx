import BookCard from "@/components/ui/BookCard";
import { render, screen } from "@testing-library/react";

describe("BookCard", () => {
	test("renders BookCard component", () => {
		const book = {
			title: "Test Book",
			cover: "cover.jpg",
			authors: "Author One",
			price: "10 USD",
			id: "TesID",
		};
		render(<BookCard {...book} />);
		expect(screen.getByText("Test Book")).toBeInTheDocument();
		expect(screen.getByText("By: Author One")).toBeInTheDocument();
		expect(screen.getByText("10 USD")).toBeInTheDocument();
	});
});
