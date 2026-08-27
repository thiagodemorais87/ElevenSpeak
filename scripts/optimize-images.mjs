import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(root, '..')
const input = path.join(projectRoot, 'public/images/renata-hero.jpg')
const output = path.join(projectRoot, 'public/images/renata-hero.webp')

const info = await sharp(input).webp({ quality: 78, effort: 6 }).toFile(output)
console.log(`Wrote ${output} (${info.size} bytes)`)
