fetch('https://digbycampbell.github.io/header.html')
   .then((res) => res.text())
   .then((text) => {
      let oldelem = document.querySelector('script#replace-with-header')
      let newelem = document.createElement('div')
      newelem.innerHTML = text
      oldelem.parentNode.replaceChild(newelem, oldelem)
   })

fetch('https://digbycampbell.github.io/footer.html')
   .then((res) => res.text())
   .then((text) => {
      let oldelem = document.querySelector('script#replace-with-footer')
      let newelem = document.createElement('div')
      newelem.innerHTML = text
      oldelem.parentNode.replaceChild(newelem, oldelem)
   })
