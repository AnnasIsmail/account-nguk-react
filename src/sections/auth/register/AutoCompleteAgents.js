import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import * as React from 'react';

AutoCompleteAgents.propTypes = {
  listAgents: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  SetAgent: PropTypes.func.isRequired,
};

export default function AutoCompleteAgents(props) {
  const skins = props.listAgents;
  const dataSkins = props.data;
  const dataSkinsReady = [];
  const [value, setValue] = React.useState(dataSkinsReady);

  function getIndex(uuid) {
    let indexReturn;
    skins.forEach((data, index) => {
      if (data.uuid === uuid) {
        indexReturn = index;
      }
    });
    return indexReturn;
  }

  dataSkins.forEach((data) => {
    dataSkinsReady.push(skins[getIndex(data.uuid)]);
  });

  return (
    <Autocomplete
      multiple
      id="agents"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.SetAgent(newValue);
      }}
      filterSelectedOptions
      options={skins}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => <Chip key={index} label={option.name} {...getTagProps({ index })} />)
      }
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="List Account Agents" placeholder="Killjoy" />}
    />
  );
}
