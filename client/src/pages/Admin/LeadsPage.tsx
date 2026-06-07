import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Download, Trash2, ChevronLeft, ChevronRight, User, FileDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminService } from '@/services/adminService';
import type { Lead } from '@/types';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { formatDateShort } from '@/utils/formatDate';
import { LeadDetailModal } from '@/components/admin/LeadDetailModal';

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [exporting, setExporting] = useState(false);
  const perPage = 10;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getLeads({
        page,
        per_page: perPage,
        search: search || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      setLeads(data.leads);
      setTotalPages(data.total_pages);
      setTotal(data.total);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [page, search, dateFrom, dateTo]);

  useEffect(() => {
    const debounce = setTimeout(fetchLeads, 300);
    return () => clearTimeout(debounce);
  }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await adminService.deleteLead(id);
      toast.success('Lead deleted successfully');
      fetchLeads();
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleViewPdf = (filename: string) => {
    window.open(adminService.getPdfUrl(filename), '_blank');
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await adminService.exportCSV();
      toast.success('Leads exported as CSV successfully');
    } catch {
      toast.error('Failed to export CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      await adminService.exportExcel();
      toast.success('Leads exported as Excel successfully');
    } catch {
      toast.error('Failed to export Excel');
    } finally {
      setExporting(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const hasFilters = search || dateFrom || dateTo;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage all submitted leads and inquiries</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            disabled={exporting || leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <FileDown className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={handleExportExcel}
            disabled={exporting || leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <FileDown className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-primary-200/50 dark:border-primary-800/50"
      >
        <div className="space-y-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Date Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6"><TableSkeleton rows={5} /></div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No leads found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {hasFilters ? 'Try adjusting your filters' : 'Leads will appear here when submissions are received'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Purpose</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{lead.full_name}</div>
                      {lead.purpose && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                            {lead.purpose}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      <div>{lead.email}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {lead.company ? (
                        <span className="text-sm text-gray-700 dark:text-gray-300">{lead.company}</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDateShort(lead.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                          title="View full details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {lead.pdf_filename && (
                          <button
                            onClick={() => handleViewPdf(lead.pdf_filename)}
                            className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                          title="Delete lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold">{(page - 1) * perPage + 1}</span>-
              <span className="font-semibold">{Math.min(page * perPage, total)}</span> of{' '}
              <span className="font-semibold">{total}</span> leads
            </p>
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
