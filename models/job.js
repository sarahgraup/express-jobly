"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for jobs */

class Job {

  /** Create a job (from data), update db, return new job data
   * @param {title, salary, equity, company_handle}
   *
   * Returns {id, title, salary, equity, company_handle}
   */
  static async create({title, salary, equity, company_handle}) {

  }

  /** Find all jobs
   *
   * Return [{id, title, salary, equity, company_handle}, ...]
   */
  static async findAll(){

  }

  /** Find matching jobs based on filter
   *
   * @param {Object} filterBy {title, minSalary, hasEquity}
   *
   * Returns [{id, title, salary, equity, company_handle}, ...]
  */
  static async findSome(filterBy){

  }

  // get job (on id)

  // update job

  // remove job

}

module.exports = Job;