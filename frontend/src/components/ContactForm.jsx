import React, { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { validateContactForm, isFormValid } from "../utils/validation";
import Loader from "./Loader";

const ContactForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateContactForm(formData);
    if (validationErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      try {
        await onSubmit(formData);

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setTouched({});
        setErrors({});
      } catch (error) {
        // Error handling is done in parent component
      }
    }
  };

  const formIsValid = isFormValid(validateContactForm(formData));

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Contact
        </h2>
        <p className="text-gray-600">
          Fill in the details below to add a new contact
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              className={`input-field pl-10 ${
                touched.name && errors.name ? "border-red-500" : ""
              }`}
            />
          </div>
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              className={`input-field pl-10 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 123-4567"
              className={`input-field pl-10 ${
                touched.phone && errors.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your message here..."
              rows="4"
              className={`input-field pl-10 resize-none ${
                touched.message && errors.message ? "border-red-500" : ""
              }`}
            />
          </div>
          {touched.message && errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.message.length}/1000 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={!formIsValid || loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader size="sm" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Contact
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
