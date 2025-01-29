import HeroBanner from '../_components/herobanner';
export default function Page() {
    return(
        <div className="py-0">
            <div className=''>
                <HeroBanner />
            </div>
            <div className='py-0 space-y-2'>
            <div className="flex justify-between items-center bg-gray-200 py-10">
                <img src="../images/BrowseWorkstation.jpg" alt="" className="h-1/2 w-1/4 items-center ml-[12%] drop-shadow-xl" />
                <div className="w-1/2 text-center px-20">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Tech Team Service</h3>
                    <p className="text-base md:text-lg lg:text-xl">Need a tech team without the overhead? Our Tech Team as a Service provides on-demand IT support, troubleshooting, projec development, and strategic tech expertise - whether for a short-term or long-term growth. Think of us as your flexible, always-ready IT department.</p>
                </div>
            </div>
            <div className="flex justify-between items-center py-10">
                <div className="w-1/2 text-center px-20">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Bespoke Software Solutions</h3>
                    <p className="text-base md:text-lg lg:text-xl">We design and develop tailor-made software solutions fit for your exact needs - whether it's a SaaS plaform, internal tools, or any enterprise application. From idea to deploymeny, we handle everything, ensuring seamless integration, scalability, and top-teir performance. Your vision, our code.</p>
                </div>
                <img src="../images/BrowseWorkstation.jpg" alt="" className="w-1/4 mr-[12%] drop-shadow-xl" />
            </div>
            <div className="flex justify-between items-center bg-gray-200 py-10">
                <img src="../images/BrowseWorkstation.jpg" alt="" className="w-1/4 ml-[12%] drop-shadow-xl" />
                <div className="w-1/2 text-center px-20">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Tailored Hardware</h3>
                    <p className="text-base md:text-lg lg:text-xl">We design and deploy custom-built servers, NAS solutions, high-performance computing systems, and specialized hardware tailored to your workload demands. Whether you need optimized compute power, scalable storage architectures, or enterprise-grade infrastructure, our expert engineers craft hardware solutions that maximize efficiency, reliability, and performance.</p>
                </div>
            </div>
            </div>
        </div>

    )
}