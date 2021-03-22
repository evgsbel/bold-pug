// import { createApp } from 'vue'

// let treeData = {
//   name: 'ZORNET.RU',

//   children: [
//     {
//       name: 'Первый раздел',
//       children: [{ name: 'Под категория #1' }, { name: 'Под категория #2' }],
//     },
//   ],
// }

// const Nav = {
//   data: () => ({
//     treeData: treeData,
//   }),
//   methods: {
//     addNewNote() {
//       console.log('test')
//     },
//   },
// }

// const app = createApp(Nav)
// app.mount('#nav')
let el = document.getElementsByClassName('nav__item')

for (let i = 0; i < el.length; i++) {
  el[i].addEventListener('mouseenter', showSub, false)
  el[i].addEventListener('mouseleave', hideSub, false)
}

function showSub(e) {
  if (this.children.length > 1) {
    this.children[1].style.height = 'auto'
    this.children[1].style.overflow = 'visible'
    this.children[1].style.opacity = '1'
  } else {
    return false
  }
}

function hideSub(e) {
  if (this.children.length > 1) {
    this.children[1].style.height = '0px'
    this.children[1].style.overflow = 'hidden'
    this.children[1].style.opacity = '0'
  } else {
    return false
  }
}
