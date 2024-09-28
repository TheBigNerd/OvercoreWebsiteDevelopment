import Link from 'next/link';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/"className="mt-6 inline-block px-6 py-3 bg-slate-600 text-white rounded-lg shadow hover:bg-slate-700">
          
            Go Home
          
        </Link>
      </div>
    </div>
  );
}

export default Error;