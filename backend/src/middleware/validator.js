export const validateContact = (req, res, next) => {
  const { name, email, phone } = req.body;
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = "Please provide a valid phone number";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};
