import React from "react"
import {
  Card,
  CardContent,
  makeStyles,
  CardMedia,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core"
import { DeleteSharp } from "@material-ui/icons"
import { numberWithCommas, trimString } from "../utils"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 150,
  },
  price: {
    paddingRight: 10,
    textDecoration: "line-through",
    color: "grey",
  },
  finalPrice: {
    paddingRight: 10,
  },
  totalDiscount: {
    color: "green",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  bottomSelect: {
    position: "absolute",
    left: 10,
    top: 250,
  },
  delete: {
    position: "relative",
    right: -50,
    top: -200,
    // paddingRight: 20,
  },
}))

export default function CompareSummary({
  compareSummary,
  selectedIds,
  allIDs,
  addProduct,
  removeProduct,
}) {
  const classes = useStyles()
  if (!compareSummary) {
    return null
  }
  if (!selectedIds) {
    return null
  }

  const handleChange = (event) => {
    addProduct(event.target.value)
  }

  let selectedIdsArray = []
  if (!Array.isArray(selectedIds)) {
    selectedIdsArray = [selectedIds]
  } else {
    selectedIdsArray = selectedIds
  }

  let idSet = new Set(selectedIdsArray)
  let productIds = Array.from(idSet)

  return (
    <>
      <Grid container={true} direction='row' alignItems='center' spacing={2}>
        {productIds &&
          productIds.map((id) => (
            <Grid item='true'>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={compareSummary.images[id]}
                />
                <CardContent>
                  <Grid container={true} direction={"column"}>
                    <Grid item={true}>
                      <Typography variant='h6'>
                        {`${trimString(compareSummary.titles[id].title)}`}
                      </Typography>
                    </Grid>
                    <Grid
                      container={true}
                      direction={"row"}
                      alignItems='center'
                    >
                      <Grid item={true} className={classes.finalPrice}>
                        <Typography variant='h6'>
                          {`₹${numberWithCommas(
                            Math.round(
                              compareSummary.productPricingSummary[id]
                                .finalPrice
                            )
                          )}`}
                        </Typography>
                      </Grid>
                      <Grid item={true} className={classes.price}>
                        <Typography variant='subtitle1'>
                          {`₹${numberWithCommas(
                            Math.round(
                              compareSummary.productPricingSummary[id].price
                            )
                          )}`}
                        </Typography>
                      </Grid>
                      <Grid item={true}>
                        <Typography className={classes.totalDiscount}>
                          {`${compareSummary.productPricingSummary[id].totalDiscount}% off`}
                        </Typography>
                      </Grid>
                      {productIds && productIds.length > 1 && (
                        <Grid item>
                          <IconButton
                            className={classes.delete}
                            onClick={() => removeProduct(id)}
                          >
                            <DeleteSharp />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <div className={classes.bottomSelect}>
        <div>
          <Typography>Add a product</Typography>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>
              Choose a product
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              // value={age}
              onChange={handleChange}
            >
              {allIDs &&
                allIDs.map((p) => (
                  <MenuItem value={p}>
                    {`${trimString(compareSummary.titles[p].title)}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}
