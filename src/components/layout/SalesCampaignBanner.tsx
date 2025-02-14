"use client"
import { useRouter } from "next/navigation";
import React from "react";

const SalesCampaignBanner = () => {
  const [timeLeft, setTimeLeft] = React.useState("")

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight.getTime() - now.getTime()

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])
  const router = useRouter()
  return (
    <div className="w-full bg-gradient-to-r from-rose-700 via-orange-600 to-red-500 text-white text-center py-3 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items center justify-center gap-2 sm:gap-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold animate-bounce">🔥</span>
            <div className="text-sm sm:text-base font-bold">FLASH SALE ENDS IN:</div>
            <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">{timeLeft}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">⚡</span>
            <span className="font-bold text-yellow-200 animate-pulse">UP TO 95% OFF</span>
          </div>
          <button className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-small hover:bg-yellow-200 shadow-lg hover:shadow-none transition-colors" onClick={()=>router.push('/')}>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default SalesCampaignBanner;
