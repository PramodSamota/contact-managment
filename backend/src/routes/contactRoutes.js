import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
} from "../controller/contactController.js";
import { validateContact } from "../middleware/validator.js";

const router = express.Router();

router.route("/").get(getContacts).post(validateContact, createContact);

router
  .route("/:id")
  .get(getContact)
  .put(validateContact, updateContact)
  .delete(deleteContact);

export default router;
