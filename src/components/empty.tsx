import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from "next/image";

export default function Empty(props:any) {
    const {title,subtitle} = props;
  return (
    <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ mt: 4 }}
        >
          <Typography
            component="h2"
            variant="h5"
            textAlign="center"
            sx={{ fontSize: 30, fontWeight: 600, mt: 4 }}
          >
            Your business currently has no products or <br />
            you may need to change your filter'
          </Typography>
          <Image src="/no_items.png" alt="No Iteams" width={60} height={60} />
          <Typography
            component="p"
            variant="body1"
            textAlign="center"
            sx={{ fontSize: 18, mt: 4 }}
          >
            Click Add Product to add products to your store
          </Typography>
        </Stack>
  )
}
