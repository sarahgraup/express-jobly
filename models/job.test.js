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
  commonAfterAll,
  jobIds,
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

/************************************** findSome */
/**
 * filter by title
 * filter by has equity and min salary
 * filter not found
 * filter not work if bad input
 */
describe("findSome", function () {
  test("works: filter by title", async function () {
    const filterObj = { titleLike: 'job1' };
    let jobs = await Job.findSome(filterObj);
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
    ]);
  });

  test("works: filter by equity AND min salary", async function () {
    const filterObj = { hasEquity: true, minSalary: 200 };
    let jobs = await Job.findSome(filterObj);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: 'job3',
        salary: 300,
        equity: '0.5',
        companyHandle: 'c3'
      }
    ]);
  });

  test("works: filter by equity", async function () {
    const filterObj = { hasEquity: true };
    let jobs = await Job.findSome(filterObj);
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
        title: 'job3',
        salary: 300,
        equity: '0.5',
        companyHandle: 'c3'
      },
    ]);
  });

  test("works: filter by job title - 1", async function () {
    const filterObj = { titleLike: '1' };
    let jobs = await Job.findSome(filterObj);
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
    ]);
  });

  test("works: filter by job title and equity if no matches ", async function () {
    const filterObj = { titleLike: 'title', hasEquity: true };
    let jobs = await Job.findSome(filterObj);
    expect(jobs).toEqual([]);
  });
});


/************************************** _createSqlFilter */

// * example: {titleLike: "net", minSalary: 50000, hasEquity: true}
// *
// * Returns {
// *          where: `title ILIKE $1 AND salary >= $2 AND equity > 0`,
// *          values: ["net", 50000]
// * }

describe("_createSqlFilter", function () {
  test("works: for one input", function () {
    const filterObj = { minSalary: 200 };
    const sqlData = Job._createSqlFilter(filterObj);
    expect(sqlData).toEqual({ where: 'salary >= $1', values: [200] });
  });

  test("works: for multiple input", function () {
    const filterObj = { titleLike: "job", minSalary: 300, hasEquity: true };
    const sqlData = Job._createSqlFilter(filterObj);
    expect(sqlData).toEqual(
      {
        where: `title ILIKE $1 AND salary >= $2 AND equity > 0`,
        values: ["%job%", 300]
      }
    );
  });
});

// /************************************** get */
// /**
//  * works
//  * not found if no such company
//  */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get(jobIds[0]);
    expect(job).toEqual({
      id: expect.any(Number),
      title: 'job1',
      salary: 100,
      equity: '1',
      companyHandle: 'c1'
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(0);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// /************************************** update */
// /**
//  * works
//  * works if null fields
//  * not found for no such company
//  * bad request if no data
//  */

describe("update", function () {
  const updateData = {
    // id: jobIds[0],
    title: 'newjob1',
    salary: 100,
    equity: '1',
    companyHandle: 'c1'
  };

  test("works", async function () {
    const job = await Job.update(jobIds[0], updateData);
    expect(job).toEqual({
      title: "newjob1",
      ...updateData,
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = $1`, [jobIds[0]]);
    expect(result.rows).toEqual([{
      id:jobIds[0],
      title: 'newjob1',
      salary: 100,
      equity: '1',
      companyHandle: 'c1'
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      id:jobIds[0],
      title: 'newjob1',
      salary: null,
      equity: null,
      companyHandle: 'c1'
    };

    let company = await Job.update(jobIds[0], updateDataSetNulls);
    expect(company).toEqual({
      title:'newjob1',
      ...updateDataSetNulls,
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = $1`, [jobIds[0]]);
    expect(result.rows).toEqual([{
      id:jobIds[0],
      title: 'newjob1',
      salary: null,
      equity: null,
      companyHandle: 'c1'
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, updateData);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update(jobIds[0], {});
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

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




