/** Note: To show a specific store, we extract the storeId parameter from the route using the 'useParams' hook from 'react-router-dom'. Params is awesome, it can give you
 * multiple segments
 */

//TODO: Add AppBar and footer components for this page to look nice.

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";

//access token for mapbox geocoding

const MY_ACCESS_TOKEN = "pk.eyJ1IjoibWh0aHJvdzA5MDkwOSIsImEiOiJjbDlrYnN6bDcxdTVvM3dtbjRqMWJmc3NxIn0.8ZG33j9q4A_4waXCr6NPEg"



const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 90
  },
  {
    field: "description",
    headerName: "Description",
    width: 200
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110
  },
  {
    field: "SKU",
    headerName: "SKU",
    type: "number",
    width: 200
  },
  {
    field: "maxQuantity",
    headerName: "Available Quantity",
    type: "number",
    width: 200
  },
  {
    field: "aisle",
    headerName: "Aisle",
    width: 110
  },
  {
    field: "shelf",
    headerName: "Shelf",
    width: 110
  },
  {
    field: "purchaseQty",
    headerName: "Purchase Quantity",
    renderCell: (rowValues) => {
      return (
        <form>
          <input type="text" id={`qty_${rowValues.row.SKU}`} name="qty" size="4"
            min="0" max={rowValues.row.maxQuantity}
          >
          </input>
        </form>
      )
    },
    width: 160
  },
  {
    field: "Purchase",
    renderCell: (rowValues) => {
      return (
        <Button variant="contained"> Purchase </Button>
      )
    },
    width: 160
  },
]

function* generateRowId() {
  let id = 0;
  while (true) {
    yield id++;
  }
}



// TODO: To implement a view of a specific store from the customer's point of view (i.e. page 12 )

export default function CustomerStoreView() {
  //TODO: reform and resent the storeJson in a tabular form
  let [storeItems, setStoreItems] = useState([]);
  const params = useParams();
  const rowIdGenerator = generateRowId();
  const [storeAddress, setStoreAddress] = useState(null);


  // TODO: when we have the real backend with database; this filter should be done in the back-end.
  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then(res => res.json())
      .then(data => {
        let newStoreItems = data.filter(elem => {
          return elem.store === params.storeId
        });
        //transform the rows into a Datagrid-friendly format
        newStoreItems = newStoreItems.map((item) => {
          item = item.itemInfo;
          item['shelf'] = item.location.shelf;
          item['aisle'] = item.location.aisle;
          delete item['location'];
          return item;
        })
        setStoreItems(newStoreItems);
      })


  }, [params.storeId])


  useEffect(() => {
    let address;

    fetch("http://localhost:8080/stores")
      .then(res => res.json())
      .then(data => {
        let store = data.filter(elem => {
          return elem.storeId === params.storeId;
        })

        address = store[0].address;
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.longitude},${address.latitude}.json?access_token=${MY_ACCESS_TOKEN}`)
          .then(res => res.json())
          .then(data => {

            //get district information.
            setStoreAddress(data.features[3].place_name);
          })
      })
  }, [params.storeId])

  const handlePurchaseClick = (rowValues) => {
    if (rowValues.field === "Purchase") {
      console.log("purchased");
      // console.log(params)
      const shelf = rowValues.row.shelf;
      const aisle = rowValues.row.aisle;

      const inputValue = document.getElementById(`qty_${rowValues.row.SKU}`).value
      const maxQty = rowValues.row.maxQuantity
      const itemPurchased = rowValues.row.SKU

      if (inputValue <= maxQty) {
        alert(`purchased ${inputValue} - ${itemPurchased} at shelf ${shelf} and aisle ${aisle}`)

        fetch(`http://localhost:8080/items?store=${params.storeId}`)
          .then(res => {
            return res.json();
          })
          .then((data) => console.log(`Need to update the actual data ${data}`))

      } else {
        alert(`You can't buy more than ${maxQty}`);
      }
      //reset the Purchase quantity field after clicking on "Purchase"
      document.getElementById(`qty_${rowValues.row.SKU}`).value = null;
    }
  }


  //filter based on storeid so we must get the storeid passed down from the landing page
  return (
    <div>
      <CustomAppBar />
      {/* TODO: To create a professionally formatted NOT FOUND PAGE */}
      {storeItems.length === 0 ? <p>Sorry! The Store Runs Out Of Stock</p> :
        <div>
          {/* View store #3 for example */}
          <Typography variant="h4" align="center">View All Shelves in Store {params.storeId}</Typography>

          <Typography variant="body2" align="center" sx={{ fontStyle: 'italic' }}>{storeAddress}</Typography>

          {/* TODO: To show data in tbular format instead of a JSON, need quality selection + buy functionality*/}
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={() => rowIdGenerator.next().value}
              rows={storeItems}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: GridToolbar,
              }}
              onCellClick={handlePurchaseClick}
            />
          </Box>
        </div>
      }
      <Footer />
    </div>
  )
}
