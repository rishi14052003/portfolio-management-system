import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, Phone, Building2, Target, DollarSign, Share2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Lead } from '@/types';
import { formatDateShort } from '@/utils/formatDate';
import { adminService } from '@/services/adminService';
import { useState } from 'react';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  const [showPdfNaming, setShowPdfNaming] = useState(false);
  const [pdfName, setPdfName] = useState(lead?.pdf_filename?.replace('.pdf', '') || '');

  if (!lead) return null;

  const handleDownloadPdf = () => {
    if (showPdfNaming && pdfName) {
      // Download with custom name
      const link = document.createElement('a');
      link.href = adminService.getPdfUrl(lead.pdf_filename);
      link.download = `${pdfName}.pdf`;
      link.click();
      toast.success('PDF downloaded!');
      setShowPdfNaming(false);
    } else if (!showPdfNaming) {
      setShowPdfNaming(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lead Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{lead.full_name}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{lead.email}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{lead.phone}</p>
                </div>
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
                Inquiry Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Target className="w-4 h-4" />
                    Purpose
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {lead.purpose ? (
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        {lead.purpose}
                      </span>
                    ) : (
                      '-'
                    )}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Building2 className="w-4 h-4" />
                    Company
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{lead.company || '-'}</p>
                </div>
                {lead.budget && (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <DollarSign className="w-4 h-4" />
                      Budget
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                        {lead.budget}
                      </span>
                    </p>
                  </div>
                )}
                {lead.source && (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <Share2 className="w-4 h-4" />
                      Found Me Via
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">{lead.source}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Message
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {lead.introduction}
                </p>
              </div>
            </div>

            {/* Submission Date */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              Submitted on {formatDateShort(lead.created_at)}
            </div>

            {/* PDF Naming */}
            {showPdfNaming && lead.pdf_filename && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  PDF Filename (without .pdf extension)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                    placeholder="e.g., lead-rishabh-jain"
                    className="input-field flex-1"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowPdfNaming(false)}
                    className="px-3 py-2 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              {lead.pdf_filename && (
                <button
                  onClick={handleDownloadPdf}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {showPdfNaming ? 'Confirm Download' : 'Download PDF'}
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
