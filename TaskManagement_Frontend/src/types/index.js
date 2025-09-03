// Type definitions for JSDoc comments

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {'todo'|'in-progress'|'completed'} status
 * @property {'low'|'medium'|'high'} priority
 * @property {string} dueDate
 * @property {string} category
 * @property {string[]} tags
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TaskStats
 * @property {number} total
 * @property {number} completed
 * @property {number} inProgress
 * @property {number} todo
 * @property {number} overdue
 */

/**
 * @typedef {Object} TaskFormData
 * @property {string} title
 * @property {string} description
 * @property {'todo'|'in-progress'|'completed'} status
 * @property {'low'|'medium'|'high'} priority
 * @property {string} dueDate
 * @property {string} category
 * @property {string[]} tags
 */

export {};