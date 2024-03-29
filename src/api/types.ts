export type SigninData = {
  login: string;
  password: string;
};

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserMainData = {
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
};

export type User = UserMainData & {
  id: number;
  avatar: string | null;
};

export type PasswordUpdateType = {
  oldPassword: string;
  newPassword: string;
};

export type LastMessageUserType = {
  first_name: string;
  second_name: string;
  avatar: string | null;
  email: string;
  login: string;
  phone: string;
};

export type LastMessageType = {
  user: LastMessageUserType;
  time: string;
  content: string;
};

export type ChatMainDataType = {
  id: number;
  title: string;
  avatar: string | null;
};

export type ChatType = ChatMainDataType & {
  unread_count: number;
  last_message: LastMessageType | null;
};

export enum MessageType {
  MESSAGE = 'message',
  FILE = 'file',
  STICKER = 'sticker',
}

export type FileType = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type ChatMessage = {
  id: number;
  user_id: number;
  chat_id?: number;
  time: string;
  type: MessageType;
  content: string;
  file?: FileType;
};

export type ChatToken = {
  token: string;
};

export type ApiErrorType = {
  reason: string;
};
