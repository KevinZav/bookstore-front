import type { Product, ProductFilters } from "../../../domain";
import { ProductDatasourceMarket, ProductRepositoryImpl } from "../../../infraestructure";
import type { store } from "../store";
import { create, createError, getAll, getAllError } from "./product-slice";

export type ProductDispatch = typeof store.dispatch;

export class ProductThunk {
  private static readonly repository = new ProductRepositoryImpl(new ProductDatasourceMarket());


  public static startCreate(payload: Product) {
    return async (dispatch: ProductDispatch) => {
      try {
        const product = await this.repository.create(payload);

        dispatch(create(product));
      } catch(e) {
        dispatch(createError());
      }
    }
  }

  public static startGetOwn() {
    return async (dispatch: ProductDispatch) => {
      try {
        const products = await this.repository.getOwnProducts();

        dispatch(getAll(products));
      } catch(e) {
        dispatch(getAllError());
      }
    }
  }

  public static startGetAll() {
    return async (dispatch: ProductDispatch) => {
      try {
        const products = await this.repository.getAll();

        dispatch(getAll(products));
      } catch(e) {
        dispatch(getAllError());
      }
    }
  }

  public static startGetByEmail(email: string) {
    return async (dispatch: ProductDispatch) => {
      try {
        const products = await this.repository.getByUser(email);

        dispatch(getAll(products));
      } catch(e) {
        dispatch(getAllError());
      }
    }
  }

  public static startGetFiltered(filters: ProductFilters) {
    return async (dispatch: ProductDispatch) => {
      try {

        const products = await this.repository.getFiltered(filters);

        dispatch(getAll(products));
      } catch(e) {
        dispatch(getAllError());
      }
    }
  }
}