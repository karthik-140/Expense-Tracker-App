const Razorpay = require('razorpay');

const Order = require('../models/order');

exports.purchasePremium = (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: 'rzp_test_ORIjJaCANSh1SH',
      key_secret: '3SyRm9wEPXjekayVgr2S1WND'
    })
    const amount = 5000;
    rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      console.log('orderCreated', order)
      req.user.createOrder({ orderId: order.id, status: 'PENDING' })
        .then(() => {
          res.status(201).json({ order, key_id: rzp.key_id })
        })
        .catch((err) => {
          throw new Error(err)
        })
    })
  } catch (err) {
    console.log('Something went wrong!!', err)
    res.status(403).json({ message: 'Something went wrong!!', err })
  }
}

exports.updateTransactionStatus = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderId: order_id } })

    if (!payment_id) {
      order.update({ status: 'FAILED' })
      return res.status(403).json({ success: false, message: 'Payment Failed!!' })
    }

    const promise1 = order.update({ paymentId: payment_id, status: 'SUCCESS' })
    const promise2 = req.user.update({ isPremiumUser: true })

    Promise.all([promise1, promise2])
      .then(() => {
        res.status(202).json({ success: true, message: 'Transaction Successful!!' })
      })
      .catch((err) => {
        console.log('updateTransactionError', err);
        res.status(403).json({ message: 'Something went wrong!!', err })
      })
  } catch (err) {
    console.log('Server error', err);
    res.status(500).json({ message: 'Server error!!', err })
  }
}