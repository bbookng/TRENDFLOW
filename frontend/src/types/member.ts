export interface HeaderInterface {
  Authorization: string;
}

export interface PostBookmarkReqInterface {
  headers: {
    Authorization: string;
  };
  params: {
    keyword: string;
  };
}
