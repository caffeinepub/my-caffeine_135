import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Calendar, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useGetMemberCount,
  useGetMembersRegisteredToday,
  useGetMembersRegisteredThisWeek,
  useGetMembersRegisteredThisMonth,
} from '../../hooks/useQueries';

export function StatisticsCards() {
  const { data: totalCount, isLoading: loadingTotal } = useGetMemberCount();
  const { data: todayMembers, isLoading: loadingToday } = useGetMembersRegisteredToday();
  const { data: weekMembers, isLoading: loadingWeek } = useGetMembersRegisteredThisWeek();
  const { data: monthMembers, isLoading: loadingMonth } = useGetMembersRegisteredThisMonth();

  const stats = [
    {
      title: 'Total Members',
      value: totalCount ? Number(totalCount).toLocaleString() : '0',
      icon: Users,
      loading: loadingTotal,
    },
    {
      title: 'Registered Today',
      value: todayMembers ? todayMembers.length.toLocaleString() : '0',
      icon: UserPlus,
      loading: loadingToday,
    },
    {
      title: 'This Week',
      value: weekMembers ? weekMembers.length.toLocaleString() : '0',
      icon: Calendar,
      loading: loadingWeek,
    },
    {
      title: 'This Month',
      value: monthMembers ? monthMembers.length.toLocaleString() : '0',
      icon: TrendingUp,
      loading: loadingMonth,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
