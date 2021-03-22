// JS
import $ from 'jquery'
import './js/animation'
import './js/app'

// Vue.js

// SCSS
import './assets/sass/app.sass'

// svg sprite
function requireAll(r) {
  r.keys().forEach(r)
}
requireAll(require.context('./assets/img/svg/', true, /\.svg$/))

fetch(`./assets/img/svg/sprite.svg`)
  .then((res) => {
    return res.text()
  })
  .then((data) => {
    document.getElementById('svg-icons').innerHTML = data
  })
