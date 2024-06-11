export const domain = import.meta.env.VITE_BE;

export enum StatusType {
  Create = "create",
  Active = "active",
  InActive = "inActive",
  // create > active > inActive
}

export enum ApprovalStatus {
  Pending = "pending",
  Approve = "approve",
  Cancel = "cancel",
}

export enum Action {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum Grade {
  Employee = "employee",
  Manager = "manager",
  Director = "director",
  Admin = "admin",
  // admin > director > manager > employee
}

export enum MetricType {
  Like = "like",
  View = "view",
  Comment = "comment",
}

export interface Permission {
  id: number;
  minGrade: Grade; // minimum grade to get this permission
  action: Action;
  createAt: string; // timestamp
  updateAt: string; // timestamp
  isProtected: boolean;
  status: StatusType;
  // isProtected == true -> cannot be changed via UI by all Grade, except admin
}

export interface User {
  uid: string;
  departmentId: string; // reference to Department.id
  grade: Grade;
  username: string;
  birthday: number; // date
  email: string;
  avatar: string;
  description: string; // text
  permissionIdToCRUD: Grade[];
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
}

export interface Department {
  id: string;
  directorUid: string; // reference to User.uid
  name: string;
  permissionIdToCRUD: Grade[];
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface PostType {
  id: string;
  name: string;
  description: string; // text
  permissionIdToCRUDPost: Grade[];
  permissionIdToCRUD: Grade[];
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface Post {
  id: number;
  postTypeId: string;
  postType?: PostType; // reference to PostType.id
  creatorUid: string; // reference to User.uid
  user?: User;
  eventId?: number; // reference to Event.id, can be null
  mentionUid: string[]; // reference to User.uid
  title: string;
  content: string; // text
  images: string[];
  files: string[];
  likes: number;
  comments: number;
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
  // if eventId is valid
  // -> event.permissionIdToCRUDPost > postType.permissionIdToCRUDPost
}

export interface PostLike {
  id: number;
  userId: string; // reference to User.uid
  postId: number; // reference to Post.id
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface PostComment {
  id: number;
  userId: string;
  user?: User; // reference to User.uid
  postId: number; // reference to Post.id
  content?: string; // text | null
  images: string[];
  files: FileType[];
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
}

export interface FileType {
  url: string; // text
  name: string;
  type: string; // png | mp4 | pdf | ...
  size: number;
}

export interface ResourceType {
  id: string;
  name: string;
  description: string; // text
  permissionIdToCRUDResourceUsing: Grade[];
  permissionIdToCRUDResource: Grade[];
  permissionIdToCRUD: Grade[];
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface Resource {
  id: number;
  resourceTypeId: string; // reference to ResourceType.id
  resourceType?: ResourceType;
  images: string[];
  name: string;
  description: string; // text
  isFree: boolean; // sync with ResourceUsing
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface ResourceUsing {
  id: number;
  resourceId: number; // reference to Resource.id
  resource?: Resource;
  reporterUid: string; // reference to User.uid
  reporter?: User;
  borrowerUid: string; // reference to User.uid
  borrower?: User;
  startAt: number; // timestamp
  endAt: number; // timestamp
  approvalStatus: ApprovalStatus;
  decidedAt: number; // timestamp
  decisionDetail?: string; // text | null
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
}

export interface EventType {
  id: string;
  name: string;
  description: string; // text
  permissionIdToCRUDEvent: Grade[];
  permissionIdToCRUD: Grade[];
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface Event {
  id: number;
  eventTypeId: string; // reference to EventType.id
  eventType?: EventType;
  reporterUid: string; // reference to User.uid
  user?: User;
  resourceId: number; // reference to Resource.id
  resource?: Resource;
  postsId: number[]; // mới thêm
  participantsUid: string[]; // reference to User.uid
  permissionIdToCRUDPost: Grade[];
  name: string;
  description: string; // text
  startAt: number; // timestamp
  endAt: number; // timestamp
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
}

// export interface DocumentType {
//   id: number;
//   name: string;
//   description: string; // text
//   permissionIdToCRUDDocument: Grade[];
//   permissionIdToCRUD: Grade[];
//   createAt: string; // timestamp
//   updateAt: string; // timestamp
//   status: StatusType;
// }

// export interface Document {
//   id: number;
//   documentTypeId: number; // reference to DocumentType.id
//   creatorUid: string; // reference to User.uid
//   name: string;
//   file: FileType;
//   createAt: string; // timestamp
//   updateAt: string; // timestamp
//   status: StatusType;
// }

export interface RequestType {
  id: string;
  name: string;
  description: string; // text
  approvalDepartmentId: string; // reference to Department.id
  department?: Department;
  minApprovalGrade: Grade;
  permissionIdToCRUD: Grade[];
  createAt: string; // timestamp
  updateAt: string; // timestamp
  status: StatusType;
}

export interface Request {
  id: number;
  requesterUid: string; // reference to User.uid
  requester?: User;
  requestTypeId: string; // reference to RequestType.id
  requestType?: RequestType;
  reporterUid: string; // reference to User.uid
  reporter?: User;
  name: string;
  description: string; // text
  startAt: number; // timestamp
  endAt: number; // timestamp
  approvalStatus: ApprovalStatus;
  decidedAt: number; // timestamp
  decisionDetail?: string; // text | null
  createAt: number; // timestamp
  updateAt: number; // timestamp
  status: StatusType;
}
