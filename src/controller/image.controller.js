const uploadFile = require("../middleware/upload");
const fs = require("fs");
const cp = require('child_process');
const {randomUUID} = require("crypto")
const uriFile = `https://${process.env.BASE_URL}/files`

const upload = async (req, res) => {
    const directoryPath = __basedir + "/static/assets/uploads/";
    try {
        await uploadFile(req, res);

        if (req.file === undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const uuid = randomUUID()

        // nodejs run bash shell
        cp.exec(`backgroundremover -i ${directoryPath + req.file.originalname} -o ${directoryPath + uuid + req.file.originalname}`, { shell: '/bin/bash' }, function(err, stdout, stderr){
            if(err){
                console.log(err);
                console.log(stderr);
            }
            console.log(stdout);
        });


        res.status(200).send({
            url: uriFile + "/" + uuid + req.file.originalname,
        });
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        // let fileInfos = [];

        // const file = directoryPath + req.query.name

        // files.forEach((file) => {
        //     fileInfos.push({
        //         name: file,
        //         url: baseUrl + file,
        //     });
        // });]
        for (let val of files) {
            if(req.query.name === val) {
                return res.status(200).send(uriFile + "/" + val);
            }
        }
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
};
