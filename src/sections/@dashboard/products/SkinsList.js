// material
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import React from 'react';
import SkinsCard from './SkinCard';
// ----------------------------------------------------------------------

SkinsList.propTypes = {
  listSkins: PropTypes.array.isRequired,
};

export default function SkinsList({ listSkins }) {
  const skinsReady = [];
  listSkins.forEach((element) => {
    if (!element.displayName.includes('Standard') && !element.displayName.includes('Random')) {
      skinsReady.push(element);
    }
  });
  const countPage = Math.ceil(skinsReady.length / 20);
  const [indexFrom, setIndexFrom] = React.useState(-1);
  const [indexTo, setIndexTo] = React.useState(20);
  const changePage = (e, value) => {
    const page = value;
    const indexMax = page * 20;
    setIndexTo(indexMax);
    setIndexFrom(indexMax - 21);
  };

  return (
    <>
      <Grid container spacing={3}>
        {skinsReady.map(
          (skin, index) =>
            index > indexFrom &&
            index < indexTo && (
              <Grid key={skin.uuid} item xs={12} sm={6} md={3}>
                <SkinsCard skin={skin} />
              </Grid>
            )
        )}
      </Grid>
      <div className="flex-center">
        {countPage > 0 && (
          <Pagination count={countPage} shape="rounded" onChange={changePage} sx={{ mx: 'auto', my: 5 }} />
        )}
      </div>
    </>
  );
}
