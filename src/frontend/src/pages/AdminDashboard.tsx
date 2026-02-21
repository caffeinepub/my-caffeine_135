import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PasswordAuth } from '../components/admin/PasswordAuth';
import { StatisticsCards } from '../components/admin/StatisticsCards';
import { MemberSearch } from '../components/admin/MemberSearch';
import { StatusFilter } from '../components/admin/StatusFilter';
import { ExportButton } from '../components/admin/ExportButton';
import { MemberTable } from '../components/admin/MemberTable';
import { PaginationControls } from '../components/admin/PaginationControls';
import { BulkNotificationDialog } from '../components/admin/BulkNotificationDialog';
import { useGetMembersPage } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import type { Member, MemberStatus } from '../backend';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { actor, isFetching: actorFetching } = useActor();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<MemberStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedMembers, setSelectedMembers] = useState<Set<bigint>>(new Set());
  const [isBulkNotificationOpen, setIsBulkNotificationOpen] = useState(false);

  const offset = BigInt((currentPage - 1) * pageSize);
  const limit = BigInt(pageSize);

  const { data: pageData, isLoading } = useGetMembersPage(offset, limit);

  if (!isAuthenticated) {
    return <PasswordAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // Show loading state while actor is initializing
  if (actorFetching && !actor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Filter members based on search and status
  const filteredMembers = pageData?.members.filter((member: Member) => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.districtOrState.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  }) || [];

  const totalPages = Math.ceil((pageData?.totalCount ? Number(pageData.totalCount) : 0) / pageSize);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(new Set(filteredMembers.map(m => m.id)));
    } else {
      setSelectedMembers(new Set());
    }
  };

  const handleSelectMember = (memberId: bigint, checked: boolean) => {
    const newSelected = new Set(selectedMembers);
    if (checked) {
      newSelected.add(memberId);
    } else {
      newSelected.delete(memberId);
    }
    setSelectedMembers(newSelected);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/' })}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage member registrations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <StatisticsCards />

        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
              <MemberSearch value={searchTerm} onChange={setSearchTerm} />
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setIsBulkNotificationOpen(true)}
                disabled={selectedMembers.size === 0}
                className="flex-1 sm:flex-none"
              >
                Bulk Notify ({selectedMembers.size})
              </Button>
              <ExportButton members={filteredMembers} />
            </div>
          </div>

          <MemberTable
            members={filteredMembers}
            isLoading={isLoading}
            selectedMembers={selectedMembers}
            onSelectAll={handleSelectAll}
            onSelectMember={handleSelectMember}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </main>

      <BulkNotificationDialog
        open={isBulkNotificationOpen}
        onOpenChange={setIsBulkNotificationOpen}
        selectedCount={selectedMembers.size}
      />
    </div>
  );
}
