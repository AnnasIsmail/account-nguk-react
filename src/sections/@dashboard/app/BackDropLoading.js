import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

BackdropLoading.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default function BackdropLoading({ open }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
