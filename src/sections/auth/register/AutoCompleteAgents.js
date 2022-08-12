import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AutoCompleteAgents(props) {
    const skins = props.listAgents;
    const [value, setValue] = React.useState(props.data);


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


