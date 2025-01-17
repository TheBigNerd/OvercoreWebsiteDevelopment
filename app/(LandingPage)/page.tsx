import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import CategoryCardContainer from "./_components/categorycardcontainer";

export default function Page() {
    return(
        <>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
        <CategoryCardContainer />
      </div>
        <Footer/>
        </>
    )
}