import Head from 'next/head';

export default function software() {
    return(
    <>
    <div className="relative w-full h-64">
        <img
          src="/images/software.jpeg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <h1 className="text-5xl text-white font-bold">Software Solutions</h1>
        </div>
      </div>
    </>
    );
}