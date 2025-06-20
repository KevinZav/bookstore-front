import type { Product, StatusType } from "../../../domain"

export interface ProductsSliceProps {
  all: {
    status: StatusType,
    data: Product[]
  },
  one: {
    status: StatusType
  }
}