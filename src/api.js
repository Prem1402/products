export function getProducts() {
  return fetch("https://www.mocky.io/v2/5e9ebdaa2d00007800cb7697")
    .then((res) => res.json())
    .then((data) => {
      if (!data.products) {
        throw new Error(data.message)
      }

      return data.products
    })
}
