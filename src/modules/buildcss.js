import tailwindcss from "tailwindcss"
import postcss from "postcss"
import autoprefixer from "autoprefixer"
import fs from "fs"
import path from "path"


export default async function buildCss(stylesDir, buildsDir) {
  if (!fs.existsSync(stylesDir) || !fs.existsSync(buildsDir)) return "null"
  try {
    const files = fs.readdirSync(stylesDir)

    for (const file of files) {
      const fileExtension = path.extname(file)

      if (fileExtension === '.css') {
        let fileout = path.join(buildsDir, file)
        let fileinp = path.join(stylesDir, file)

        const css = fs.readFileSync(fileinp, 'utf8')

        const res = await postcss([tailwindcss, autoprefixer])
        .process(css, {
          from: fileinp, to: fileout
        })

        fs.writeFileSync(fileout, res.css)
      }
    }
    return false
  }
  catch(e) {
    return e
  }
}
