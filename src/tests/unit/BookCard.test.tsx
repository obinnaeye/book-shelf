import BookCard from "@/components/ui/BookCard";
import { render } from "@testing-library/react";
import test from "node:test";

test("renders BookCard component", () => {
	const book = {
		title: "Test Book",
		cover: "cover.jpg",
		authors: ["Author One"],
		price: "10 USD",
	};
	render(<BookCard {...book} />);
	expect(screen.getByText("Test Book")).toBeInTheDocument();
	expect(screen.getByText("By: Author One")).toBeInTheDocument();
	expect(screen.getByText("10 USD")).toBeInTheDocument();
});
