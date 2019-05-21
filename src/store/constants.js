export const ___SERVER_ENDPOINT___ = "http://192.168.178.121:8000/";
//export const ___SERVER_ENDPOINT___ = "http://17029.l.time4vps.cloud/";
export const ___BASE_ENDPOINT___ = ___SERVER_ENDPOINT___ + "gnuma/v1/";

export const ___WS_ENDPOINT___ = "ws://192.168.178.121:8000/" + "ws/chat/";
export const ___WS_TEST_ENDPOINT = "ws://192.168.178.104:1234";

export const ___AD_SEARCH_ENDPOINT___ = ___BASE_ENDPOINT___ + "ads/search/";

export const ___BOOK_HINTS_ENDPOINT___ =
  ___BASE_ENDPOINT___ + "search/hints/book/";
export const ___OFFICE_HINTS_ENDPOINT___ =
  ___BASE_ENDPOINT___ + "search/hints/office/";

export const ___LOGIN_ENDPOINT___ = ___BASE_ENDPOINT___ + "auth/login/";
export const ___LOGOUT_ENDPOINT___ = ___BASE_ENDPOINT___ + "auth/logout/";
export const ___SIGNUP_ENDPOINT___ = ___BASE_ENDPOINT___ + "auth/registration/";
export const ___WHOAMI_ENDPOINT___ = ___BASE_ENDPOINT___ + "whoami/";
export const ___INITUSER_ENDPOINT___ = ___BASE_ENDPOINT___ + "init/";

export const ___CREATE_AD___ = ___BASE_ENDPOINT___ + "ads/";
export const ___BASE_UPLOAD_PICTURE___ = ___BASE_ENDPOINT___ + "ads/upload/";
export const ___GET_AD___ = ___BASE_ENDPOINT___ + "ads/";

export const ___CREATE_COMMENT___ = ___BASE_ENDPOINT___ + "comments/";

export const ___RETRIEVE_CHATS___ = ___BASE_ENDPOINT___ + "chat/operations/";
export const ___SEND_MESSAGE___ = ___BASE_ENDPOINT___ + "chat/operations/";
export const ___READ_CHAT___ =
  ___BASE_ENDPOINT___ + "chat/operations/readMessages/";
export const ___CONTACT_USER___ = ___BASE_ENDPOINT___ + "chat/";

export const ___CREATE_OFFERT___ =
  ___BASE_ENDPOINT___ + "chat/operations/createOffert/";
export const ___ACCEPT_OFFERT___ =
  ___BASE_ENDPOINT___ + "chat/operations/acceptOffert/";
export const ___REJECT_OFFERT___ =
  ___BASE_ENDPOINT___ + "chat/operations/rejectOffert/";
