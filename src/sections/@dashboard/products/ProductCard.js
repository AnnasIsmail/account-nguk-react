import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import DetailAgent from '../app/DetailAgent';
import DetailRole from '../app/DetailRole';
// utils

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { uuid , displayName , fullPortrait ,role } = product;

  const [openDetailRole, setOpenDetailRole] = React.useState(false);
  const [detailRole,setDetailRole] = React.useState([]);
  const handleCloseDetailRole = () => setOpenDetailRole(false);

  const [openDetailAgent, setOpenDetailAgent] = React.useState(false);
  const [detailAgent,setDetailAgent] = React.useState([]);
  const handleCloseDetailAgent = () => setOpenDetailAgent(false);

  const openDetailSkin =(uuid , name)=> {
    if(name === 'agent'){
      axios.get(`https://account-nguk-api.vercel.app/agents/${uuid}`).then((response) =>{
          setDetailAgent(response.data.data);
          setOpenDetailAgent(true);
      });
    }else{
      axios.get(`https://account-nguk-api.vercel.app/agents/${uuid}`).then((response) =>{
          setDetailRole(response.data.data.role);
          setOpenDetailRole(true);
      });
    }
  }

  return (
    <Card >
      <Box sx={{ pt: '100%', position: 'relative' }} >
        <ProductImgStyle alt='name' src={fullPortrait} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} >
        <Link to="#" color="inherit" underline="hover" onClick={()=>openDetailSkin(uuid , 'agent')} component={RouterLink}>
        <Typography variant="h5" noWrap sx={{ mb: -2.5 }}>
            {displayName}
          </Typography>
        </Link>
        <Link to="#" color="inherit" underline="hover" onClick={()=>openDetailSkin(uuid , 'role')} component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {role.displayName}
          </Typography>
        </Link>

      </Stack>

      <DetailAgent open={openDetailAgent} handleClose={handleCloseDetailAgent} detailSkin={detailAgent} />
      <DetailRole open={openDetailRole} handleClose={handleCloseDetailRole} detailSkin={detailRole} />
    </Card>
  );
}
