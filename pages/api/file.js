// Importo librerias para manejo de archivos
import formidable from "formidable";
import fs from "fs";

// Expongo que la API va a escuchar como 'bodyParser'
export const config = {
  api: {
    bodyParser: false
  }
};

// Que sucede cuando entran por POST un request
const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

// Metodo para guardar el archivo. Darle nombre y ubicacion
const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/uploads/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

const readDir = async (req,res) => {
  const dir = './public/uploads/';
  let output;
  
  if (fs.existsSync(dir)) {
    output = await fs.readdirSync(dir);
  }

  return res.status(200).send(output);
}

// hace un export default, para que sucede con cada metodo HTTP (Post, Put, Get, etc)
export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? readDir(req, res) // console.log("GET")
    : res.status(404).send("");
};