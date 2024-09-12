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
		return [];
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
