import React from 'react';

const FormContact: React.FC = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative w-full h-64">
        <img
          src="/images/ContactBG.jpeg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <h1 className="text-4xl text-white font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto py-12 px-4 flex flex-wrap justify-between">
        {/* Support Information and Live Chat Section */}
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-2xl font-bold mb-4">Support Information</h2>
          <p>Hours of Support: 9 AM - 5 PM</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Email: support@example.com</p>

          {/* Divider Line */}
          <hr className="w-96 my-8 border-gray-300" />

          {/* Live Chat Information */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Live Chat Information</h2>
            <p>Our live chat feature will be available soon. Stay tuned!</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
          <form className="flex flex-col space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              ></textarea>
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
    </div>
  );
};

export default FormContact;