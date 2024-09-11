import React from "react";

interface ShelfCardProps {
	id: string;
	title: string;
	onClick: (shelfId: string) => void;
}

const ShelfCard: React.FC<ShelfCardProps> = ({ id, title, onClick }) => {
	return (
		<button
			onClick={() => onClick(id)}
			className="block w-full py-2 px-3 bg-indigo-100 text-indigo-900 hover:bg-indigo-200 rounded mb-2"
		>
			{title}
		</button>
	);
};

export default ShelfCard;
