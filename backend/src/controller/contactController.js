import { connect } from "mongoose";
import Contact from "../models/contact.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectDB from "../config/database.js";

export const createContact = asyncHandler(async (req, res) => {
  awaitconnectDB();
  const { name, email, phone, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Contact created successfully",
    data: contact,
  });
});

export const getContacts = asyncHandler(async (req, res) => {
  await connectDB();
  const { sort = "-createdAt", limit = 100, page = 1 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const contacts = await Contact.find()
    .sort(sort)
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Contact.countDocuments();

  res.status(200).json({
    success: true,
    count: contacts.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: contacts,
  });
});

export const getContact = asyncHandler(async (req, res) => {
  awaitconnectDB();
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
    data: { id: req.params.id },
  });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    data: contact,
  });
});
