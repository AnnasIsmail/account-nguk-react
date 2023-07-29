import { Card, Link, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

// utils

// ----------------------------------------------------------------------

UpdateCard.propTypes = {
  product: PropTypes.object,
};

export default function UpdateCard({ product }) {
  return (
    <Card sx={{ p:2, display: 'flex', width: '100%', gap: '20px', flexWrap: 'wrap' }}>
      <img src={product.banner_url} alt='banner' style={{ height: '150px', borderRadius: '16px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <div>
          <Link href={product.url} target='_blank' color="inherit" underline="hover">
              <Typography variant='h6'>{product.title}</Typography>
          </Link>
          <Typography variant='subtitle1'>{product.category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Typography>
          <Typography variant='subtitle2'>{moment(product.date).fromNow()}</Typography>
        </div>
        <div>
          <Link href={product.external_link} target='_blank' color="inherit" underline="hover">
            <Typography color='primary' variant='subtitle1'>{product.external_link?.split('.')[1].replace(/\b\w/g, char => char.toUpperCase())}</Typography>
          </Link>
        </div>
      </div>
    </Card>
  );
}
