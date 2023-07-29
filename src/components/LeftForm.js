import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useResponsive from '../hooks/useResponsive';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

LeftForm.propTypes = {
  text: PropTypes.string,
};

export default function LeftForm({ text }) {
  const mdUp = useResponsive('up', 'md');
  const [nameSkins, setNameSkins] = useState();
  const [srcImage, setSrcImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) => {
      const random = Math.floor(Math.random() * response.data.data.length);
      if (response.data.data[random].displayIcon !== null) {
        setSrcImage(response.data.data[random].displayIcon);
      } else {
        setSrcImage(response.data.data[random].chromas[0].displayIcon);
      }
      setNameSkins(response.data.data[random].displayName);
      setLoading(true);
    });
  }, []);

  return (
    mdUp && (
      <SectionStyle>
        <Typography variant="h4" sx={{ p: 3 }}>
          {text}
        </Typography>
        {loading ? (
          <>
            <img alt="Random Skins" src={srcImage} sx={{ p: 3 }} />
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }} gutterBottom>
              {nameSkins}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </SectionStyle>
    )
  );
}
