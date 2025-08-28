import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    setForm({ ...form, [name]: e.target.checked });
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    if (!form.agree) {
      alert("You must agree to Terms of Use and Privacy Policy");
    return;
  }

    alert("Thank you for contacting us!");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      agree: false,
    });
  };

  return (
    <section id="contactus" className="py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left">
          {/* Logo placeholder */}
          <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-gray-200">
            <span className="text-lg">●●</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-600">Get in Touch</h2>
        </div>

        {/* Right Column (Form) */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded bg-gray-100"
                required
              />
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex">
                <select className="p-3 border rounded-l bg-gray-100">
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-0 w-full p-3 border-t border-b border-r rounded-r bg-gray-100"
                  required
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your Message"
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded bg-gray-100 h-28"
              required
            />
          </div>

          {/* Checkbox + Button */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mr-2"
              />
              I agree with Terms of Use and Privacy Policy
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
