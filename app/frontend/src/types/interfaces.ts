export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string,
  contactPhone?: string;
}

export interface LibraryData {
  id: string;
  name: string;
  address: string;
  description: string;
  images: string[],
}

export interface BookData {
  id: string,
  library: string;
  title: string;
  author: string;
  year: number;
  description: string;
  images: string[];
  isAvailable: boolean;
  totalCopies: number;
  availableCopies: number;
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
  // userId: string | null;
  libraryId: string;
  bookId: string;
  dateStart: string;
  dateEnd: string;
}

export interface SearchRentalsDto {
  userId: string;
}

export interface RentalData {
  id: string;
  userId: { id: string, email: string };
  libraryId: string;
  bookId: string;
  dateStart: string,
  dateEnd: string,
  libraryName: string,
  bookName: string
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
  id: string;
  userId: string;
  messages: MessageData;
  isActive: boolean;
  createdAt: Date;
  user: UserData;
}

export interface SupportChatDto {
  list?: SupportChatData [];     //если не использовать any
}

export interface MessageData {
  id: string;
  authorId: string;
  text: string;
  sentAt: Date;
  readAt: Date;
}

export interface SocketDto {
  id: string;
  text: string;
  sentAt: string;
  author: {
    id: string;
    name: string;
  };
}