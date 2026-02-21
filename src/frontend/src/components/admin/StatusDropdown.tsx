import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useUpdateMemberStatus } from '../../hooks/useQueries';
import { MemberStatus } from '../../backend';
import type { MemberId } from '../../backend';

interface StatusDropdownProps {
  memberId: MemberId;
  currentStatus: MemberStatus;
}

export function StatusDropdown({ memberId, currentStatus }: StatusDropdownProps) {
  const updateStatus = useUpdateMemberStatus();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus.mutateAsync({
        memberId,
        status: newStatus as MemberStatus,
      });
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={updateStatus.isPending}>
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}
