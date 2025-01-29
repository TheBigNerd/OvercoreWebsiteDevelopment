import Image from 'next/image';
import Link from 'next/link';
import underConstruction from '/public/images/construction.jpg';

const BusinessConstruction = () => {
  return (
    <div className="flex items-center justify-center py-10 bg-gray-100">
      <div className="text-center">
        <Image src={underConstruction} alt='under_construction' width={800} height={300}/>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Our Business Area is Under Construction
        </p>
        <p className="mt-2 text-gray-500">
          Please contact us about any business enquiries
        </p>
        <Link href="/contact"className="mt-6 inline-block px-6 py-3 bg-slate-600 text-white rounded-lg shadow hover:bg-slate-700">
            Contact Us
        </Link>
      </div>
    </div>
  );
}

export default BusinessConstruction;