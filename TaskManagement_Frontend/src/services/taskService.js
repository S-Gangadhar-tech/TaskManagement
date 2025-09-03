import api from './api';

export const taskService = {
  /**
   * Get all tasks
   * @returns {Promise<import('../types').Task[]>}
   */
  async getAllTasks() {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Get single task by ID
   * @param {string} id 
   * @returns {Promise<import('../types').Task>}
   */
  async getTask(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Create new task
   * @param {import('../types').TaskFormData} taskData 
   * @returns {Promise<import('../types').Task>}
   */
  async createTask(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update existing task
   * @param {string} id 
   * @param {Partial<import('../types').TaskFormData>} taskData 
   * @returns {Promise<import('../types').Task>}
   */
  async updateTask(id, taskData) {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Delete task
   * @param {string} id 
   * @returns {Promise<void>}
   */
  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  },

  /**
   * Get task statistics
   * @returns {Promise<import('../types').TaskStats>}
   */
  async getStats() {
    const response = await api.get('/tasks/stats');
    return response.data;
  },
};