import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchShelves } from "@/services/api";
import ShelfCard from "../ui/ShelfCard";
import { Menu, X } from "lucide-react";

interface LayoutProps {
	children: React.ReactNode;
}

interface Shelf {
	id: string;
	title: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [shelves, setShelves] = useState<Shelf[]>([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const getShelves = async () => {
			const shelvesData = await fetchShelves();
			setShelves(shelvesData);
		};

		getShelves();
	}, []);

	const handleShelfClick = (shelfId: string) => {
		setIsSidebarOpen(false); // Close sidebar on mobile after clicking
		router.push(`/shelves/${shelfId}`);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
				<div className="flex items-center space-x-4">
					<img
						src="/images/logo.png"
						alt="Logo"
						className="w-20 h-20"
					/>
					<h1
						className="text-xl font-semibold"
						data-testid="app-title"
					>
						Bookshelf App
					</h1>
				</div>
				{/* Menu Toggle for Mobile */}
				<button
					className="md:hidden text-white"
					onClick={toggleSidebar}
				>
					{isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</header>

			<div className="flex flex-1">
				{/* Side Navigation (hidden on mobile) */}
				<aside
					className={`${
						isSidebarOpen ? "block" : "hidden"
					} md:block w-64 bg-gray-100 p-4 shadow-inner absolute md:relative z-40 top-16 left-0 md:static md:h-auto h-screen`}
				>
					<h2 className="text-lg font-semibold mb-4">Shelves</h2>
					<ul className="space-y-2" data-testid="shelves-list">
						{shelves.map((shelf) => (
							<li key={shelf.id}>
								<ShelfCard
									id={shelf.id}
									title={shelf.title}
									onClick={handleShelfClick}
								/>
							</li>
						))}
					</ul>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6 bg-white">{children}</main>
			</div>

			{/* Footer */}
			<footer className="bg-indigo-600 text-white p-4 flex justify-between items-center mt-auto z-50">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Bookshelf App
				</p>
			</footer>
		</div>
	);
};

export default Layout;
