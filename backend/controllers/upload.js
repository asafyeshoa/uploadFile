import xlsx from "xlsx";
import mustache from "mustache";
import fs from "fs";
import File from "../models/FileModel.js";

const uploadFile = async (file) => {
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];

  const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const template = fs.readFileSync(
    "backend/templates/template.mustache",
    "utf8"
  );

  const results = sheet.map((row) => mustache.render(template, row));

  const fileName = `output_${Date.now()}.txt`;

  fs.writeFileSync(`uploads/${fileName}`, results.join("\n"));

  const fileRecord = new File({ fileName, content: results.join("\n") });

  await fileRecord.save();

  return fileName;
};

export default { uploadFile };
