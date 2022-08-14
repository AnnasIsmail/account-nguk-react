import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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

SkinsCard.propTypes = {
  product: PropTypes.object,
};

export default function SkinsCard({ product }) {
  const { uuid , displayName , displayIcon , chromas } = product;

  return (
    <Card sx={{ pt:3 }}>
      <Box sx={{ pt: '25%', position: 'relative' }} >
        <ProductImgStyle alt={displayName} src={(displayIcon !== null)?displayIcon:chromas[0].displayIcon} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} >
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
        <Typography variant="subtitle1" noWrap sx={{ mb: -2.5 }}>
            {displayName}
          </Typography>
        </Link>

      </Stack>

    </Card>
  );
}
