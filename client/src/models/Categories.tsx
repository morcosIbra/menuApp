export interface Category {
  id: string;
  name: string;
  description: string;
  items: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type User =
  | {
      name: 'Admin';
      role: 'admin';
    }
  | {
      name: 'User';
      role: 'user';
    };
