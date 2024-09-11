import Link from "next/link";

interface ShelfCardProps {
	id: string;
	title: string;
	description: string;
}

const ShelfCard: React.FC<ShelfCardProps> = ({ id, title, description }) => {
	return (
		<div className="p-4 border rounded-lg">
			<h2 className="text-lg font-semibold">{title}</h2>
			<p>{description}</p>
			<Link href={`/shelves/${id}`} className="text-blue-500">
				View Shelf
			</Link>
		</div>
	);
};

export default ShelfCard;
