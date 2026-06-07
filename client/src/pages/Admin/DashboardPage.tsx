import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Globe, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import type { AdminStats } from '@/types';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { formatDateShort } from '@/utils/formatDate';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card h-80 animate-pulse" />
          <div className="glass-card h-80 animate-pulse" />
        </div>
      </div>
    );
  }

  // Extract counts for KPI cards dynamically
  const totalLeads = stats?.total_leads ?? 0;
  const pdfsGenerated = stats?.pdfs_generated ?? 0;
  const freelanceCount = stats?.leads_by_purpose?.['Freelance Project'] ?? 0;
  const jobCount = stats?.leads_by_purpose?.['Job Opportunity'] ?? 0;

  const statCards = [
    { label: 'Total Leads', value: totalLeads, icon: Users, color: 'from-indigo-500 to-purple-500' },
    { label: 'PDFs Generated', value: pdfsGenerated, icon: FileText, color: 'from-emerald-500 to-teal-500' },
    { label: 'Freelance Inquiries', value: freelanceCount, icon: Briefcase, color: 'from-amber-500 to-orange-500' },
    { label: 'Job Opportunities', value: jobCount, icon: Building2, color: 'from-blue-500 to-cyan-500' },
  ];

  // Daily Trend SVG Chart Calculations
  const trendData = stats?.daily_trend || [];
  const maxCount = Math.max(...trendData.map(d => d.count), 5);
  
  const svgWidth = 500;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = trendData.map((d, i) => {
    const x = paddingX + (i * chartWidth) / (trendData.length - 1 || 1);
    const y = svgHeight - paddingY - (d.count / maxCount) * chartHeight;
    return { x, y, count: d.count, date: d.date };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z` 
    : '';

  // Purpose calculations
  const totalLeadsBase = totalLeads || 1;
  const purposeList = [
    { name: 'Freelance Project', count: stats?.leads_by_purpose?.['Freelance Project'] ?? 0, color: 'bg-amber-500' },
    { name: 'Job Opportunity', count: stats?.leads_by_purpose?.['Job Opportunity'] ?? 0, color: 'bg-blue-500' },
    { name: 'Collaboration', count: stats?.leads_by_purpose?.['Collaboration'] ?? 0, color: 'bg-emerald-500' },
    { name: 'Just Saying Hi', count: stats?.leads_by_purpose?.['Just Saying Hi'] ?? 0, color: 'bg-purple-500' },
  ].sort((a, b) => b.count - a.count);

  // Budget calculations (Only for freelance project leads)
  const totalBudgetLeads = Object.values(stats?.leads_by_budget || {}).reduce((a, b) => a + b, 0) || 1;
  const budgetList = [
    { range: 'Less than $500', count: stats?.leads_by_budget?.['Less than $500'] ?? 0, color: 'bg-indigo-400' },
    { range: '$500–$2,000', count: stats?.leads_by_budget?.['$500–$2,000'] ?? 0, color: 'bg-indigo-500' },
    { range: '$2,000–$5,000', count: stats?.leads_by_budget?.['$2,000–$5,000'] ?? 0, color: 'bg-indigo-600' },
    { range: '$5,000+', count: stats?.leads_by_budget?.['$5,000+'] ?? 0, color: 'bg-indigo-700' },
  ];

  // Source calculations
  const sourceList = [
    { name: 'LinkedIn', count: stats?.leads_by_source?.['LinkedIn'] ?? 0, color: 'bg-blue-600' },
    { name: 'GitHub', count: stats?.leads_by_source?.['GitHub'] ?? 0, color: 'bg-gray-800 dark:bg-gray-400' },
    { name: 'Google Search', count: stats?.leads_by_source?.['Google Search'] ?? 0, color: 'bg-emerald-500' },
    { name: 'Referral', count: stats?.leads_by_source?.['Referral'] ?? 0, color: 'bg-violet-500' },
    { name: 'Other', count: stats?.leads_by_source?.['Other'] ?? 0, color: 'bg-pink-500' },
  ].sort((a, b) => b.count - a.count);

  // PDF URL Resolver helper
  const getPdfUrl = (filename: string) => {
    if (!filename) return '#';
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/api/pdfs/${filename}`;
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4 z-10 relative">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.label}</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Leads Trend Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leads Activity Trend</h3>
              <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                Last 7 Days
              </span>
            </div>
            <p className="text-xs text-gray-500">Daily volume of incoming portfolio inquiries</p>
          </div>
          
          <div className="w-full h-56 mt-4">
            <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Gridlines */}
              {[0, 0.5, 1].map((ratio) => {
                const y = paddingY + ratio * chartHeight;
                const val = Math.round(maxCount * (1 - ratio));
                return (
                  <g key={ratio} className="opacity-30 dark:opacity-20">
                    <line 
                      x1={paddingX} 
                      y1={y} 
                      x2={svgWidth - paddingX} 
                      y2={y} 
                      stroke="currentColor" 
                      strokeDasharray="4 4"
                      className="text-gray-400 dark:text-gray-500" 
                    />
                    <text 
                      x={paddingX - 10} 
                      y={y + 3} 
                      textAnchor="end" 
                      className="text-[9px] font-semibold fill-gray-500 dark:fill-gray-400"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
              
              {/* Area path */}
              {areaD && <path d={areaD} fill="url(#chartGradient)" />}
              
              {/* Stroke path line */}
              {pathD && (
                <motion.path 
                  d={pathD} 
                  fill="none" 
                  stroke="rgb(99, 102, 241)" 
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
              
              {/* Dots, counts and date labels */}
              {points.map((p, i) => (
                <g key={i} className="group">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4.5" 
                    className="fill-white dark:fill-gray-900 stroke-indigo-500 stroke-[2.5] cursor-pointer hover:r-[6.5] transition-all duration-200" 
                  />
                  {p.count > 0 && (
                    <text 
                      x={p.x} 
                      y={p.y - 10} 
                      textAnchor="middle" 
                      className="text-[10px] font-bold fill-indigo-600 dark:fill-indigo-400"
                    >
                      {p.count}
                    </text>
                  )}
                  {/* X axis labels */}
                  <text 
                    x={p.x} 
                    y={svgHeight - paddingY + 16} 
                    textAnchor="middle" 
                    className="text-[9px] font-medium fill-gray-500 dark:fill-gray-400"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Lead Purpose Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Inquiry Purpose</h3>
            <p className="text-xs text-gray-500 mb-6">Distribution of outreach objectives</p>
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {purposeList.map((item) => {
              const pct = ((item.count / totalLeadsBase) * 100).toFixed(0);
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Budgets and Lead Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-500" />
              Freelance Budget Ranges
            </h3>
            <p className="text-xs text-gray-500 mt-1">Financial scopes for requested freelance tasks</p>
          </div>
          <div className="space-y-3.5">
            {budgetList.map((item) => {
              const pct = ((item.count / totalBudgetLeads) * 100).toFixed(0);
              return (
                <div key={item.range} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-gray-700 dark:text-gray-300">{item.range}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{item.count} leads</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.count ? `${pct}%` : '0%' }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Lead Sources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Acquisition Channels
            </h3>
            <p className="text-xs text-gray-500 mt-1">Where contacts discovered your portfolio</p>
          </div>
          <div className="space-y-3.5">
            {sourceList.map((item) => {
              const pct = ((item.count / totalLeadsBase) * 100).toFixed(0);
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Leads and Latest Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Submissions</h3>
              <p className="text-xs text-gray-500 mt-1">Latest inquiries received</p>
            </div>
            <Link 
              to="/admin/leads" 
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
            {stats?.recent_leads?.length ? (
              stats.recent_leads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 hover:bg-gray-100/40 dark:hover:bg-gray-800/60 transition-colors duration-200"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{lead.full_name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 font-medium">{formatDateShort(lead.created_at)}</span>
                    {lead.pdf_filename && (
                      <a 
                        href={getPdfUrl(lead.pdf_filename)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 transition-colors"
                        title="View Submission PDF"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No submissions recorded yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Latest Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-6"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Activity Log</h3>
            <p className="text-xs text-gray-500 mt-1">Timeline of administrative actions</p>
          </div>
          
          <div className="space-y-4 mt-6 overflow-y-auto max-h-[300px] pr-1">
            {stats?.latest_activity?.length ? (
              stats.latest_activity.map((activity) => (
                <div key={activity.id} className="flex gap-3 items-start text-sm">
                  <div className="relative flex h-2 w-2 mt-1.5 items-center justify-center shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-xs text-gray-900 dark:text-white uppercase tracking-wider">{activity.action}</p>
                      <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-2">{formatDateShort(activity.timestamp)}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No activity recorded yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
