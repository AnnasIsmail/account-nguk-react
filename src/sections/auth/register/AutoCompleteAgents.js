import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AutoCompleteAgents(props) {
  const skins = props.listAgents;
  const dataSkins = props.data;
  const dataSkinsReady = [];

  function getIndex(uuid){
    let indexReturn;
    skins.forEach((data , index)=>{
      if(data.uuid === uuid){
        indexReturn = index;
      }
    });
    return indexReturn;
  }

  dataSkins.map((data , index)=>{
    return dataSkinsReady.push(skins[getIndex(data.uuid)]);
  });

  const [value, setValue] = React.useState(dataSkinsReady);


  return (
    <Autocomplete
      multiple
      id="agents"
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
      }}
      options={skins}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="List Account Agents" placeholder="Killjoy" />
      )}
    />
  );
}


