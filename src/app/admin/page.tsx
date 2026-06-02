'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Key, 
  User, 
  Mail, 
  Calendar, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ChevronRight,
  MessageSquare,
  Lock,
  Loader2,
  RefreshCw,
  MapPin,
  FileDown,
  File as FileIcon
} from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  preferredName: string;
  pronouns: string;
  age: number;
  nationality: string;
  email: string;
  phone: string;
  cityState: string;
  country: string;
  linkedinUrl: string;
  portfolioUrl: string;
  currentOrg: string;
  yearsExperience: string;
  primaryDiscipline: string;
  howHeard: string;
  currentPractice: string;
  cvPortfolioUrl: string;
  notableProjects: string;
  naturalMaterialExp: string;
  naturalMaterialDesc: string;
  fieldWorkExp: string;
  makingChangedMind: string;
  whyApplying: string;
  whatExcites: string;
  uniqueLearning: string;
  bambooFuture: string;
  whatToBuild: string;
  canRelocate: string;
  remoteComfort: string;
  physicalComfort: string;
  teamExperience: string;
  anticipatedChallenges: string;
  supportSystems: string;
  ongroundCollab: string;
  thinkingExample: string;
  creativeUploadUrl: string;
  badlyDesigned: string;
  bamboo2050: string;
  goodDesignDef: string;
  ref1Name: string;
  ref1Relationship: string;
  ref1Email: string;
  ref1Phone: string;
  ref1Context: string;
  ref2Name: string;
  ref2Relationship: string;
  ref2Email: string;
  ref2Phone: string;
  status: string;
  adminNotes: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data states
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail view states
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [adminNotesText, setAdminNotesText] = useState('');
  const [detailStatus, setDetailStatus] = useState('');

  // Local authentication check on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('bamboo_admin_key');
    if (savedKey) {
      setPassword(savedKey);
      verifyAndFetch(savedKey);
    }
  }, []);

  const verifyAndFetch = async (key: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`/api/admin/applications`, {
        headers: { 'x-admin-key': key }
      });

      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications);
        setIsAuthenticated(true);
        localStorage.setItem('bamboo_admin_key', key);
      } else {
        setAuthError('Invalid admin secret key.');
        setIsAuthenticated(false);
        localStorage.removeItem('bamboo_admin_key');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setAuthError('Please enter a key.');
      return;
    }
    verifyAndFetch(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('bamboo_admin_key');
    setPassword('');
    setIsAuthenticated(false);
    setApplications([]);
    setSelectedApp(null);
  };

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/admin/applications?status=${statusFilter}&search=${searchTerm}`, {
        headers: { 'x-admin-key': password }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [password, statusFilter, searchTerm]);

  // Refetch when search/filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, statusFilter, searchTerm, fetchApplications]);

  // Handle Detail selection
  const openDetail = (app: Application) => {
    setSelectedApp(app);
    setAdminNotesText(app.adminNotes || '');
    setDetailStatus(app.status);
  };

  // Update Status & Notes API call
  const handleUpdateApplication = async () => {
    if (!selectedApp) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': password
        },
        body: JSON.stringify({
          status: detailStatus,
          adminNotes: adminNotesText
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Update local list
        setApplications(prev => prev.map(a => a.id === selectedApp.id ? data.application : a));
        setSelectedApp(data.application);
        alert('Application updated successfully.');
      } else {
        alert('Failed to update application.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating application.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Export to CSV client-side handler
  const handleExportCSV = () => {
    if (applications.length === 0) return;

    // Define CSV headers
    const headers = [
      'Submission ID', 'Full Name', 'Preferred Name', 'Pronouns', 'Age', 'Nationality',
      'Email', 'Phone', 'City & State', 'Country', 'LinkedIn', 'Portfolio', 'Discipline',
      'Experience', 'Stipend Relocation', 'Status', 'Submission Date'
    ];

    // Map applications to rows
    const rows = applications.map(app => [
      app.id,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${app.preferredName?.replace(/"/g, '""') || ''}"`,
      app.pronouns || '',
      app.age,
      app.nationality,
      app.email,
      app.phone,
      `"${app.cityState.replace(/"/g, '""')}"`,
      app.country,
      app.linkedinUrl || '',
      app.portfolioUrl || '',
      app.primaryDiscipline,
      app.yearsExperience,
      app.canRelocate,
      app.status,
      new Date(app.createdAt).toLocaleDateString()
    ]);

    // Build CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    // Create download link element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bamboo_next_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Status Badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800"><CheckCircle className="w-3.5 h-3.5" /> Shortlisted</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800"><XCircle className="w-3.5 h-3.5" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  // Render Password Gate / Authentication Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-off-white flex flex-col justify-center items-center px-4 font-dmsans">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-grey-border shadow-lg text-center animate-fade-up">
          <div className="w-16 w-16 h-16 bg-sage-pale text-green-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-sage-light/35">
            <Lock className="w-6 h-6" />
          </div>
          
          <h1 className="font-fraunces font-bold text-2xl md:text-3xl text-charcoal">
            Admin *Gatehouse*
          </h1>
          <p className="font-dmsans text-xs text-grey-dark mt-2 mb-8 uppercase tracking-widest">
            Bamboo NEXT selection board only
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label className="form-label">Secret Entry Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10" 
                  placeholder="Enter access key (default: bamboo2026)" 
                />
                <Key className="w-4 h-4 text-grey-mid absolute left-3.5 top-4" />
              </div>
              {authError && <p className="text-xs text-red-500 font-semibold mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-primary hover:bg-green-mid disabled:bg-green-light/70 text-off-white font-semibold py-4 rounded-xl transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2 border border-green-light shadow"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Access...
                </>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>

          <p className="text-[10px] text-grey-mid mt-8 tracking-widest uppercase">
            © 2026 Bamboo NEXT Design Residency
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col font-dmsans">
      
      {/* Mini top admin banner */}
      <header className="bg-charcoal text-off-white h-16 flex items-center justify-between px-6 md:px-12 border-b border-green-light">
        <div className="flex items-center gap-4">
          <span className="font-fraunces font-black text-xl text-beige-light">Bamboo NEXT Admin</span>
          <span className="hidden sm:inline-block text-[9px] font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded text-off-white uppercase">
            Cohort Cycle 2026–2027
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchApplications}
            disabled={refreshing}
            className="p-2 text-grey-mid hover:text-off-white bg-white/5 hover:bg-white/10 rounded transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold uppercase tracking-wider text-beige-light hover:text-off-white transition-colors py-2 px-3 bg-white/5 rounded"
          >
            Lock Dashboard
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard space */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main List & Filters (Spans 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header metrics panel */}
          <div className="grid grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-grey-border shadow-sm text-left">
            <div>
              <span className="text-[10px] font-bold text-grey-mid uppercase tracking-wider block">Total Received</span>
              <span className="font-fraunces font-bold text-2xl md:text-3xl text-charcoal mt-1 block">{applications.length}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-grey-mid uppercase tracking-wider block">Pending</span>
              <span className="font-fraunces font-bold text-2xl md:text-3xl text-amber-600 mt-1 block">
                {applications.filter(a => a.status === 'pending').length}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-grey-mid uppercase tracking-wider block">Shortlisted</span>
              <span className="font-fraunces font-bold text-2xl md:text-3xl text-emerald-700 mt-1 block">
                {applications.filter(a => a.status === 'shortlisted').length}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-grey-mid uppercase tracking-wider block">Rejected</span>
              <span className="font-fraunces font-bold text-2xl md:text-3xl text-rose-700 mt-1 block">
                {applications.filter(a => a.status === 'rejected').length}
              </span>
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="bg-white p-4 rounded-2xl border border-grey-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 py-2.5 text-sm" 
                placeholder="Search name, email, discipline..." 
              />
              <Search className="w-4 h-4 text-grey-mid absolute left-3.5 top-3.5" />
            </div>

            {/* Filter Tabs & CSV */}
            <div className="flex w-full md:w-auto items-center gap-3 justify-end">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input py-2 text-xs md:text-sm font-semibold text-charcoal max-w-[150px]"
              >
                <option value="all">Filter Status: All</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="bg-green-primary hover:bg-green-mid text-off-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors tracking-wide uppercase inline-flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-grey-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-cream/40 text-[10px] font-bold text-grey-dark uppercase tracking-wider border-b border-grey-border">
                    <th className="py-4 px-6">Applicant</th>
                    <th className="py-4 px-4">Discipline</th>
                    <th className="py-4 px-4">Exp</th>
                    <th className="py-4 px-4">Submitted</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey-border text-xs md:text-sm">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-grey-mid font-medium italic">
                        No matching applications found.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr 
                        key={app.id} 
                        onClick={() => openDetail(app)}
                        className={`hover:bg-cream/20 cursor-pointer transition-colors ${
                          selectedApp?.id === app.id ? 'bg-cream/35' : ''
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="font-semibold text-charcoal">{app.fullName}</div>
                          <div className="text-[10px] text-grey-dark mt-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-grey-mid" /> {app.email}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium text-grey-dark">
                          {app.primaryDiscipline}
                        </td>
                        <td className="py-4 px-4 text-grey-dark">
                          {app.yearsExperience?.split(' ')?.[0] || '0-1'}
                        </td>
                        <td className="py-4 px-4 text-grey-mid">
                          {new Date(app.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="py-4 px-4">
                          {renderStatusBadge(app.status)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-1.5 rounded hover:bg-grey-border/40 text-green-primary transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Selection Review Panel (Spans 4 cols) */}
        <div className="lg:col-span-4">
          {selectedApp ? (
            <div className="bg-white rounded-2xl border border-grey-border shadow-sm overflow-hidden text-left flex flex-col max-h-[820px] sticky top-24 animate-fade-up">
              
              {/* Detail Header */}
              <div className="bg-cream/50 p-6 border-b border-grey-border">
                <span className="text-[9px] font-bold text-grey-mid tracking-widest uppercase">
                  APPLICANT PROFILE FILE
                </span>
                <h3 className="font-fraunces font-bold text-xl md:text-2xl text-charcoal mt-1 leading-snug">
                  {selectedApp.fullName}
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[10px] font-semibold bg-sage-pale text-green-primary px-2.5 py-0.5 rounded">
                    Age {selectedApp.age}
                  </span>
                  <span className="text-[10px] font-semibold bg-sage-pale text-green-primary px-2.5 py-0.5 rounded">
                    {selectedApp.primaryDiscipline}
                  </span>
                  <span className="text-[10px] font-semibold bg-sage-pale text-green-primary px-2.5 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedApp.cityState}
                  </span>
                </div>
              </div>

              {/* Scrollable details stack */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6 text-xs md:text-sm">
                
                {/* 1. Basic Details */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">1. Basic Contacts</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between"><span className="text-grey-dark">Preferred Name:</span> <span className="font-semibold text-charcoal">{selectedApp.preferredName || 'N/A'}</span></li>
                    <li className="flex justify-between"><span className="text-grey-dark">Pronouns:</span> <span className="font-semibold text-charcoal">{selectedApp.pronouns || 'N/A'}</span></li>
                    <li className="flex justify-between"><span className="text-grey-dark">Phone:</span> <span className="font-semibold text-charcoal">{selectedApp.phone}</span></li>
                    <li className="flex justify-between"><span className="text-grey-dark">LinkedIn:</span> <a href={selectedApp.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link ↗</a></li>
                    <li className="flex justify-between"><span className="text-grey-dark">Portfolio URL:</span> <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link ↗</a></li>
                  </ul>
                </div>

                {/* 2. Experience & CV */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">2. Experience & Practice</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase">CV / Portfolio PDF:</span>
                      {selectedApp.cvPortfolioUrl ? (
                        <a 
                          href={selectedApp.cvPortfolioUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="mt-1.5 flex items-center gap-2 p-2.5 rounded bg-sage-pale/40 border border-sage-light text-green-primary font-semibold hover:bg-sage-pale/60 transition-colors"
                        >
                          <FileText className="w-4 h-4" /> Open Candidate CV (PDF) ↗
                        </a>
                      ) : (
                        <span className="block italic text-red-500">No CV file uploaded.</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Current Practice Context:</span>
                      <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.currentPractice}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Notable Projects:</span>
                      <p className="mt-1 text-charcoal leading-relaxed whitespace-pre-line bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.notableProjects}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Essay Answers (Why residency) */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">3. Statement of Intent</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Why Bamboo NEXT Residency?</span>
                      <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.whyApplying}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">What to build?</span>
                      <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.whatToBuild}</p>
                    </div>
                  </div>
                </div>

                {/* 4. Field Readiness */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">4. Field Work Readiness</h4>
                  <ul className="space-y-2 mb-3">
                    <li className="flex justify-between"><span className="text-grey-dark">Can Relocate 6 Months?</span> <span className="font-semibold text-charcoal">{selectedApp.canRelocate}</span></li>
                    <li className="flex justify-between"><span className="text-grey-dark">Remote Comfort:</span> <span className="font-semibold text-charcoal">{selectedApp.remoteComfort}</span></li>
                    <li className="flex justify-between"><span className="text-grey-dark">Physical Making:</span> <span className="font-semibold text-charcoal">{selectedApp.physicalComfort}</span></li>
                  </ul>
                  <div>
                    <span className="text-[10px] font-bold text-grey-dark uppercase block">Anticipated Challenges:</span>
                    <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.anticipatedChallenges}</p>
                  </div>
                </div>

                {/* 5. Creative Thinking */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">5. Creative Thinking</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Creative Upload Detail:</span>
                      {selectedApp.creativeUploadUrl ? (
                        <a 
                          href={selectedApp.creativeUploadUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="mt-1.5 flex items-center gap-2 p-2.5 rounded bg-sage-pale/40 border border-sage-light text-green-primary font-semibold hover:bg-sage-pale/60 transition-colors"
                        >
                          <FileIcon className="w-4 h-4" /> Open Creative Media Asset ↗
                        </a>
                      ) : (
                        <span className="block text-[11px] text-grey-mid italic mt-1">No creative files uploaded.</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Badly Designed Object:</span>
                      <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.badlyDesigned}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-grey-dark uppercase block">Bamboo in 2050 scenario:</span>
                      <p className="mt-1 text-charcoal leading-relaxed bg-cream/20 p-2.5 rounded border border-grey-border">{selectedApp.bamboo2050}</p>
                    </div>
                  </div>
                </div>

                {/* 6. References */}
                <div>
                  <h4 className="font-bold text-green-primary text-[10px] tracking-wider uppercase border-b border-grey-border pb-1.5 mb-3">6. References</h4>
                  <div className="space-y-2">
                    <div className="bg-cream/10 p-2.5 rounded border border-grey-border">
                      <div className="font-bold text-charcoal">{selectedApp.ref1Name} ({selectedApp.ref1Relationship})</div>
                      <div className="text-[10px] text-grey-dark mt-1">Email: {selectedApp.ref1Email} | Phone: {selectedApp.ref1Phone || 'N/A'}</div>
                      <div className="text-[10px] text-grey-mid mt-1 italic">Context: {selectedApp.ref1Context}</div>
                    </div>
                    {selectedApp.ref2Name && (
                      <div className="bg-cream/10 p-2.5 rounded border border-grey-border">
                        <div className="font-bold text-charcoal">{selectedApp.ref2Name} ({selectedApp.ref2Relationship})</div>
                        <div className="text-[10px] text-grey-dark mt-1">Email: {selectedApp.ref2Email} | Phone: {selectedApp.ref2Phone || 'N/A'}</div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action and Notes Drawer (Sticks to bottom of detail) */}
              <div className="bg-cream/65 p-6 border-t border-grey-border space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-grey-dark uppercase block mb-1">
                    Selection Board Review Status
                  </label>
                  <select 
                    value={detailStatus}
                    onChange={(e) => setDetailStatus(e.target.value)}
                    className="form-input py-2 text-xs md:text-sm font-semibold bg-white"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="shortlisted">Shortlist for Interview</option>
                    <option value="rejected">Mark as Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-grey-dark uppercase block mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Board Review Notes
                  </label>
                  <textarea 
                    value={adminNotesText}
                    onChange={(e) => setAdminNotesText(e.target.value)}
                    rows={3} 
                    className="form-input text-xs bg-white" 
                    placeholder="Write candidate review details, scoring, or selection panel remarks..."
                  />
                </div>

                <button
                  onClick={handleUpdateApplication}
                  disabled={updatingStatus}
                  className="w-full bg-green-primary hover:bg-green-mid disabled:bg-green-light/75 text-off-white font-semibold py-2.5 rounded-lg transition-colors uppercase tracking-wider text-xs flex items-center justify-center gap-2 border border-green-light shadow-sm"
                >
                  {updatingStatus ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Review...
                    </>
                  ) : (
                    'Save Review Decision'
                  )}
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-cream/20 rounded-2xl border-2 border-dashed border-grey-border p-12 text-center text-grey-mid h-[360px] flex flex-col justify-center items-center">
              <span className="text-4xl mb-4" role="img" aria-label="sheet file">🗂️</span>
              <h4 className="font-fraunces font-bold text-lg text-charcoal">No Applicant Selected</h4>
              <p className="text-xs text-grey-dark max-w-[200px] mt-2">
                Click on any applicant record in the table list to load their full 7-section details file.
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
