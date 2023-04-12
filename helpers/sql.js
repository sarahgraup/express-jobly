const { BadRequestError } = require("../expressError");


/**
 * Reformats javascript values to be updated for SQL SET 
 * @param {Object} dataToUpdate data:{name, description, numEmployees, logoUrl}
 * @param {Object} jsToSql altering javascript object into sql variables
 *  example: {numEmployees: "num_employees",logoUrl: "logo_url"}
 * 
 * @returns {Object} {sqlsetCols, sqlvalues}
 * example: {setCols:'"first_name"=$1, "age"=$2', 
 * values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
