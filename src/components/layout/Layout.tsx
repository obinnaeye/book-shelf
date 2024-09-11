import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchShelves } from "@/services/api";
import { MenuIcon, XIcon } from "lucide-react";

interface LayoutProps {
	children: React.ReactNode;
}

interface Shelf {
	id: string;
	title: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [shelves, setShelves] = useState<Shelf[]>([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const getShelves = async () => {
			const shelvesData = await fetchShelves();
			setShelves(shelvesData);
		};

		getShelves();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
				<div className="flex items-center space-x-2">
					<img
						src="/images/logo.png"
						alt="Logo"
						className="w-20 h-20"
					/>
					<h1 className="text-xl font-semibold">Bookshelf App</h1>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex space-x-6">
					<Link
						href="/about"
						className="text-white hover:text-gray-300"
					>
						About
					</Link>
				</nav>

				{/* Mobile Menu Toggle */}
				<div className="md:hidden">
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="text-white focus:outline-none"
					>
						{isMobileMenuOpen ? (
							<XIcon className="h-6 w-6" />
						) : (
							<MenuIcon className="h-6 w-6" />
						)}
					</button>
				</div>
			</header>

			{isMobileMenuOpen && (
				<aside className="md:hidden bg-gray-100 p-4 shadow-inner">
					<h2 className="text-lg font-semibold mb-4">Shelves</h2>
					<ul className="space-y-2">
						{shelves.map((shelf) => (
							<li key={shelf.id}>
								<Link
									href={`/shelves/${shelf.id}`}
									className="block py-2 px-3 bg-indigo-100 text-indigo-900 hover:bg-indigo-200 rounded"
									onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
								>
									{shelf.title}
								</Link>
							</li>
						))}
					</ul>
				</aside>
			)}

			<div className="flex flex-1">
				{/* Side Navigation for Desktop */}
				<aside className="hidden md:block w-64 bg-gray-100 p-4 shadow-inner">
					<h2 className="text-lg font-semibold mb-4">Shelves</h2>
					<ul className="space-y-2">
						{shelves.map((shelf) => (
							<li key={shelf.id}>
								<Link
									href={`/shelves/${shelf.id}`}
									className="block py-2 px-3 bg-indigo-100 text-indigo-900 hover:bg-indigo-200 rounded"
								>
									{shelf.title}
								</Link>
							</li>
						))}
					</ul>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6 bg-white">{children}</main>
			</div>

			{/* Footer */}
			<footer className="bg-indigo-600 text-white p-4 flex justify-between items-center mt-auto">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Bookshelf App
				</p>
				<div className="flex space-x-4">
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						Twitter
					</a>
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						Facebook
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						Instagram
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
