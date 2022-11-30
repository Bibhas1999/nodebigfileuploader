import fs from 'fs'
class DefaultController {
  static home = (req, res) => {
    let data = {
      layout: "./master.njk",
    }
    res.render("layouts/home", { data: data });
  };

  static streamAudio = async (req,res)=>{
    const range = req.headers.range
    if(!range){
      return res.status(400).send("Requires Range Headers")
    }
    const audioPath = "./public/audios/audio.mp3"
    const audioSize = fs.statSync(audioPath).size
    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g,""))
    const end = Math.min(start + CHUNK_SIZE,audioSize-1)
    const contentLength = end-start+1
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Range":`bytes`,
      "Content-Length":contentLength,
      "Content-Type": "audio/mp3"
    }
    res.writeHead(206, headers)
    const audioStream = fs.createReadStream(audioPath, {start,end})
    audioStream.pipe(res)
  }


  static streamVideo = async (req,res)=>{
    const range = req.headers.range
    if(!range){
      return res.status(400).send("Requires Range Headers")
    }
    const videoPath = "./public/videos/cod.mp4"
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g,""))
    const end = Math.min(start + CHUNK_SIZE,videoSize-1)
    const contentLength = end-start+1
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Range":`bytes`,
      "Content-Length":contentLength,
      "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, {start,end})
    videoStream.pipe(res)
  }

  static uploadCSV = (req,res)=>{
    try {
      const fileName = req.headers["file-name"]
      if(!fileName){
         throw('File Name is missing')
      }
      req.on('data',(chunk)=>{
        fs.appendFileSync(`./public/uploads/${fileName}`,chunk)
      })
      return res.end("File Uploaded Successfuly")
    } catch (error) {
      res.send({error:error})
    }
  }

  static readData = async (req,res)=>{
    console.log(req.body)
  }
  
}



export default DefaultController;
