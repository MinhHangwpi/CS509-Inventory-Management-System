import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StoreIcon from "@mui/icons-material/Store";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate } from 'react-router-dom';

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function InteractiveList({ storeLists }) {
  // to pass down the storeId information to the CustomerStoreView component


  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
          Stores Near You
        </Typography>
        <Demo>

          <List>
            {storeLists.map((store) => (
              <ListItem
                key={store.storeId}
                secondaryAction={

                  <Link
                    to={{
                      pathname: `/all_stores/${store.storeId}`,
                      state: store
                      }
                    }
                    // {`/all_stores/${store.storeId}`}
                    style={{ textDecoration: "none" }}>
                    <Button variant="contained">View Store &gt;</Button>
                  </Link>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <StoreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${store.name}`}
                  // TODO: secondary prop will show the distance away from customer, currently use placeholder until we find an efficient way to convert geolocation data on the front end
                  secondary={`${(Math.random() * 20).toFixed(2)} miles away`}
                />
              </ListItem>
            ))}
          </List>

        </Demo>
      </Grid>
    </Box>
  );
}

