import React from "react";

// @mui
// components
import axios from 'axios';
// sections
import AppWidgetSummary from './AppWidgetSummary';


export default function GetDataAppWidget(props){

    const copy =(message, text)=>{
        props.copyProps(message);
        navigator.clipboard.writeText(text);
      }

    const [content , setContent] = React.useState('');
    const [dataMMR , setDataMMR] = React.useState([]);
    const [loading , setLoading] = React.useState(false);

    React.useEffect(()=>{
        axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/ap/${props.riotId}/${props.tagLine}`).then((response) =>{
            setDataMMR(response.data.data);
            setLoading(true);
          });
    },[]);

    return (
        <AppWidgetSummary loading={loading} dataMMR={dataMMR} idAccount={props.idAccount} dataSkin={props.dataSkin} dataAgent={props.dataAgent} copyProps={copy} username={props.username} password={props.password} RiotIdTagLine={props.RiotIdTagLine} owner={props.owner} icon={'simple-icons:valorant'} riotId={props.riotId} tagLine={props.tagLine} />
     );

}