export const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name cannot exceed 100 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  } else if (data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Phone number must be at least 10 digits";
  }

  if (data.message && data.message.length > 1000) {
    errors.message = "Message cannot exceed 1000 characters";
  }

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
