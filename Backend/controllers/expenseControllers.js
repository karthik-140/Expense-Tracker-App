const AWS = require('aws-sdk');

const sequelize = require('../util/database');
const expenses = require('../models/expenses');
const users = require('../models/users');
const DownloadedFiles = require('../models/downloadedFiles');

const uploadToS3 = (data, fileName) => {
  const BUCKET_NAME = process.env.BUCKET_NAME
  const IAM_USER_KEY = process.env.IAM_USER_KEY
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET

  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
  })

  let params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: 'public-read',
  }

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, s3Response) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('s3Response', s3Response)
        resolve(s3Response.Location)
      }
    })
  })
}

exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const { amount, description, category } = req.body;
    const totalExpense = Number(req.user.totalExpenses) + Number(amount)

    const expense = await expenses.create(
      { amount, description, category, userId: req.user.id },
      { transaction: t }
    )
    await users.update(
      { totalExpenses: totalExpense },
      { where: { id: req.user.id }, transaction: t },
    )

    await t.commit()
    res.status(201).json({ message: 'Expense added successfully!!', expense })

  } catch (err) {
    await t.rollback()
    console.log('something went wrong!!', err)
    res.status(400).json({ message: 'Something went wrong!!', err })
  }
}

exports.getExpenses = async (req, res, next) => {
  try {
    const response = await expenses.findAll({ where: { userId: req.user.id } })
    if (response) {
      res.status(200).json({ message: 'Expenses fetched successfully!!', response })
    } else {
      res.status(400).json({ message: 'Something went wrong!!', response })
    }
  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const { id } = req.params;
    const { amount } = req.body
    const updateTotalExpense = Number(req.user.totalExpenses) - Number(amount)

    const response = await expenses.destroy(
      {
        where: { id: id, userId: req.user.id },
        transaction: t
      })

    if (response === 0) {
      await t.rollback()
      return res.status(404).json({ message: 'Expense not found!!' })
    }

    await users.update(
      { totalExpenses: updateTotalExpense },
      {
        where: { id: req.user.id },
        transaction: t
      }
    )

    await t.commit()
    res.status(200).json({ message: 'Expense deleted successfully!!' })

  } catch (err) {
    t.rollback()
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}

exports.downloadExpenses = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const expenses = await req.user.getExpenses({
      attributes: ['amount', 'description', 'category']
    })
    const stringifiedExpenses = JSON.stringify(expenses)

    const userId = req.user.id
    const fileName = `Expense${userId}/${new Date()}.txt`
    const fileUrl = await uploadToS3(stringifiedExpenses, fileName)
  
    if (fileUrl) {
      await DownloadedFiles.create({ userId, fileUrl }, { transaction: t })
      await t.commit()
      res.status(200).json({ fileUrl, success: true })
    } else {
      await t.rollback()
      res.status(404).json({ message: 'Something went wrong!!', success: false })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}

exports.getDownloadedExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id
    const downloadedFiles = await DownloadedFiles.findAll({ where: { userId }})
    res.status(200).json(downloadedFiles)
  } catch (err) {
    console.log('Server error!!', err);
    res.status(500).json({ message: 'Server error!!', details: err })
  }
}
