import { useEffect, useState } from "react";
import { fetchBooksInShelf } from "@/services/api";
import Image from "next/image";
import { BookDisplayModel } from "@/services/util";

interface BooksProps {
	shelfId: string;
}

const Books: React.FC<BooksProps> = ({ shelfId }) => {
	const [books, setBooks] = useState<BookDisplayModel[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const limit = 21;
	const offset = (currentPage - 1) * limit;

	useEffect(() => {
		const fetchShelfBooks = async () => {
			setLoading(true);
			const fetchedBooks = await fetchBooksInShelf(
				shelfId,
				offset,
				limit
			);
			setBooks(fetchedBooks);
			setLoading(false);
		};

		fetchShelfBooks();
	}, [shelfId, currentPage]);

	const handleNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Books in Shelf</h2>

			{loading ? (
				<p>Loading books...</p>
			) : (
				<div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{books.map((book) => (
							<div
								key={book.id}
								className="bg-gray-100 p-2 rounded-lg shadow"
							>
								{book.cover && (
									<div className="relative w-full aspect-[2/3]">
										<Image
											src={book.cover}
											alt={book.title}
											layout="fill"
											objectFit="cover"
											className="rounded"
										/>
									</div>
								)}
								<div className="mt-2">
									<h3 className="text-lg font-medium">
										{book.title}
									</h3>
									{book.authors && (
										<p className="text-gray-700">
											{book.authors}
										</p>
									)}
									{book.price && (
										<p className="text-green-600">
											{book.price}
										</p>
									)}
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-between items-center mt-6">
						<button
							className={`px-4 py-2 bg-indigo-600 text-white rounded ${
								currentPage === 1
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
							onClick={handlePrevPage}
							disabled={currentPage === 1}
						>
							Previous
						</button>

						<button
							className="px-4 py-2 bg-indigo-600 text-white rounded"
							onClick={handleNextPage}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Books;
