// import { GetServerSideProps } from "next";
// import { fetchShelves } from "../services/api";
// import ShelfCard from "@/components/ui/ShelfCard";

// interface Shelf {
// 	id: string;
// 	title: string;
// 	description: string;
// }

// interface ShelvesPageProps {
// 	shelves: Shelf[];
// }

// const ShelvesPage: React.FC<ShelvesPageProps> = ({ shelves }) => {
// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// 			{shelves.map((shelf) => (
// 				<ShelfCard key={shelf.id} {...shelf} />
// 			))}
// 		</div>
// 	);
// };

// export const getServerSideProps: GetServerSideProps = async () => {
// 	const shelves = await fetchShelves();
// 	return { props: { shelves } };
// };

// export default ShelvesPage;
// src/pages/index.tsx
export default function Home() {
	return (
		<div>
			<h2 className="text-xl font-bold">Welcome to the Bookshelf App</h2>
			<p>Select a shelf from the sidebar to view its books.</p>
		</div>
	);
}
