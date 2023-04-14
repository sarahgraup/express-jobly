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

  /** Given a job id, return data about job
   *
   * @param jobId number
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found
  */
  static async get(jobId){

  }

  /** Update job with `data`
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * @param {Object} data: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found
  */
  static async update(jobId, data){

  }

  /** Delete a given job from database; returns undefined
   *
   * Throws NotFoundError if job not found
   */
  static async remove(jobId){

  }

}

module.exports = Job;