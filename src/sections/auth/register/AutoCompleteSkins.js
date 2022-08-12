import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AutocompleteSkins(props) {
    const skins = props.listSkins;
    const dataSkins = props.data;
    const dataSkinsReady = [];

    function getIndex(uuid){
      skins.forEach((data , index)=>{
        if(data.uuid === uuid){
          console.log(index);
          
          return index;
        }
      });
    }

    dataSkins.map((data , index)=>{
      return dataSkinsReady.push(skins[getIndex[data.uuid]]);
      // return dataSkinsReady.push(skins[index]);
    });

    const [value, setValue] = React.useState(dataSkinsReady);


  return (
    <Autocomplete
      multiple
      id="skins"
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
        <TextField {...params} label="List Account Skins" placeholder="Reaver Operator" />
      )}
    />
  );
}


