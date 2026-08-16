import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-center mb-12">
          We'd love to hear from you! Please reach out with any questions, feedback, or custom requests.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> gbilla115@gmail.com <br />
              <strong>Phone:</strong> +91 9486211884 <br />
              <strong>Address:</strong> 123 Saree Lane, Textile City, India
            </p>
          </div>
          {/* You can add a contact form here later if needed */}
          <p className="text-center text-gray-600 mt-8">
            Our team is available Monday to Friday, 9 AM to 6 PM (IST).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;