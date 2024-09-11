interface BookCardProps {
	title: string;
	cover: string;
	authors: string;
	price: string | null;
}

const BookCard: React.FC<BookCardProps> = ({
	title,
	cover,
	authors,
	price,
}) => {
	return (
		<div className="p-4 border rounded-lg">
			{cover && (
				<img
					src={cover}
					alt={title}
					className="w-full h-48 object-cover"
				/>
			)}
			<h3 className="mt-2 text-lg font-semibold">{title}</h3>
			{authors && <p className="text-sm text-gray-500">By: {authors}</p>}
			{price && <p className="text-sm text-green-500">{price}</p>}
		</div>
	);
};

export default BookCard;
