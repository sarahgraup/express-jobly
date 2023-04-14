"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for jobs */

class Job {

  // create job
  /** Create a job (from data), update db, return new job data
   * @param {title, salary, equity, company_handle}
   *
   * Returns {id, title, salary, equity, company_handle}
   */
  static async create({title, salary, equity, company_handle}) {

  }

  // findAll jobs

  // findSome jobs

  // get job (on id)

  // update job

  // remove job

}

module.exports = Job;