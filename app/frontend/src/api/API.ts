import fetchData from './fetchData';
import { RegData, SearchLibrariesDto, SearchBooksDto, SearchUsersDto, AddRentalDto,SearchRentalsDto, 
  CreateSupportChatDto, GetChatListParams, SendMessageDto, MarkMessagesAsReadDto,} from '../types/interfaces';
export default function API() {
  
  const usersAPI = {
    search(searchParams: Partial<SearchUsersDto>) {
      const result = fetchData('users', { method: 'GET', params: searchParams });
      return result;
    },
    register(data: RegData) {
      const result = fetchData('users/register', { method: 'POST', data });
      return result;
    },
  };

  const authUserAPI = {
    login(email: string, password: string) {
      const result = fetchData('auth/login', { method: 'POST', data: { email, password } });
      return result;
    },
    getInfo(email: string) {
      const result = fetchData('auth/checkauth', { method: 'GET', params: { email } });
      return result;
    },
  }

  const librariesAPI = {
    search(searchParams: SearchLibrariesDto) {
      const result = fetchData('libraries', { method: 'GET', params: searchParams });
      return result;
    },
    findById(id: string) {
      const result = fetchData(`libraries/findlibrary/${id}`, { method: 'GET' });
      return result;
    },
    addLibrary(data: FormData) {    
      const result = fetchData('libraries', { method: 'POST', data }, true);
      return result;
    },
    updateLibrary(data: FormData, id: string) {
      const result = fetchData(`libraries/${id}`, { method: 'PUT', data }, true);
      return result;
    },
  };

  const booksAPI = {
    search(searchParams: SearchBooksDto) {
      const result = fetchData('books', { method: 'GET', params: searchParams });
      return result;
    },
    addBook(data: FormData) {    
      const result = fetchData('books', { method: 'POST', data }, true);
      return result;
    },
    updateBook(data: FormData, id: string) {
      const result = fetchData(`books/${id}`, { method: 'PUT', data }, true);
      return result;
    },
  };

  const rentalsAPI = {
    search(searchParams: SearchRentalsDto) {
      const result = fetchData('rentals', { method: 'GET', params: searchParams });
      return result;
    },
    addRental(data: AddRentalDto) {
      const result = fetchData('rentals', { method: 'POST', data });
      return result;
    },
    removeRental(rentalId: string, userId: string | null) {
      const result = fetchData(`rentals/${rentalId}`, { method: 'DELETE', data: { userId } });
      return result;
    },
  }

  const supportchatAPI = {
    createRequest(data: CreateSupportChatDto) {
      const result = fetchData('support', { method: 'POST', data });
      return result;
    },
    findRequests(searchParams: GetChatListParams) {
      const result = fetchData('support', { method: 'GET', params: searchParams });
      return result;
    },
    sendMessage(data: SendMessageDto) {
      const result = fetchData('support/sendmessage', { method: 'POST', data });
      return result;
    },
    getMessages(chatId: string, userId: string) {
      const result = fetchData(`support/getmessages/${chatId}`, { method: 'GET', params: { userId } });
      return result;
    },
    readMessages(data: MarkMessagesAsReadDto) {
      const result = fetchData('support/readmessages', { method: 'POST', data });
      return result;
    },
    closeRequest(chatId: string) {
      const result = fetchData(`support/closerequest/${chatId}`, { method: 'POST' });
      return result;
    },
  }

  return {
    usersAPI, authUserAPI, librariesAPI, booksAPI, rentalsAPI, supportchatAPI
  };
}
