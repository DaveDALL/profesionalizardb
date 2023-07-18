const fetchingCart = async () => {
    let cartFetchUrl = 'http://localhost:8080/api' + window.location.pathname
    console.log(cartFetchUrl)
    try {
        let response = await fetch(cartFetchUrl)
        let cartData = await response.json()
        return cartData
    }catch(err) {
        console.log('No es posible realizar un fetch del cart ' + err)
    }
}

const cartRenderCards = (products) => {
 let cartBox = document.getElementById('cartContainer')
 cartBox.innerHTML= ' '
 products.map( product => {
    let cartBlister = document.createElement('div')
    cartBlister.classList.add('cart-blister', 'col-8')
    let {productId, qty} = product
    cartBlister.innerHTML = `
        <div class="cart-product-box">
            <div class"cart-image-box col-2">
                <img src=${productId.thumbnails[0]} />
            </div>
            <div class="col-3">${productId.title}</div>
            <div class="col-2">${qty} piezas</div>
            <div class"col-2">$${(qty*productId.price).toFixed(2)}</div>
        </div>
    `
    cartBox.append(cartBlister)
 })
}

const cartRender = async () => {
    let cartData = await fetchingCart()
    let {payload} = cartData
    let {products} = payload
    cartRenderCards(products)
}

cartRender()

let returnButton = document.getElementById('returnButton')
returnButton.addEventListener('click', () => {
    window.close()
})