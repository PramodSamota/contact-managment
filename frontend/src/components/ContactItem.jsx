import React, { useState } from "react";
import { Trash2, Mail, Phone, MessageSquare, Calendar } from "lucide-react";

const ContactItem = ({ contact, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      setIsDeleting(true);
      try {
        await onDelete(contact._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`
        card hover:shadow-lg transition-all duration-300 
        border-l-4 border-primary-500
        ${isDeleting ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {contact.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {formatDate(contact.createdAt)}
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Delete contact"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-4 h-4 text-primary-500" />
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-primary-600 hover:underline"
          >
            {contact.email}
          </a>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="w-4 h-4 text-primary-500" />
          <a
            href={`tel:${contact.phone}`}
            className="hover:text-primary-600 hover:underline"
          >
            {contact.phone}
          </a>
        </div>

        {contact.message && (
          <div className="flex gap-3 text-gray-700 pt-3 border-t border-gray-100">
            <MessageSquare className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
            <p className="text-sm leading-relaxed">{contact.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
