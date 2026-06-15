export interface Role {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;

  branchId?: string | null;

  createdAt: string;
  updatedAt: string;
  branch?: Branch | null;

  role: Role;
}
