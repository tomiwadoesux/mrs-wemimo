"use client"

export function DonationThermometer() {
  return (
    <div className="bg-card p-8 rounded-lg border border-border text-center">
      <h3 className="text-xl font-medium mb-2">Fundraising Goal</h3>
      <p className="text-muted-foreground mb-6">Help us reach our goal of $50,000</p>
      
      <div className="relative h-8 bg-muted rounded-full overflow-hidden mb-4">
        <div className="absolute left-0 top-0 bottom-0 bg-secondary w-[65%]" />
      </div>
      
      <div className="flex justify-between text-sm font-medium">
        <span>Raised: $32,500</span>
        <span>Goal: $50,000</span>
      </div>
    </div>
  )
}
