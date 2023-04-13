import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { TextField, Typography } from "@mui/material";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};
interface SearchBoxProps {
  selectPosition: any;
  setSelectPosition: (position: any) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ selectPosition, setSelectPosition }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <TextField
            size="small"
            sx={{ width: "270px", margin: 1, backgroundColor: "transparent" }}
            InputProps={{
              style: {
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'rgb(244, 239, 249)',
                // backgroundColor: 'white',
                borderWidth: '2px'
                // specify the desired radius
              }
            }}
            placeholder="Search Any Location"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              const params: any = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions: any = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders" className="list">
          {listPlace.map((item: any) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item);
                    console.log(item)
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 30, height: 30 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="caption">{item?.display_name}</Typography>} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
export default SearchBox;