import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify the data migration function in with-clause

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type MemberId = Nat;

  public type MemberStatus = {
    #active;
    #inactive;
    #pending;
  };

  public type Member = {
    id : MemberId;
    name : Text;
    phone : Text;
    email : Text;
    districtOrState : Text;
    message : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    status : MemberStatus;
  };

  public type RegistrationFields = {
    name : Text;
    phone : Text;
    email : Text;
    districtOrState : Text;
    message : Text;
  };

  public type Page = {
    members : [Member];
    offset : Nat;
    limit : Nat;
    totalCount : Nat;
  };

  var currentId = 0;
  let members = Map.empty<MemberId, Member>();

  public shared ({ caller }) func registerMember(fields : RegistrationFields) : async MemberId {
    validateInput(fields);
    let memberId = createMemberId();

    let newMember : Member = {
      id = memberId;
      name = fields.name;
      phone = fields.phone;
      email = fields.email;
      districtOrState = fields.districtOrState;
      message = fields.message;
      createdAt = Time.now();
      updatedAt = Time.now();
      status = #pending;
    };

    members.add(memberId, newMember);
    memberId;
  };

  public query ({ caller }) func getMembersPage(offset : Nat, limit : Nat) : async Page {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (offset >= members.size()) {
      return {
        members = [];
        offset;
        limit;
        totalCount = members.size();
      };
    };

    let entriesArray = members.entries().toArray();
    let paginatedArray = entriesArray.sliceToArray(offset, Nat.min(offset + limit, members.size()));
    let memberObjects : [Member] = paginatedArray.map(func((_, member)) { member });

    {
      members = memberObjects;
      offset;
      limit = Nat.min(limit, Nat.max(0, members.size() - offset));
      totalCount = members.size();
    };
  };

  public query ({ caller }) func getMemberCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    members.size();
  };

  func validateInput(fields : RegistrationFields) {
    if (fields.name.trim(#char(' ')).size() == 0) {
      Runtime.trap("First name is required");
    };
    if (fields.districtOrState.trim(#char(' ')).size() == 0) {
      Runtime.trap("District or state is required");
    };
    if (fields.phone.trim(#char(' ')).size() == 0) {
      Runtime.trap("Phone number is required");
    };
  };

  func createMemberId() : MemberId {
    let newId = currentId + 1;
    currentId := newId;
    newId;
  };

  // New Functions for Phase 2

  public query ({ caller }) func getMembersRegisteredToday() : async [Member] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    filterMembersByTime(getStartOfDay(Time.now()), Time.now());
  };

  public query ({ caller }) func getMembersRegisteredThisWeek() : async [Member] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    filterMembersByTime(getStartOfWeek(Time.now()), Time.now());
  };

  public query ({ caller }) func getMembersRegisteredThisMonth() : async [Member] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    filterMembersByTime(getStartOfMonth(Time.now()), Time.now());
  };

  func filterMembersByTime(fromTime : Time.Time, toTime : Time.Time) : [Member] {
    members.values().toArray().filter(
      func(member) {
        member.createdAt >= fromTime and member.createdAt <= toTime
      }
    );
  };

  func getStartOfDay(currentTime : Time.Time) : Time.Time {
    let secondsInDay : Int = 86400;
    let currentTimeInt = currentTime / 1_000_000_000;
    (currentTimeInt - (currentTimeInt % secondsInDay)) * 1_000_000_000;
  };

  func getStartOfWeek(currentTime : Time.Time) : Time.Time {
    let secondsInDay : Int = 86400;
    let secondsInWeek : Int = secondsInDay * 7;
    let currentTimeInt = currentTime / 1_000_000_000;
    (currentTimeInt - (currentTimeInt % secondsInWeek)) * 1_000_000_000;
  };

  func getStartOfMonth(currentTime : Time.Time) : Time.Time {
    // Approximate since we don't do DateTime conversion in this example
    let secondsInDay : Int = 86400;
    let secondsInMonth : Int = secondsInDay * 30;
    let currentTimeInt = currentTime / 1_000_000_000;
    (currentTimeInt - (currentTimeInt % secondsInMonth)) * 1_000_000_000;
  };

  public shared ({ caller }) func updateMember(memberId : MemberId, fields : RegistrationFields) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (members.get(memberId)) {
      case (?existingMember) {
        let updatedMember : Member = {
          id = memberId;
          name = fields.name;
          phone = fields.phone;
          email = fields.email;
          districtOrState = fields.districtOrState;
          message = fields.message;
          createdAt = existingMember.createdAt;
          updatedAt = Time.now();
          status = existingMember.status;
        };

        members.add(memberId, updatedMember);
      };
      case (null) {
        Runtime.trap("Member not found with id " # memberId.toText());
      };
    };
  };

  public shared ({ caller }) func deleteMember(memberId : MemberId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (members.get(memberId)) {
      case (?_) {
        members.remove(memberId);
      };
      case (null) {
        Runtime.trap("Member not found with id " # memberId.toText());
      };
    };
  };

  public shared ({ caller }) func updateMemberStatus(memberId : MemberId, status : MemberStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (members.get(memberId)) {
      case (?existingMember) {
        let updatedMember : Member = {
          id = memberId;
          name = existingMember.name;
          phone = existingMember.phone;
          email = existingMember.email;
          districtOrState = existingMember.districtOrState;
          message = existingMember.message;
          createdAt = existingMember.createdAt;
          updatedAt = Time.now();
          status;
        };

        members.add(memberId, updatedMember);
      };
      case (null) {
        Runtime.trap("No member found with id " # memberId.toText());
      };
    };
  };

  // Only for testing
  public query ({ caller }) func getAllMembers() : async [Member] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    members.values().toArray();
  };
};
