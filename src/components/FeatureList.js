import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { List, ListItem, ListItemText } from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#eaeaea",
  },
})

export default function FeatureList({ featuresList, selectedIds }) {
  const classes = useStyles()
  console.log("feature===", selectedIds)
  if (!featuresList) {
    return null
  }
  if (!selectedIds) {
    return null
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
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        {/* <TableHead>
          <TableCell></TableCell>
          {selectedIdsArray.map((col) => (
            <TableCell></TableCell>
          ))}
        </TableHead> */}
        <TableBody>
          {featuresList &&
            featuresList.map((feature) => (
              <TableRow>
                <TableCell>
                  <div className={classes.tableHeader}>{feature.title}</div>
                  <List aria-label='headers'>
                    {feature.features.map((name, idx) => (
                      <ListItem key={idx}>
                        <ListItemText>{name.featureName}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
                {productIds.map((id) => (
                  <TableCell>
                    <div className={classes.tableHeader}>{}</div>
                    <List aria-label='headers'>
                      {feature.features.map((name, idx) => (
                        <ListItem key={idx}>
                          <ListItemText>{name.values[id]}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
