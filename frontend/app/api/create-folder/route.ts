import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { folderName } = await req.json();

    if (!folderName) {
      return NextResponse.json(
        {
          success: false,
          message: "Folder name is required",
        },
        { status: 400 }
      );
    }

    const folderPath = path.join(
      process.cwd(),
      "projects",
      folderName
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });

      // index.html
      fs.writeFileSync(
        path.join(folderPath, "index.html"),
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${folderName}</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <h1>${folderName}</h1>

  <script src="./script.js"></script>
</body>
</html>`
      );

      // style.css
      fs.writeFileSync(
        path.join(folderPath, "style.css"),
        `body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  color: #333;
}`
      );

      // script.js
      fs.writeFileSync(
        path.join(folderPath, "script.js"),
        `console.log("${folderName} loaded");`
      );

      console.log(
        "Project created:",
        folderPath
      );
    }

    return NextResponse.json({
      success: true,
      folderName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}