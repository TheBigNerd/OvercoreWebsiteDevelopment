import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/footer/Page";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}