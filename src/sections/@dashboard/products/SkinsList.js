// material
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React from 'react';
import SkinsCard from './SkinCard';
// ----------------------------------------------------------------------

export default function SkinsList({ products, ...other }) {

 const  productsReady = [];
  products.forEach(element => {
    if(!element.displayName.includes("Standard")){
      productsReady.push(element);
    }
  });

  const countPage = Math.ceil(productsReady.length / 20);
  const [currentPage , setCurrentPage] = React.useState(1);
  const [indexFrom , setIndexFrom] = React.useState(-1);
  const [indexTo , setIndexTo] = React.useState(20);

  const changePage =(e , value)=>{
    const page = value;
    const indexMax = page * 20;
    setCurrentPage(page);
    setIndexTo(indexMax);
    setIndexFrom(indexMax - 21);
  }

  return (
    <>
      <Grid container spacing={3} {...other}>
        {productsReady.map((product , index) => (
          (index > indexFrom && index < indexTo)&&
          <Grid key={product.uuid} item xs={12} sm={6} md={3}>
            <SkinsCard product={product} />
          </Grid>
        ))}
      </Grid>
      <div className='flex-center' >
      {(countPage > 0)?
        <Pagination count={countPage} shape="rounded" onChange={changePage} sx={{ mx: 'auto' , my: 5}} />
      :  
        <></>
      }
      </div>
    </>
  );
}
