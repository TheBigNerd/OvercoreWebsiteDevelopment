import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}