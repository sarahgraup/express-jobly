"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    companyHandle: "c1",
    title: "New Job",
    salary: 100,
    equity: "1",
  };

  test("works", async function () {
    const job = await Job.create(newJob);
    expect(job).toEqual({
      ...newJob,
      id: expect.any(Number),
    });

  });

  test("fails - company not found", async function () {
    const jobFakeCompany = {
      companyHandle: "fake",
      title: "New Job",
      salary: 100,
      equity: "1",
    };

    await expect(Job.create(jobFakeCompany))
      .rejects
      .toThrow(new NotFoundError(`No company: fake`));
  });
});
// /** For admin
// //if company is not found
// //if missing input good
// //if missing input and its bad
// for routes:
// for non-admin
// unauth if not found
// unauth if missing
// unauth

// for anon

// */


// /************************************** findAll */

describe("findAll", function () {
  test("works: finds all jobs", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: 'job1',
        salary: 100,
        equity: '1',
        companyHandle: 'c1'

      },
      {
        id: expect.any(Number),
        title: 'job1',
        salary: 100,
        equity: '1',
        companyHandle: 'c1'

      },
      {
        id: expect.any(Number),
        title: 'job2',
        salary: 200,
        equity: null,
        companyHandle: 'c2'
      },
      {
        id: expect.any(Number),
        title: 'job3',
        salary: 300,
        equity: '0.5',
        companyHandle: 'c3'
      },
    ]);
  });
});

// /************************************** findSome */
// /**
//  * filter by title
//  * filter by has equity and min salary
//  * filter not found
//  * filter not work if bad input
//  */
// describe("findSome", function () {
//   test("works: filter by title", async function () {
//     const filterObj = { titleLike: 'job1' };
//     let jobs = await Job.findSome(filterObj);
//     expect(jobs).toEqual([
//       {
//         title: 'job1',
//         salary: 100,
//         equity: '1',
//         companyHandle: 'c1'

//       },
//       {
//         title: 'job1',
//         salary: 100,
//         equity: '1',
//         companyHandle: 'c1'

//       },
//     ]);
//   });

//   test("works: filter by equity AND min salary", async function () {
//     const filterObj = { equity: true, minSalary: 200 };
//     let jobs = await Job.findSome(filterObj);
//     expect(jobs).toEqual([
//       {
//         title: 'job3',
//         salary: 300,
//         equity: '0.5',
//         companyHandle: 'c3'
//       }
//     ]);
//   });

//   test("works: filter by equity", async function () {
//     const filterObj = { equity: false };
//     let jobs = await Job.findSome(filterObj);
//     expect(jobs).toEqual([
//       {
//         title: 'job2',
//         salary: 200,
//         equity: null,
//         companyHandle: 'c2'
//       }
//     ]);
//   });

//   test("works: filter by job title - 1", async function () {
//     const filterObj = { titleLike: '1' };
//     let jobs = await Job.findSome(filterObj);
//     expect(jobs).toEqual([
//       {
//         title: 'job1',
//         salary: 100,
//         equity: '1',
//         companyHandle: 'c1'

//       },
//       {
//         title: 'job1',
//         salary: 100,
//         equity: '1',
//         companyHandle: 'c1'

//       },
//     ]);
//   });

//   test("works: filter by job title and equity if no matches ", async function () {
//     const filterObj = { nameLike: 'job1', equity: false };
//     let jobs = await Job.findSome(filterObj);
//     expect(jobs).toEqual([]);
//   });


// });


// /************************************** _createSqlFilter */

// // describe("_createSqlFilter", function () {
// //   test("works: for one input", function () {
// //     const filterObj = {minEmployees: 2};
// //     const sqlData = Company._createSqlFilter(filterObj);
// //     expect(sqlData).toEqual({where: 'num_employees >= $1', values: [2]});
// //   });

// //   test("works: for multiple input", function () {
// //     const filterObj = {nameLike: "net", minEmployees: 5};
// //     const sqlData = Company._createSqlFilter(filterObj);
// //     expect(sqlData).toEqual(
// //       {
// //         where: `name ILIKE $1 AND num_employees >= $2`,
// //         values: ["%net%", 5]
// //       }
// //     );
// //   });
// // });

// /************************************** get */
// /**
//  * works
//  * not found if no such company
//  */

// describe("get", function () {
//   test("works", async function () {
//     let company = await Company.get("c1");
//     expect(company).toEqual({
//       handle: "c1",
//       name: "C1",
//       description: "Desc1",
//       numEmployees: 1,
//       logoUrl: "http://c1.img",
//     });
//   });

//   test("not found if no such company", async function () {
//     try {
//       await Company.get("nope");
//       throw new Error("fail test, you shouldn't get here");
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });

// /************************************** update */
// /**
//  * works
//  * works if null fields
//  * not found for no such company
//  * bad request if no data
//  */

// describe("update", function () {
//   const updateData = {
//     name: "New",
//     description: "New Description",
//     numEmployees: 10,
//     logoUrl: "http://new.img",
//   };

//   test("works", async function () {
//     let company = await Company.update("c1", updateData);
//     expect(company).toEqual({
//       handle: "c1",
//       ...updateData,
//     });

//     const result = await db.query(
//       `SELECT handle, name, description, num_employees, logo_url
//            FROM companies
//            WHERE handle = 'c1'`);
//     expect(result.rows).toEqual([{
//       handle: "c1",
//       name: "New",
//       description: "New Description",
//       num_employees: 10,
//       logo_url: "http://new.img",
//     }]);
//   });

//   test("works: null fields", async function () {
//     const updateDataSetNulls = {
//       name: "New",
//       description: "New Description",
//       numEmployees: null,
//       logoUrl: null,
//     };

//     let company = await Company.update("c1", updateDataSetNulls);
//     expect(company).toEqual({
//       handle: "c1",
//       ...updateDataSetNulls,
//     });

//     const result = await db.query(
//       `SELECT handle, name, description, num_employees, logo_url
//            FROM companies
//            WHERE handle = 'c1'`);
//     expect(result.rows).toEqual([{
//       handle: "c1",
//       name: "New",
//       description: "New Description",
//       num_employees: null,
//       logo_url: null,
//     }]);
//   });

//   test("not found if no such company", async function () {
//     try {
//       await Company.update("nope", updateData);
//       throw new Error("fail test, you shouldn't get here");
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });

//   test("bad request with no data", async function () {
//     try {
//       await Company.update("c1", {});
//       throw new Error("fail test, you shouldn't get here");
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy();
//     }
//   });
// });

// /************************************** remove */

// describe("remove", function () {
//   test("works", async function () {
//     await Company.remove("c1");
//     const res = await db.query(
//       "SELECT handle FROM companies WHERE handle='c1'");
//     expect(res.rows.length).toEqual(0);
//   });

//   test("not found if no such company", async function () {
//     try {
//       await Company.remove("nope");
//       throw new Error("fail test, you shouldn't get here");
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });




