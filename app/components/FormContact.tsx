import React from 'react';

const FormContact: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl min-h-[600px]">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <form className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;