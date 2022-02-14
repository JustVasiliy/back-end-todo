export type userInfo = {
  nickname: string;
  id: string | undefined;
};
export type bodyNewUser = {
  name: string;
  surname: string;
  nickname: string;
  password: string;
  id?: string;
};
export type bodyAuth = {
  nickname: string;
  password: string;
};

export type bodyCreate = {
  name: string;
  checked: boolean;
  deleted: string;
  id?: string | number;
  createdBy?: string;
  token: string;
};
export interface TaskSchema {
  name: string;
  checked: boolean;
  deleted: boolean;
  id: number | string;
  createdBy: string;
}
export interface UserSchema {
  name: string;
  surname: string;
  nickname: string;
  password: string;
  id: string;
}

export type bodyPut = {
  name: string;
  checked: boolean;
  deleted: boolean;
  id: string;
};
