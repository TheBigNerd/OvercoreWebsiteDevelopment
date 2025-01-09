import HeroBanner from '../_components/herobanner';
export default function Page() {
    return(
        <div>
            <div className=''>
                <HeroBanner />
            </div>
            <div className="flex justify-between items-center">
                <img src="../images/BrowseWorkstation.jpg" alt="" className="w-1/4 ml-[12%] mt-[5%]" />
                <p className="w-1/2 text-center">ahfhfajfafdajkdslfdjsafsalkjfjals hdadasfldsafalfdhdsa fahfdafhjakhf af hjafdjda hjfda lhfdldsfljafljfdsaldfjlsajfajfja ljds jhahj hjda hjdsaalffd ljfjfdajd fjda </p>
            </div>
            <div className="flex justify-between items-center">
                <p className="w-1/2 text-center">text here please darlin</p>
                <img src="../images/BrowseWorkstation.jpg" alt="" className="w-1/4 mr-[12%] mt-[5%]" />
            </div>
            <div className="flex justify-between items-center">
                <img src="../images/BrowseWorkstation.jpg" alt="" className="w-1/4 ml-[12%] mt-[5%] mb-[5%]" />
                <p className="w-1/2 text-center">ahfhfajfafdajkdslfdjsafsalkjfjals hdadasfldsafalfdhdsa fahfdafhjakhf af hjafdjda hjfda lhfdldsfljafljfdsaldfjlsajfajfja ljds jhahj hjda hjdsaalffd ljfjfdajd fjda </p>
            </div>
        </div>

    )
}