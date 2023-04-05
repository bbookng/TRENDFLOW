export interface HeaderInterface {
  token: string;
}

export interface PostBookmarkReqInterface {
  header: {
    token: string;
  };
  params: {
    keyword: string;
  };
}
