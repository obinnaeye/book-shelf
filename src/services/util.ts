export type BookDisplayModel = {
	authors: string[];
	price: string;
	cover: string;
	title: string;
	id: string;
};

const extractAuthors = (authors: any[]): string => {
	if (!authors) return "";

	if ((authors.length = 1)) return authors[0]?.name ?? "";

	const concatenatedAuthors = authors.reduce((prev, curr, i) => {
		prev =
			i == authors.length - 1
				? `${prev} & ${curr.name}`
				: `${prev} & ${curr.name}`;
		return prev;
	}, "");
	return concatenatedAuthors;
};

const extractPrice = (price: any): string => {
	if (!price) return "";
	if (typeof price == "string") return price;
	if (typeof price == "object") {
		const amount = price.amount ?? "";
		const currency = price.currency ?? "";
		return `${currency}${amount}`;
	}
	return "";
};

export const mapBookToDisplayModel = (book: any) => {
	if (!book) return {};
	const { id, authors, price, cover = null, title, image = "" } = book ?? {};
	return {
		id: id,
		authors: extractAuthors(authors),
		price: extractPrice(price),
		cover: cover ?? image,
		title,
	};
};
