import { Action, ApprovalStatus, Grade, StatusType } from "@/services/type";

type TypeItem = {
  color: string;
  items: { label: string; label_vn: string; value?: string }[];
};

export const PostType: TypeItem = {
  color: "#1DA1F2",
  items: [
    { label: "News", label_vn: "Tin tức" },
    { label: "Announce", label_vn: "Thông báo" },
    { label: "Sharing", label_vn: "Chia sẻ" },
    { label: "Event", label_vn: "Sự kiện" },
    { label: "Recruit", label_vn: "Tuyển dụng" },
    { label: "Survey", label_vn: "Khảo sát" },
    { label: "Khác", label_vn: "Khác" },
  ],
};

export const ResourceType: TypeItem = {
  color: "#7659FF",
  items: [
    { label: "Room", label_vn: "Phòng" },
    { label: "Device", label_vn: "Thiết bị" },
    { label: "Furniture", label_vn: "Đồ đạc" },
    { label: "Khác", label_vn: "Khác" },
  ],
};

export const EventType: TypeItem = {
  color: "#F77C00",
  items: [
    { label: "Sharing", label_vn: "Chia sẻ" },
    { label: "Playing", label_vn: "Đi chơi" },
    { label: "Meeting", label_vn: "Cuộc họp" },
    { label: "Internal", label_vn: "Nội bộ" },
    { label: "Release", label_vn: "Ra mắt" },
    { label: "Welcome", label_vn: "Chào mừng" },
    { label: "Khác", label_vn: "Khác" },
  ],
};

export const RequestType: TypeItem = {
  color: "#EF257E",
  items: [
    { label: "Off", label_vn: "Nghỉ" },
    { label: "Pregnant", label_vn: "Thai sản" },
    { label: "Allowance", label_vn: "Cấp phép" },
    { label: "Overtime", label_vn: "Tăng ca" },
    { label: "Payment", label_vn: "Hoàn tiền" },
    { label: "Exchange", label_vn: "Trao đổi" },
    { label: "Khác", label_vn: "Khác" },
  ],
};

export const DocumentType: TypeItem = {
  color: "#FBD400",
  items: [
    { label: "Traning", label_vn: "Huấn luyện" },
    { label: "GuideLine", label_vn: "Hướng dẫn" },
    { label: "Regulation", label_vn: "Nội quy" },
    { label: "Khác", label_vn: "Khác" },
  ],
};

export const Department: TypeItem = {
  color: "#3BB97C",
  items: [
    { label: "HR", label_vn: "Nhân sự" },
    { label: "Media", label_vn: "Truyền thông" },
    { label: "Finance", label_vn: "Tài chính" },
    { label: "Admin", label_vn: "Hành chính" },
  ],
};

export type Type =
  | "post"
  | "resource"
  | "event"
  | "request"
  | "document"
  | "department";

export function getColorFromType(type: Type): string {
  let res: TypeItem | undefined = undefined;
  switch (type) {
    case "post":
      res = PostType;
      break;
    case "resource":
      res = ResourceType;
      break;
    case "event":
      res = EventType;
      break;
    case "request":
      res = RequestType;
      break;
    case "document":
      res = DocumentType;
      break;
    case "department":
      res = Department;
      break;
    default:
      res = PostType;
      break;
  }

  return res.color;
}

export function getWording(value: StatusType | ApprovalStatus | Grade | "") {
  if (!value) {
    return "";
  }
  switch (value) {
    case StatusType.Create:
      return "Vừa tạo";
    case StatusType.Active:
      return "Hiển thị";
    case StatusType.InActive:
      return "Ẩn";
    case ApprovalStatus.Pending:
      return "Chờ xử lý";
    case ApprovalStatus.Approve:
      return "Duyệt";
    case ApprovalStatus.Cancel:
      return "Đã huỷ";
    case Grade.Employee:
      return "Nhân viên";
    case Grade.Manager:
      return "Quản lý";
    case Grade.Director:
      return "Giám đốc";
    case Grade.Admin:
      return "Admin";
    default:
      return "";
  }
}

export function getWordingAction(value: Action) {
  switch (value) {
    case Action.Create:
      return "Tạo";
    case Action.Read:
      return "Đọc";
    case Action.Update:
      return "Sửa";
    case Action.Delete:
      return "Xóa";
    default:
      return "";
  }
}

export function getVNLabel(type: Type, value: string): string {
  console.log(type, value);

  switch (type) {
    case "post":
      return (
        PostType.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    case "resource":
      return (
        ResourceType.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    case "event":
      return (
        EventType.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    case "request":
      return (
        RequestType.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    case "document":
      return (
        DocumentType.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    case "department":
      return (
        Department.items.find(
          (item) => item.label?.toLowerCase() === value.toLowerCase()
        )?.label_vn ?? ""
      );
    default:
      return "";
  }
}
