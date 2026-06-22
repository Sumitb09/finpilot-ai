import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export async function exportReportAsPDF(
  report: string
) {
  const html = `
    <html>
      <head>
        <style>
          body{
            font-family: Arial;
            padding:40px;
            line-height:1.6;
          }

          h1{
            color:#2563EB;
          }

          h2{
            color:#1E40AF;
            margin-top:24px;
          }

          p{
            font-size:15px;
          }

          li{
            margin-bottom:8px;
          }
        </style>
      </head>

      <body>

        ${report
          .replace(/^# (.*)$/gm, "<h1>$1</h1>")
          .replace(/^## (.*)$/gm, "<h2>$1</h2>")
          .replace(/\n/g, "<br/>")}

      </body>
    </html>
  `;

  const file =
    await Print.printToFileAsync({
      html,
    });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  }
}