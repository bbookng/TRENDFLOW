export interface GetBookmarkReqInterface {
  token: string;
}

export interface PostBookmarkReqInterface {
  headers: {
    Authorization: string;
  };
  params: {
    keyword: string;
  };
}
