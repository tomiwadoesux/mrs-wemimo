"use client"

import { useState } from "react"
import { HeartIcon, SpinnerIcon } from "./icons"

export function DonationForm() {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert("Thank you for your donation!")
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border">
      <h3 className="text-xl font-medium mb-4">Select Amount</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {["25", "50", "100", "250", "500", "1000"].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setAmount(val)}
            className={`py-3 rounded-md border ${
              amount === val
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-input hover:border-primary"
            }`}
          >
            ${val}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Custom Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 rounded-md border border-input bg-background"
            placeholder="Enter amount"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !amount}
        className="w-full py-4 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? <SpinnerIcon className="animate-spin" /> : <HeartIcon />}
        Donate ${amount || "0"}
      </button>
    </form>
  )
}
