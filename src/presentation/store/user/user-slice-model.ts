import type { StatusType, User } from "../../../domain"

export interface UsersSliceProps {
  logged: {
    status: StatusType,
    data?: User
  },
  all: {
    status: StatusType,
    data: User[]
  }
}