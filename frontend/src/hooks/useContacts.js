import { useState, useEffect, useCallback } from "react";
import { contactAPI } from "../services/api";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all contacts
  const fetchContacts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.getAll(params);
      setContacts(response.data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create contact
  const createContact = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.create(data);
      setContacts((prev) => [response.data, ...prev]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await contactAPI.delete(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    deleteContact,
  };
};
