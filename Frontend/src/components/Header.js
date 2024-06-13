import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useLazyGetPremiumQuery, useUpdateTransactionStatusMutation } from '../api/PurchaseAPI'
import { userActions } from '../store/userSlice'

const Header = () => {
  // const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isPremiumUser, isLoggedIn } = useSelector((state) => state.user)

  const [getPremium] = useLazyGetPremiumQuery()
  const [updateTransactionStatus] = useUpdateTransactionStatusMutation()

  // const showLogout = location.pathname !== '/'

  const logoutHandler = () => {
    // window.location.href = '/'      // temperory fix
    localStorage.removeItem('token')
    dispatch(userActions.setUserLogin(false))
    navigate('/')
  }

  const redirectToRazorpayHandler = async () => {
    const response = await getPremium()
    const options = {
      "key": response?.data?.key_id,
      "order_id": response?.data?.order?.id,
      "handler": async (response) => {
        const transactionStatusResponse = await updateTransactionStatus({
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id
        })
        console.log('transactionStatusResponse', transactionStatusResponse)
        if (transactionStatusResponse) {
          dispatch(userActions.setPremiumUser(true))
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()

    rzp.on('payment.failed', async (err) => {
      console.log('payment err', err)
      await updateTransactionStatus({
        order_id: options.order_id,
        // payment_id: response.razorpay_payment_id
      })
      alert('Payment failed!!')
    })
  }

  const leaderboardHandler = () => {
    navigate('/user/leaderboard')
  }

  return (
    <header className="flex justify-center py-4 text-center text-white font-bold text-xl bg-blue-600">
      <nav className='align-center'>
        Expense Tracker
      </nav>
      {isLoggedIn &&
        <div className='text-white flex gap-4 absolute right-8'>
          {isPremiumUser
            ?
            <button
              className='hover:text-blue-200'
              onClick={leaderboardHandler}
            >
              Leaderboard
            </button>
            : <button
              className='hover:text-blue-200'
              onClick={redirectToRazorpayHandler}
            >
              Buy Premium
            </button>}
          <button
            className='hover:text-blue-200'
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      }
    </header>
  )
}

export default Header