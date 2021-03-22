import TimelineMax from 'TimelineMax'
import TweenLite from 'TweenLite'
import TweenMax from 'TweenMax'
import TimelineLite from 'TimelineLite'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'

let controller = new ScrollMagic.Controller()

$(function() {
  let scene = new ScrollMagic.Scene({
    triggerElement: '#first',
    triggerHook: 0,
  })
    .setClassToggle('.js-nav', 'js-nav_fade-out')
    .setClassToggle()
    //.addIndicators({ name: '1 (duration: 100)' }) // add indicators (requires plugin)
    .addTo(controller)
})
$(function() {
  // wait for document ready
  // build scene
  let h = $('#third').height() + $('#fourth').height()
  let scene = new ScrollMagic.Scene({
    triggerElement: '#third',
    duration: '75%',
    triggerHook: 0.07,
  })
    .setPin('#pin2', { pushFollowers: false })
    // .addIndicators({ name: '2 (duration: 500)' }) // add indicators (requires plugin)
    .addTo(controller)
})
$(function() {
  let scene = new ScrollMagic.Scene({
    triggerElement: '#fourth',
  })
    .addTo(controller)
    .setClassToggle('.fourth__cards', 'fourth__cards_fade-in')
})

$(function() {
  let scene = new ScrollMagic.Scene({
    triggerElement: '#fourth',
    triggerHook: 0.07,
  })
    .addTo(controller)
    .setClassToggle('.pin3', 'pin3__fade-in')
})

$(function() {
  let scene = new ScrollMagic.Scene({
    triggerElement: '#fourth2',
    duration: '100%',
  })
    .addTo(controller)
    .setClassToggle('.logo', 'logo_white')
})
$(function() {
  let scene = new ScrollMagic.Scene({
    triggerElement: '#sixth',
    duration: '100%',
    triggerHook: 0.07,
  })
    .addTo(controller)
    .setClassToggle('.logo', 'logo_white')
})
$(function() {
  let tl1p1 = new TimelineMax()
  tl1p1.fromTo(
    '.third__card-img ',
    1,
    { x: 500, opacity: 0 },
    { x: -10, opacity: 1 },
    0.3
  )
  let scene1p1 = new ScrollMagic.Scene({
    triggerElement: '#third',
    duration: '20%',
    triggerHook: 0.5,
    reverse: true,
  })
    .setTween(tl1p1)
    .addTo(controller)
})
function pathPrepare($el) {
  let lineLength = $el[0].getTotalLength()
  $el.css('stroke-dasharray', lineLength)
  $el.css('stroke-dashoffset', lineLength)
}
let $word = $('path#word')
// prepare SVG
pathPrepare($word)
// init controller
let ctrl = new ScrollMagic.Controller()
// build tween
let tween = new TimelineMax()
let tweenMax = new TimelineMax()
tween.add(
  tweenMax.to($word, 0.3, {
    strokeDashoffset: 0,
    ease: Linear.easeNone,
  })
)
// build scene
let scene = new ScrollMagic.Scene({
  triggerElement: '#triggerSvg',
  duration: '4288px',
  tweenChanges: true,
  reverse: true,
  triggerHook: 2.2,
})
  .setTween(tween)
  //.addIndicators() // add indicators (requires plugin)
  .addTo(ctrl)

$(function() {
  let tl1p2 = new TimelineMax()
  tl1p2.fromTo(
    '.sixth__gif',
    1,
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1 },
    0.3
  )
  let scene2p2 = new ScrollMagic.Scene({
    triggerElement: '#sixth',
    duration: '20%',
    reverse: true,
  })
    .setTween(tl1p2)
    .addTo(controller)
})

$(function() {
  let tl1p3 = new TimelineMax()
  tl1p3.fromTo(
    '.sixth__circle',
    1,
    { x: 50, opacity: 0 },
    { x: 10, opacity: 1 },
    0.5
  )
  let scene3p3 = new ScrollMagic.Scene({
    triggerElement: '#sixth',
    duration: '20%',
    reverse: true,
  })
    .setTween(tl1p3)
    .addTo(controller)
})
