import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { RegistrationFields, MemberId, Member, MemberStatus } from '../backend';

export function useRegisterMember() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useMutation<MemberId, Error, RegistrationFields>({
    mutationFn: async (fields: RegistrationFields) => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      return await actor.registerMember(fields);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberCount'] });
      queryClient.invalidateQueries({ queryKey: ['membersPage'] });
      queryClient.invalidateQueries({ queryKey: ['membersToday'] });
      queryClient.invalidateQueries({ queryKey: ['membersWeek'] });
      queryClient.invalidateQueries({ queryKey: ['membersMonth'] });
    },
  });
}

export function useMemberCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['memberCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return await actor.getMemberCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMembersPage(offset: bigint, limit: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['membersPage', offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getMembersPage(offset, limit);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMemberCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['memberCount'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getMemberCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMembersRegisteredToday() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['membersToday'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getMembersRegisteredToday();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMembersRegisteredThisWeek() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['membersWeek'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getMembersRegisteredThisWeek();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMembersRegisteredThisMonth() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['membersMonth'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getMembersRegisteredThisMonth();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, fields }: { memberId: MemberId; fields: RegistrationFields }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.updateMember(memberId, fields);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membersPage'] });
      queryClient.invalidateQueries({ queryKey: ['membersToday'] });
      queryClient.invalidateQueries({ queryKey: ['membersWeek'] });
      queryClient.invalidateQueries({ queryKey: ['membersMonth'] });
    },
  });
}

export function useDeleteMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: MemberId) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.deleteMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberCount'] });
      queryClient.invalidateQueries({ queryKey: ['membersPage'] });
      queryClient.invalidateQueries({ queryKey: ['membersToday'] });
      queryClient.invalidateQueries({ queryKey: ['membersWeek'] });
      queryClient.invalidateQueries({ queryKey: ['membersMonth'] });
    },
  });
}

export function useUpdateMemberStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, status }: { memberId: MemberId; status: MemberStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.updateMemberStatus(memberId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membersPage'] });
      queryClient.invalidateQueries({ queryKey: ['membersToday'] });
      queryClient.invalidateQueries({ queryKey: ['membersWeek'] });
      queryClient.invalidateQueries({ queryKey: ['membersMonth'] });
    },
  });
}
