// material
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpdateCard from './UpdateCard';
// ----------------------------------------------------------------------

UpdateList.propTypes = {
  listUpdates: PropTypes.array.isRequired,
};

export default function UpdateList({ listUpdates }) {
  const [indexFrom, setIndexFrom] = React.useState(9);
  const [listUpdatesRender, setListUpdatesRender] = React.useState(listUpdates.slice(0, indexFrom));

  const fetchMoreData = () => {
    setIndexFrom(indexFrom + 10);
    setListUpdatesRender(listUpdates.slice(0, indexFrom + 10));
  };

  return (
    <InfiniteScroll
      dataLength={listUpdatesRender.length}
      next={fetchMoreData}
      hasMore
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Grid container spacing={3}>
        {listUpdatesRender.map((update, index) => (
          <Grid item width="100%" key={index}>
            <UpdateCard product={update} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
