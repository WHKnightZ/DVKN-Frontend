import { CARD_TYPES } from './constants'

export let isLoadedImages = false

let countDoneImages = 0

const imgLocations: any = {
  elementMetal: 'element-metal',
  elementWood: 'element-wood',
  elementEarth: 'element-earth',
  elementWater: 'element-water',
  elementFire: 'element-fire',
  star: 'star',
  frame: 'frame',
  typeCivilian: 'type-civilian',
  typeWorker: 'type-worker',
  typeDignitary: 'type-dignitary',
  typeDivine: 'type-divine',
  typeWild: 'type-wild',
  typeInvader: 'type-invader',
  typeDemon: 'type-demon',
  typeFrame: 'type-frame',
}

const totalImages = Object.keys(imgLocations).length

const loadedImage = () => {
  countDoneImages += 1

  if (countDoneImages === totalImages) isLoadedImages = true
}

const imgs: any = {}

Object.keys(imgLocations).forEach((key) => {
  const newKey = `img${key[0].toUpperCase()}${key.slice(1)}`
  imgs[newKey] = new Image()
  imgs[newKey].src = `/create-card/${imgLocations[key]}.png`
  imgs[newKey].onload = loadedImage
})

const {
  imgElementMetal,
  imgElementWood,
  imgElementEarth,
  imgElementWater,
  imgElementFire,
  imgStar,
  imgFrame,
  imgTypeCivilian,
  imgTypeWorker,
  imgTypeDignitary,
  imgTypeDivine,
  imgTypeWild,
  imgTypeInvader,
  imgTypeDemon,
  imgTypeFrame,
} = imgs

const imgElements = [
  imgElementMetal,
  imgElementWood,
  imgElementEarth,
  imgElementWater,
  imgElementFire,
]

export {
  imgElements,
  imgStar,
  imgFrame,
  imgTypeCivilian,
  imgTypeWorker,
  imgTypeDignitary,
  imgTypeDivine,
  imgTypeWild,
  imgTypeInvader,
  imgTypeDemon,
  imgTypeFrame,
}

const { CIVILIAN, WORKER, DIGNITARY, DIVINE, WILD, INVADER, DEMON } = CARD_TYPES

export const mappingCardTypeImage = {
  [CIVILIAN]: imgTypeCivilian,
  [WORKER]: imgTypeWorker,
  [DIGNITARY]: imgTypeDignitary,
  [DIVINE]: imgTypeDivine,
  [WILD]: imgTypeWild,
  [INVADER]: imgTypeInvader,
  [DEMON]: imgTypeDemon,
}
