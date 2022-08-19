import { useState } from 'react';
// material
import { Button, ClickAwayListener, IconButton, Input, InputAdornment, Slide, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [search , setSearch] = useState('');

  const handleOpen = () => {
    setOpen((prev) => !prev);
    document.getElementById('getSearch').value = search;
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('searchCall').value = document.getElementById('getSearch').value;
    setSearch(document.getElementById('getSearch').value);
    document.getElementById('searchCall').click();
  };

  
    // document.addEventListener('keydown', (event) => {
    //   const name = event.key;
    //   const code = event.code;
    //   if (event.ctrlKey) {
    //     if(name === 'q'){
    //       handleOpen();
    //     }
    //   }
    // }, false);


  return (
    <form onSubmit={handleSubmit}>
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
            <Typography variant="subtitle2">
                {/* Ctrl + Q */}
            </Typography>
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder="Search…"
                id='getSearch'
                defaultValue={search}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Search
              </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
    </form>
  );
}
