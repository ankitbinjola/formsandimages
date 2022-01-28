const express = require('express');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const morgan = require('morgan');
const app = express();


//template engine middleware
app.set("view engine", "ejs");


//json middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));


app.use(morgan('combined'));


// cloudnary configs
cloudinary.config({ 
    cloud_name: 'testingankitbinjola123', 
    api_key: '944145249987717', 
    api_secret: '_lgYYL7scKMfOgmlnpbQiFr_7g0',
    secure: true
  });


app.get('/myget', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

// app.post('/mypost', async(req, res) => {
//     const file = req.files.fileupload.tempFilePath
//     console.log(file);

//     const result = await cloudinary.uploader.upload(file, {folder: 'demo'})
    
//     const body = {
//         firstname : req.body.firstname,
//         lastname : req.body.lastname,
//         result: result.url
//     }
//     res.send(body);

// })


//for multiple file file upload

app.post('/mypost', async(req, res) => {
    // console.log(req.files);
    try {
        const filearray = req.files.fileupload
        let resultarray = []
        for (let file of filearray){
            let result = await cloudinary.uploader.upload(file.tempFilePath, {folder: 'demo'})
            resultarray.push(result); 
        }
        // console.log(resultarray);
        const body = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            result: {
                filedata : resultarray
            }
        }
    
        console.log(body);
    
        res.send(body);

    } catch (error) {
        console.log(error);
    }


})




app.get('/mygetform',(req, res) => {
    res.render("getforms");
});


app.get('/mypostform',(req, res) => {
    res.render("postforms");
});


app.listen(4000, () => {
    console.log('server running on port 4000....')
})