import fs from 'fs'

export type Thingies = Record<string, number>

function main() {
  // load weights from file
  const filename = `${__dirname}/../resources/weights.json`
  // TODO(Aaron): potentially enforce file format?
  const thingies = JSON.parse(fs.readFileSync(filename).toString()) as Thingies
  // NOTE(Aaron): this may be the most expensive way to do a weighted random
  // we should revisit this when we can
  // explode weights to array
  const weightedThingies = Object.entries(thingies).reduce<Array<string>>(
    (acc, [thingy, count]) => [...acc, ...new Array(count).fill(thingy)],
    []
  )
  // choose random array object
  const randomNumber = Math.floor(Math.random() * weightedThingies.length)
  const chosenThingy = weightedThingies[randomNumber]
  // increase weights of all items
  Object.entries(thingies).forEach(([thingy, weight]) => {
    thingies[thingy] = weight + 1
  })
  // reset choices weight
  thingies[chosenThingy] = 1
  // write weights to file
  fs.writeFileSync(filename, JSON.stringify(thingies, null, 2))
  // output choice
  return chosenThingy
}

// TODO(Aaron): add ability to manage our tasks
// eg: add, remove, rename, update weights
// this could just be a feature on a todo app
// should we integrate a todo app into dither bot
console.log(main())

process.exit()
