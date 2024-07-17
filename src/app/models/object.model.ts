import { Category } from "./category.model";
import { User } from "./user.model";

export interface Object {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  user_id?: number;
  category_id: number;
  deleted_At?: Date;
  category?: Category;
  user?: User;
}
