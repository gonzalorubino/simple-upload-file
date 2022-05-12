// Importo librerias para manejo de archivos
import formidable from "formidable";
import fs from "fs";
import path from "path";

const uploadDirectory = path.resolve(process.cwd(), "public/uploads/");

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
    
    await readDir(req,res);
  });
};

// Metodo para guardar el archivo. Darle nombre y ubicacion
const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath);

  fs.writeFileSync(path.join(uploadDirectory, file.originalFilename.replace(/\s/g, '_')), data);
  
  await fs.unlinkSync(file.filepath);
  return;
};

const readDir = async (req,res) => {
  try {
  const dir = './public/uploads/';
  let output;
  
  if (fs.existsSync(dir)) {
    output = await fs.readdirSync(dir);

    // agrego la ruta estatica
    output.forEach((file, idx) => {
      output[idx] = `/uploads/${file}`;
    });
  }
    res.json({
      'files': output
    });
    return res.status(200).end();
  } catch (error) {
    res.json(error);
    return res.status(405).end();
  }
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
