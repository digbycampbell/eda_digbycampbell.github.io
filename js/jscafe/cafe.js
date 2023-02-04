// -- JAVASCRIPT CAFE! -- //

// --     PRODUCTS     -- //

let products = [
   { shelfName: 'White Coffee', stock: 2, price: 3, order: 0, wholesalecost: 1 },
   { shelfName: 'Black Coffee', stock: 2, price: 2, order: 0, wholesalecost: 1 },
   { shelfName: 'Eggs', stock: 10, price: 10, order: 0, wholesalecost: 1 },
   { shelfName: 'Muffins', stock: 5, price: 5, order: 0, wholesalecost: 1 },
]

let menuSize = products.length

function displayProducts() {
   document.getElementById('menu').innerHTML = ''
   document.getElementById('order').innerHTML = ''
   for (let i = 0; i < menuSize; i++) {
      const para = document.createElement('p')
      para.setAttribute('id', 'item' + i)
      let productName = products[i].shelfName
      let productStock = products[i].stock

      const butt = document.createElement('button')
      butt.classList.add('restock-button')
      butt.setAttribute('id', 'restockButt' + i)

      if (productStock == 0) {
         para.classList.add('emptyStock')
      }

      para.textContent = productName + ': ' + productStock
      butt.textContent = 'Restock ' + productName

      const container = document.getElementById('menu')
      container.appendChild(para)
      container.appendChild(butt)

      if (products[i].order > 0) {
         const para = document.createElement('p')
         para.setAttribute('id', 'order' + i)
         let productName = products[i].shelfName
         let productOrder = products[i].order

         para.textContent = productName + ': ' + productOrder

         const container = document.getElementById('order')
         container.appendChild(para)
      }
   }
}

displayProducts()

// Garbage code

// function drawProducts(elId, sourceVal, type) {
//   for (let i = 0; i <= menuSize - 1; i++) {
//     const para = document.createElement('p')
//     para.setAttribute(elId, type + i)

//     let productName = products[i].shelfName
//     let quantVal = products[i].sourceVal

//     console.log(productName)
//     console.log(quantVal)
//   }
// }

// --     CUSTOMER     -- //

let minOrderSize = 1
let maxOrderSize = 4

let minSalary = 5
let maxSalary = 500

let customerWallet = 0

function customerSalary() {
   customerWallet = getRandomInt(minSalary, maxSalary)
   displayWallet()
}

function displayWallet() {
   document.getElementById('wallet').innerHTML = 'Customer Wallet: ' + customerWallet
}

displayWallet()

document.getElementById('testButton').onclick = customerSalary

function addCustomerOrder() {
   document.getElementById('order').innerHTML = ''
   let orderSize = getRandomInt(minOrderSize, maxOrderSize)
   for (let i = 0; i <= orderSize; i++) {
      let productIndex = getRandomInt(0, menuSize - 1)
      products[productIndex].order++
   }
   displayProducts()
   calcSale()
   customerSalary()
}

document.getElementById('addOrderButton').onclick = addCustomerOrder

function clearCustomerOrder() {
   for (let i = 0; i < menuSize; i++) {
      products[i].order = 0
   }
   displayProducts()
   calcSale()
}

document.getElementById('clearOrderButton').onclick = clearCustomerOrder

// --   TRANSACTIONS   -- //

let balance = 50
let saleTotal = 0

function displaySale() {
   document.getElementById('sale').innerHTML = 'This Sale: ' + saleTotal
}

displaySale()

function displayBalance() {
   document.getElementById('balance').innerHTML = 'Balance: ' + balance
}

displayBalance()

function checkStock() {
   for (let i = 0; i < menuSize; i++) {
      if (products[i].stock < products[i].order) {
         alert("Sorry, we don't have enough " + products[i].shelfName + " you'll have to do without")
         let productStock = products[i].stock
         products[i].order = productStock
         displayProducts()
      }
   }
}

document.getElementById('checkOrderButton').onclick = checkStock

function calcSale() {
   saleTotal = 0
   for (let i = 0; i < menuSize; i++) {
      saleTotal += products[i].order * products[i].price
   }
   displaySale()
}

function checkWallet() {
   if (saleTotal > customerWallet) {
      alert("Sorry, you don't have enough money, please go away")
      return 0
   } else {
      return 1
   }
}

function fillOrder() {
   checkStock()
   console.log(calcSale())
   if (checkWallet()) {
      balance += saleTotal
      for (let i = 0; i < menuSize; i++) {
         products[i].stock -= products[i].order
      }
   }
   displayBalance()
   displayProducts()
   clearCustomerOrder()
}

document.getElementById('fillOrderButton').onclick = fillOrder

// --     RESTOCK      -- //

function restockItem() {
   for (let i = 0; i < menuSize; i++) {
      products[i].stock = products[i].stock + 1
      balance = balance - products[i].wholesalecost
   }
   displayBalance()
   displayProducts()
   console.log(1)
}

// OK This didn't work
document.getElementById('restockButt0').onclick = restockItem

// --       UTIL       -- //

function getRandomInt(min, max) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1)) + min
}

// if window.chrome {
//   document.getElementById('bgmusic').classList.add(muted)
// }
