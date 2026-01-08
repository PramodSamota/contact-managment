import React from "react";
import { BookUser } from "lucide-react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Toast from "./components/Toast";
import { useContacts } from "./hooks/useContacts";
import { useToast } from "./hooks/useToast";

function App() {
  const { contacts, loading, createContact, deleteContact } = useContacts();
  const { toasts, removeToast, success, error } = useToast();

  const handleCreateContact = async (data) => {
    try {
      await createContact(data);
      success("Contact created successfully! 🎉");
    } catch (err) {
      error(err.message || "Failed to create contact");
      throw err;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      success("Contact deleted successfully");
    } catch (err) {
      error(err.message || "Failed to delete contact");
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toast toasts={toasts} onClose={removeToast} />

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-3 rounded-xl">
              <BookUser className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              <p className="text-gray-600 text-sm"></p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <ContactForm onSubmit={handleCreateContact} loading={loading} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactList
              contacts={contacts}
              loading={loading}
              onDelete={handleDeleteContact}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Built with React, Node.js, Express & MongoDB
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
