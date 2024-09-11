import { BookDisplayModel, mapBookToDisplayModel } from "./util";

const API_BASE = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const fetchShelves = async () => {
	try {
		const response = await fetch(
			`${API_BASE}/users/5a8411b53ed02c04187ff02a/shelves`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch shelves");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching shelves:", error);
		return [];
	}
};

export const fetchBookIds = async (
	shelfId: string,
	offset: number,
	limit: number
) => {
	try {
		const response = await fetch(
			`${API_BASE}/shelves/${shelfId}/forms?offset=${offset}&limit=${limit}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch book ids");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching book ids:", error);
		return null;
	}
};

export const fetchBookById = async (bookId: string) => {
	try {
		const response = await fetch(`${API_BASE}/forms/${bookId}`);
		if (!response.ok) {
			throw new Error("Failed to fetch book");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching book:", error);
		return null;
	}
};

export const fetchBooksInShelf = async (
	shelfId: string,
	offset: number = 0,
	limit: number = 20
) => {
	try {
		const bookIds: string[] = await fetchBookIds(shelfId, offset, limit);
		const books = [];
		for (const bookId of bookIds) {
			const book = await fetchBookById(bookId);
			if (book.hasOwnProperty("id")) {
				books.push(book);
			}
		}
		return books.map(mapBookToDisplayModel) as BookDisplayModel[];
	} catch (error) {
		console.error("Error fetching books:", error);
		return [];
	}
};
