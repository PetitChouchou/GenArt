import path from "path";
import fs from 'fs'

export default function readSketches(): Array<{ slug: string }> {
  const postsDirectory = path.join(process.cwd(), 'pages/sketch');
  const fileNames = fs.readdirSync(postsDirectory);
  const allSketches = fileNames.map(fileName => {
    const slug: string = fileName.replace(/\.tsx$/, '');
    return {
      slug,
    }
  })
  return allSketches
}