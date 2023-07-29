import { Container, Stack, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardEsportSchedule from '../components/CardEsportSchedule';
import Page from '../components/Page';
import WaitLoadData from '../components/WaitLoadData';

const filterEsport = ['Unstarted', 'In Progress', 'Completed'];
const filterArray = ['unstarted', 'inProgress', 'completed'];
let indexSelect = -1;
let dataExportNoFilter = [];

export default function EsportSchedule() {
  const [dataEsport, setDataEsport] = useState([]);
  const [filterName, setFilterName] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.henrikdev.xyz/valorant/v1/esports/schedule').then((response) => {
      setDataEsport(response.data.data.filter((data) => data.match.teams.length > 1));
      dataExportNoFilter = response.data.data.filter((data) => data.match.teams.length > 1);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(filterName);
    if (filterName) {
      setDataEsport(dataExportNoFilter.filter((data) => data.state === filterArray[indexSelect]));
    } else {
      setDataEsport(dataExportNoFilter);
    }
  }, [filterName]);

  return (
    <Page title="Esport Schedule">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Typography variant="h4" gutterBottom component="div">
                  Esports Schedule
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={filterEsport}
                  onChange={(e) => {
                    setFilterName(e.target.outerText);
                    filterEsport.forEach((data, index) => {
                      if (data === e.target.outerText) {
                        indexSelect = index;
                      }
                    });
                  }}
                  sx={{ width: 200 }}
                  renderInput={(params) => <TextField {...params} label="Filter" />}
                />
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '15px' }}>
              {dataEsport.map((data, index) => (
                <CardEsportSchedule data={data} key={index} />
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </Page>
  );
}
