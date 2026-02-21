import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Member } from '../../backend';

interface ExportButtonProps {
  members: Member[];
}

export function ExportButton({ members }: ExportButtonProps) {
  const handleExport = () => {
    if (members.length === 0) {
      toast.error('No members to export');
      return;
    }

    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Phone', 'District/State', 'Message', 'Status', 'Registration Date'];
    const rows = members.map((member) => [
      member.id.toString(),
      member.name,
      member.email,
      member.phone,
      member.districtOrState,
      member.message.replace(/\n/g, ' '),
      member.status,
      new Date(Number(member.createdAt) / 1_000_000).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `members-export-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${members.length} members`);
  };

  return (
    <Button variant="outline" onClick={handleExport} className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
