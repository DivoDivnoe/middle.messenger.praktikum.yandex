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
  avatar: string;
};

export type PasswordUpdateType = {
  oldPassword: string;
  newPassword: string;
};

export type LastMessageType = {
  user: UserMainData;
  time: string;
  content: string;
};

export type ChatMainDataType = {
  id: number;
  title: string;
  avatar: string;
};

export type ChatType = ChatMainDataType & {
  unread_count: number;
  last_message: LastMessageType | null;
};

export enum MessageType {
  MESSAGE = 'message',
  FILE = 'file',
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
  chat_id: number;
  time: string;
  type: MessageType;
  content: string;
  file: FileType;
};

export type ChatToken = {
  token: string;
};
