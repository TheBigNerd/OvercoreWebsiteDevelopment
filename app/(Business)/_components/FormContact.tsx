"use client"

import React, { useRef, useState } from 'react';
import { addContactForm } from '../business/ContactUs/addContactForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FormContact: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await addContactForm(formData);
    if (result) {
      console.error('Form submission failed:', result);
      setSuccessMessage(null);
    } else {
      setSuccessMessage('Thank you for your enquiry. We will get back to you soon!');
      
    }
  };

  return (
    
    <div className="flex flex-col md:flex-row w-full px-8 py-8">
  {/* Form Section */}
 
  <div className="w-full md:w-1/2 px-8 md:ml-auto">
    <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
    <form className="flex flex-col space-y-6 bg-gray-200 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex space-x-4 ">
        <div className="w-1/2">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
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
          <Input
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
        <Input
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
        <Textarea
          id="message"
          name="message"
          className="w-full py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          required
        ></Textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-slate-500 text-white py-3 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        Send
      </button>
    </form>
    {successMessage && (
      <div className="mt-4 text-green-500 font-bold">
        {successMessage}
      </div>
    )}
  </div>

  {/* Contact Information */}
<div className="w-full md:w-1/2 px-8 pb-8 ">
<h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
  <p>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
    illo inventore veritatis et quasi architecto beatae vitae dicta sunt
    explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
    odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
    quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
    eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
    voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
    nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
    nulla pariatur?
  </p>
  <br />
  <h2 className="text-2xl font-bold mb-8 text-center">Contact Methods</h2>
  <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
    <p>Mobile: 07552776284</p>
    <p>Email: farhan@overcore.co.uk</p>
    <p>LinkedIn: OvercoreLTD</p>
  </div>
</div>
</div>

  );
};

export default FormContact;