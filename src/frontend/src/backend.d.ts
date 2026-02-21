import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Page {
    members: Array<Member>;
    totalCount: bigint;
    offset: bigint;
    limit: bigint;
}
export interface RegistrationFields {
    name: string;
    districtOrState: string;
    email: string;
    message: string;
    phone: string;
}
export type MemberId = bigint;
export interface Member {
    id: MemberId;
    status: MemberStatus;
    name: string;
    createdAt: Time;
    districtOrState: string;
    email: string;
    updatedAt: Time;
    message: string;
    phone: string;
}
export enum MemberStatus {
    active = "active",
    pending = "pending",
    inactive = "inactive"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMember(memberId: MemberId): Promise<void>;
    getAllMembers(): Promise<Array<Member>>;
    getCallerUserRole(): Promise<UserRole>;
    getMemberCount(): Promise<bigint>;
    getMembersPage(offset: bigint, limit: bigint): Promise<Page>;
    getMembersRegisteredThisMonth(): Promise<Array<Member>>;
    getMembersRegisteredThisWeek(): Promise<Array<Member>>;
    getMembersRegisteredToday(): Promise<Array<Member>>;
    isCallerAdmin(): Promise<boolean>;
    registerMember(fields: RegistrationFields): Promise<MemberId>;
    updateMember(memberId: MemberId, fields: RegistrationFields): Promise<void>;
    updateMemberStatus(memberId: MemberId, status: MemberStatus): Promise<void>;
}
