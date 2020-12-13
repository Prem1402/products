import { Container, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import NavBar from "./NavBar"
import Loading from "./Loading"
import { getProducts } from "../api"
import CompareSummary from "./CompareSummary"
import FeatureList from "./FeatureList"

const usestyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    padding: 20,
  },
}))

function productReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      products: action.products,
      allIDs: Object.keys(action.products.compareSummary.images),
      error: null,
    }
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error.message,
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function Products() {
  const classes = usestyles()
  const [selectedIDs, setSelectedIDs] = React.useState([])
  const [state, dispatch] = React.useReducer(productReducer, {
    products: {},
    allIDs: [],
    error: null,
  })

  React.useEffect(() => {
    getProducts()
      .then((products) => dispatch({ type: "success", products }))
      .catch((error) => dispatch({ type: "error", error }))

    setSelectedIDs(["TVSF2WYXTKAR7RAF"])
  }, [])

  const isLoading = () => !state && state.error === null

  const addProduct = (id) => {
    setSelectedIDs((prevState) => [...prevState, id])
  }
  const removeProduct = (id) => {
    setSelectedIDs((prevState) => {
      const updatedArr = prevState.filter((item) => item !== id)
      return updatedArr
    })
  }

  return (
    <React.Fragment>
      {isLoading() && <Loading text='Loading products...' />}
      {state.error && (
        <Typography variant='subtitle1'>{state.error}</Typography>
      )}
      <NavBar />
      <Container maxWidth='xl' className={classes.container}>
        <Grid container={true} direction='column' spacing={4}>
          {state && state.products && (
            <>
              <Grid item={true}>
                <Grid container={true} direction='row' spacing={4}>
                  <Grid item={true} xs={2}>
                    <Typography variant='h4'>Compare</Typography>
                  </Grid>
                  <Grid item={true} xs={10} style={{ maxHeight: 360 }}>
                    <CompareSummary
                      compareSummary={state.products.compareSummary}
                      selectedIds={selectedIDs}
                      allIDs={state.allIDs}
                      addProduct={addProduct}
                      removeProduct={removeProduct}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item={true}>
                <FeatureList
                  featuresList={state.products.featuresList}
                  selectedIds={selectedIDs}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
