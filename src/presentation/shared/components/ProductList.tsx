import { Grid } from "@mui/material"
import type { Product } from "../../../domain"
import { ProductCard } from "./ProductCard"

interface Props {
  products: Product[]
}
export const ProductList = ({products}: Props) => {

  return (
    <Grid spacing={2} container>
      {
        products.map((item) => (

          <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }} key={item.sku}>
            <ProductCard product={item}></ProductCard>
          </Grid>
        ))
      }
    </Grid>
  )
}
