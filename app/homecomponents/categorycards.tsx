import Image from 'next/image';

export default function CategoryCard({ src, alt, text } : { src: string, alt: string, text: string }) {
    return (
        <div className="w-full group relative overflow-hidden" style={{ height : '200px'}} >
        <div className="transform transition-transform duration-500 group-hover:scale-105">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={200}
            layout="responsive"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className= "absolute bottom-[25%] top-25% left-0 w-[75%] bg-black bg-opacity-50 text-white text-center py-7 px-10 text-2xl text-nowrap font-mono">
          <p>{text}</p>
        </div>

      </div>

    );
  };
  
 
    
