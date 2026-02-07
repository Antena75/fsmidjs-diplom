export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string,
  contactPhone?: string;
}

export interface LibraryData {
  _id: string;
  name: string;
  address: string;
  description: string;
  images: string[],
}

export interface BookData {
  _id: string,
  library: string;
  title: string;
  author: string;
  year: string;
  description: string;
  images: string[];
  isAvailable: boolean;
  totalCopies: string;
  availableCopies: string;
}

export interface RegData {
  email: string;
  name: string;
  password: string;
  contactPhone?: string;
  role?: string;
}

export interface SearchLibrariesDto {
  limit?: number;
  offset?: number;
  name?: string;
}

export interface SearchBooksDto {
  library: string;
  limit?: number;
  offset?: number;
  title?: string;
  author?: string;
  isAvailable?: boolean;
}

export interface SearchUsersDto {
  limit?: number;
  offset?: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface AddRentalDto {
  userId: string | null;
  libraryId: string;
  bookId: string;
  dateStart: string;
  dateEnd: string;
}

export interface SearchRentalsDto {
  userId: string;
}

export interface RentalData {
  _id: string;
  userId: { _id: string, email: string };
  libraryId: { _id: string, name: string };
  bookId: { _id: string, title: string };
  dateStart: string,
  dateEnd: string,
}

export interface CreateSupportChatDto {
  userId: string | null;
  text: string;
}

export interface GetChatListParams {
  userId: string | null;
  isActive: boolean;
}

export interface SendMessageDto {
  authorId: string;
  chatId: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  userId: string;
  chatId: string;
  createdBefore: Date;
}

export interface SupportChatData {
  _id: string;
  userId: UserData;
  messages: MessageData;
  isActive: boolean;
  createdAt: Date;
}

export interface SupportChatDto {
  list?: SupportChatData [];     //если не использовать any
}

export interface MessageData {
  _id: string;
  authorId: string;
  text: string;
  sentAt: Date;
  readAt: Date;
}

export interface SocketDto {
  _id: string;
  text: string;
  sentAt: string;
  author: {
    id: string;
    name: string;
  };
}