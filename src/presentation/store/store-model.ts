import type { LibrarySliceProps } from "./library";
import type { UsersSliceProps } from "./user/user-slice-model";

export interface StoreModel {
  users: UsersSliceProps,
  library: LibrarySliceProps
}