// material
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React from 'react';
import SkinsCard from './SkinCard';
// ----------------------------------------------------------------------

export default function SkinsList({ products, ...other }) {

  const countPage = Math.floor(products.length / 20);
  const [currentPage , setCurrentPage] = React.useState(1);

 const  productsReady = [];
  products.forEach(element => {
    if(!element.displayName.includes("Standard")){
      productsReady.push(element);
    }
  });

  const changePage =(e)=>{
    console.log(parseInt(e.target.innerText, 10));
  }

  return (
    <Grid container spacing={3} {...other}>
      {productsReady.map((product , index) => (
        (index > 19 && index < 40)&&
        <Grid key={product.uuid} item xs={12} sm={6} md={3}>
          <SkinsCard product={product} />
        </Grid>
      ))}
      <Pagination count={countPage} shape="rounded" onClick={changePage} sx={{ mx: 'auto' , my: 3}} />
    </Grid>
  );
}
