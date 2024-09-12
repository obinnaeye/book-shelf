import { useEffect, useState } from "react";
import { fetchBookById, fetchBookIds } from "@/services/api";
import Image from "next/image";
import { BookDisplayModel, mapBookToDisplayModel } from "@/services/util";
import { from, mergeMap, Observable, scan } from "rxjs";

interface BooksProps {
	shelfId: string;
}

const Books: React.FC<BooksProps> = ({ shelfId }) => {
	const [books, setBooks] = useState<BookDisplayModel[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const limit = 20;
	const offset = (currentPage - 1) * limit;

	useEffect(() => {
		const fetchBooks$ = (
			bookIds: string[]
		): Observable<BookDisplayModel[]> => {
			return from(bookIds).pipe(
				mergeMap((id) => fetchBookById(id)),
				scan<BookDisplayModel, BookDisplayModel[]>(
					(acc, book) => [...acc, book],
					[]
				)
			);
		};

		const fetchData = async () => {
			setLoading(true);

			const bookIds = await fetchBookIds(shelfId, offset, limit);

			const subscription = fetchBooks$(bookIds).subscribe(
				(fetchedBooks) => {
					const mappedBooks = [];
					for (const book of fetchedBooks) {
						if (book.hasOwnProperty("id")) {
							mappedBooks.push(book);
						}
					}
					setBooks(
						mappedBooks.map(
							mapBookToDisplayModel
						) as BookDisplayModel[]
					);
				}
			);

			setLoading(false);

			return () => subscription.unsubscribe();
		};

		fetchData();
	}, [shelfId]);

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
					<div
						className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
						data-testid="book-list"
					>
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
											fill
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
							data-testid="prev-btn"
						>
							Previous
						</button>

						<button
							className="px-4 py-2 bg-indigo-600 text-white rounded"
							onClick={handleNextPage}
							data-testid="next-btn"
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
