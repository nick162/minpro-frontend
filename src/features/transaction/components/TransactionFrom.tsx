'use client'

import { useState, useEffect } from 'react'


const TransactionFrom = () => {
  const [selectedMethod, setSelectedMethod] = useState<'gateway' | 'transfer'>('gateway')
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 menit

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) clearInterval(timer)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' + s : s}`
  }

  const totalPrice = 850000 + 2000000

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-8">
      {/* Left Content */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">Order Detail</h1>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex gap-4">
            <img src="/event-image.jpg" alt="event" className="w-48 h-28 rounded-md object-cover" />
            <div>
              <h2 className="font-semibold text-lg">Hwang In Youp In Love Fan Meeting Tour</h2>
              <p className="text-sm">📍 Jakarta</p>
              <p className="text-sm">📅 03 Feb 2026 - 05 Feb 2026</p>
              <p className="text-sm">⏰ 16:00 - 20:00</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <span>🎫 Regular</span>
            <span>Rp 850.000</span>
          </div>
          <div className="flex justify-between">
            <span>🎫 VIP Access</span>
            <span>Rp 2.000.000</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Payment Method</h2>
          <div
            className={`p-4 rounded-lg border cursor-pointer mb-2 ${
              selectedMethod === 'gateway' ? 'bg-gray-700 border-orange-500' : 'bg-gray-900'
            }`}
            onClick={() => setSelectedMethod('gateway')}
          >
            💳 Payment Gateway
          </div>
          <div
            className={`p-4 rounded-lg border cursor-pointer ${
              selectedMethod === 'transfer' ? 'bg-gray-700 border-orange-500' : 'bg-gray-900'
            }`}
            onClick={() => setSelectedMethod('transfer')}
          >
            🏦 Direct Transfer
          </div>
          <p className="mt-2 text-sm text-orange-500">Selected Payment Method: {selectedMethod === 'gateway' ? 'Payment Gateway' : 'Direct Transfer'}</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-80 bg-gray-900 p-4 rounded-lg">
        <div className="bg-yellow-400 text-black text-sm p-2 rounded mb-4 text-center font-medium">
          ⚠️ Your order will expire in {formatTime(timeLeft)}
        </div>
        <input type="text" placeholder="Enter voucher code here" className="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded mb-4">Apply</button>
        <div className="text-sm mb-2">
          <div className="flex justify-between">
            <span>Total ticket price</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded">Pay</button>
      </div>
    </div>
  )
}

export default TransactionFrom;
