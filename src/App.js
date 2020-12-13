import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"

import Loading from "./components/Loading"

const Products = React.lazy(() => import("./components/Products"))

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path='/' component={Products} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </React.Suspense>
  )
}

export default App
