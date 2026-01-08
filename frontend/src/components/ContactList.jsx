import React, { useState } from "react";
import { Users, Search, SortAsc, SortDesc } from "lucide-react";
import ContactItem from "./ContactItem";
import Loader from "./Loader";

const ContactList = ({ contacts, loading, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone.includes(searchTerm)
    );
  });

  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="card flex items-center justify-center py-12">
        <Loader size="lg" text="Loading contacts..." />
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Contacts</h2>
            <p className="text-sm text-gray-600">
              {sortedContacts.length}{" "}
              {sortedContacts.length === 1 ? "contact" : "contacts"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                   hover:bg-gray-100 rounded-lg transition-colors"
          title={`Sort ${
            sortOrder === "desc" ? "oldest first" : "newest first"
          }`}
        >
          {sortOrder === "desc" ? (
            <>
              <SortDesc className="w-4 h-4" />
              Newest
            </>
          ) : (
            <>
              <SortAsc className="w-4 h-4" />
              Oldest
            </>
          )}
        </button>
      </div>

      {/* Search Bar */}
      {contacts.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                       hover:text-gray-600 text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Contact List */}
      {sortedContacts.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {searchTerm ? "No contacts found" : "No contacts yet"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Create your first contact using the form above"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedContacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
