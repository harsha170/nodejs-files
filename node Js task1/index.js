const path = require('path')
const express = require('express')
const fs = require('fs')
const app = express()
fs.writeFile('file.txt','Hello', (err)=>{
    if(err) throw err
    console.log('File Created')
})
app.listen(3002, ()=> {
    console.log("server started")
})
app.get("/guvi", (req,res)=>{
    var image= "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/folder-icon.png"
    fs.opendir(
        "/Users/Ajay/OneDrive/Desktop/Zen Guvi",
        "utf8",
        async(err, dir) => {
            if(err) throw err;
            var content;
            var type;
            var ext;
            for await (const dirent of dir){
                ext= path.extname(dirent.name)
                if(dirent.isDirectory()){
                    type="folder"
                }else if(ext=='.pdf'){
                    type="PDF file"
                }else if(ext==".html"){
                    type="HTML file"
                }else if(ext==".png"){
                    type='Image'
                }
                content += `<li><button type="button" class="btn btn-primary" style="margin:10px; padding:10px"
                color: red">
                ${dirent.name} <span class="badge badge-light"> --${type} <img style="width:10px; height:10px"src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/folder-icon.png"></span>
                </button></li>
                `
            }
            res.send(`<ul>${content}</ul>`)
        }
    )
})
