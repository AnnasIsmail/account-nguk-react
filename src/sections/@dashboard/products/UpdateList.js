// material
import { Grid } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateCard from './UpdateCard';
// ----------------------------------------------------------------------

export default function UpdateList({ products, ...other }) {

  const [indexFrom , setIndexFrom] = React.useState(9);
  const [productsRender , setProductsRender] = React.useState(products.slice(0, indexFrom));

  const fetchMoreData = () => {
    setIndexFrom(indexFrom+10);
    setProductsRender(products.slice(0, indexFrom+10));
  };

  return (
    <InfiniteScroll
    dataLength={productsRender.length}
    next={fetchMoreData}
    hasMore
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  >
      <Grid container spacing={3} {...other}>
        {productsRender.map((product , index) => 
          // eslint-disable-next-line react/jsx-key
          <Grid item width='100%'>
            <UpdateCard key={index} product={product} />
          </Grid>
        )}
      </Grid>
    </InfiniteScroll>
  );
}
