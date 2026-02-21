import { Badge } from '@/components/ui/badge';
import type { MemberStatus } from '../../backend';

interface StatusBadgeProps {
  status: MemberStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<MemberStatus, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
    active: { variant: 'default', label: 'Active' },
    pending: { variant: 'secondary', label: 'Pending' },
    inactive: { variant: 'outline', label: 'Inactive' },
  };

  const config = variants[status];

  return (
    <Badge variant={config.variant} className={status === 'active' ? 'bg-green-600 hover:bg-green-700' : ''}>
      {config.label}
    </Badge>
  );
}
