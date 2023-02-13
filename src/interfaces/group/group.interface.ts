export interface GetGroup {
  group_id: string;
  user_id: string;
}

export interface EditGroup {
  group_id: string;
  user_id: string;
}

export interface PostGroup {
  title: string;
  group_id: string;
  user_id: string;
}

export interface DeleteGroup {
  group_id: string;
  user_id: string;
}
