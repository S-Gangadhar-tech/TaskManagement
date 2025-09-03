const { validationResult } = require('express-validator');
const Task = require('../Models/Task');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const APIFeatures = require('../Utils/apiFeatures');
const mongoose = require('mongoose');

const getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find({ user: req.user.id }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tasks = await features.query;

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});

const getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const newTask = await Task.create({
    ...req.body,
    user: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      task: newTask
    }
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

const getTaskStats = catchAsync(async (req, res, next) => {
  // console.log(req.user);

  const userId = new mongoose.Types.ObjectId(req.user._id);
  // console.log(userId);


  const stats = await Task.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  // console.log(stats);


  const totalTasks = await Task.countDocuments({ user: req.user.id });
  const completedTasks = stats.find(stat => stat._id === 'completed')?.count || 0;
  const pendingTasks = stats.find(stat => stat._id === 'todo')?.count || 0;
  const inProgressTasks = stats.find(stat => stat._id === 'in-progress')?.count || 0;


  res.status(200).json({
    status: 'success',
    data: {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0
    }
  });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};