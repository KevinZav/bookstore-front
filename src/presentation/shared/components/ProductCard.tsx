import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "../../../domain";
import productImage from '../../../assets/image-product.png';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{  borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={productImage}
        alt={product.name}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" color="text.secondary">
            SKU: {product.sku}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
