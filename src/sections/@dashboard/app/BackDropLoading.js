import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackdropLoading(props) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
