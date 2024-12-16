import xlsx from "xlsx";
import StockHistory from "../Schemas/StocksHistory.js";
import Company from "../Schemas/CompanySchema.js";

// Connect to MongoDB
export async function insertData() {
  // Read the Excel file
  const workbook = xlsx.readFile("path_to_your_excel_file.xlsx");

  // Assume the sheet containing the data is the first sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the sheet data to JSON
  const data = xlsx.utils.sheet_to_json(sheet);

  // Example of data from Excel
  // [
  //   { Company: "Company A", "2024-12-01": 1200, "2024-12-02": 1500, "2024-12-03": 1300 },
  //   { Company: "Company B", "2024-12-01": 800, "2024-12-02": 900, "2024-12-03": 1000 }
  // ]

  for (const record of data) {
    const companyName = record.Company;
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      console.log(`Company ${companyName} not found`);
      continue;
    }

    const companyId = company._id;

    // Loop through the dates and create history records
    for (const date in record) {
      if (date === "Company") continue; // Skip the Company column

      const visitors = record[date];
      const sharesPrice = visitors / 100;
      const sharesReturn = 0; // Default to 0

      const history = {
        companyId,
        date: new Date(date),
        number_of_buys: 0,
        number_of_sells: 0,
        shares_price: sharesPrice,
        shares_return: sharesReturn,
        visitors,
      };

      await StockHistory.insertOne(history);
    }
  }

  console.log("Data inserted successfully");
  await client.close();
}
