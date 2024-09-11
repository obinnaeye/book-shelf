import Books from "@/components/ui/Books";
import { GetServerSideProps } from "next";

interface ShelfProps {
	shelfId: string;
}

const ShelfPage: React.FC<ShelfProps> = ({ shelfId }) => {
	return (
		<div>
			<Books shelfId={shelfId} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params!;

	return {
		props: {
			shelfId: id,
		},
	};
};

export default ShelfPage;
