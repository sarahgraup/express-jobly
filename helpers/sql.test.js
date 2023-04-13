const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
    test("works with one value update", function () {
        const result = sqlForPartialUpdate(
            { numEmployees: 5 },
            { numEmployees: "num_employees" }
        );
        expect(result).toEqual({
            setCols: `"num_employees"=$1`,
            values: [5]
        });

    });
    test("throws error if no data", function () {

        expect(() => {
            (sqlForPartialUpdate({}))
        }).toThrow(new BadRequestError("No data"));
    });
    //test for multiple variables that doesnt have snake to camel
    //like age



})
