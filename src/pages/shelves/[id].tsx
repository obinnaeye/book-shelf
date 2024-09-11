import { GetServerSideProps } from "next";
import { fetchBooksInShelf } from "../../services/api";
import BookCard from "@/components/ui/BookCard";
import { mapBookToDisplayModel } from "@/services/util";
import * as fs from "fs";

interface Book {
	title: string;
	cover: string;
	authors: string;
	price: string | null;
}

interface ShelfPageProps {
	books: Book[];
}

const ShelfPage: React.FC<ShelfPageProps> = ({ books }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{books.map((book) => (
				<BookCard key={book.title} {...book} />
			))}
		</div>
	);
};

// const BooksPage: React.FC<BooksPageProps> = ({ books, shelfId }) => {
// 	const [page, setPage] = useState(1);

// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// 			{books.map((book) => (
// 				<BookCard key={book.title} {...book} />
// 			))}
// 			<div className="mt-4 flex justify-center">
// 				<button onClick={() => setPage(page - 1)} disabled={page === 1}>
// 					Previous
// 				</button>
// 				<span className="mx-2">Page {page}</span>
// 				<button onClick={() => setPage(page + 1)}>Next</button>
// 			</div>
// 		</div>
// 	);
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params as { id: string };
	const response = await fetchBooksInShelf(id);
	const filteredResponse = response.filter((res) => res.hasOwnProperty("id"));
	const books = filteredResponse.map(mapBookToDisplayModel);
	fs.writeFile("test.json", JSON.stringify(books), function (err: any) {
		if (err) {
			console.log(err);
		}
	});
	return { props: { books } };
};

export default ShelfPage;
