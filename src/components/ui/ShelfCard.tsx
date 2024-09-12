import React from "react";

interface ShelfCardProps {
	id: string;
	title: string;
	selected: boolean;
	onClick: (shelfId: string) => void;
}

const ShelfCard: React.FC<ShelfCardProps> = ({
	id,
	title,
	selected,
	onClick,
}) => {
	return (
		<button
			onClick={() => onClick(id)}
			className={`block p-2 rounded ${
				selected
					? "bg-blue-500 text-white"
					: "bg-gray-100 text-gray-800"
			} hover:bg-blue-400 hover:text-white transition-colors`}
		>
			{title}
		</button>
	);
};

export default ShelfCard;
