"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(10)
  const [interestRate, setInterestRate] = useState(8)
  const [compoundingFrequency, setCompoundingFrequency] = useState("monthly")
  const [futureValue, setFutureValue] = useState(0)
  const [totalContributions, setTotalContributions] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  // Calculate investment growth
  useEffect(() => {
    // Convert annual interest rate to decimal
    const r = interestRate / 100

    // Determine number of compounding periods per year
    let periodsPerYear = 1
    switch (compoundingFrequency) {
      case "daily":
        periodsPerYear = 365
        break
      case "weekly":
        periodsPerYear = 52
        break
      case "monthly":
        periodsPerYear = 12
        break
      case "quarterly":
        periodsPerYear = 4
        break
      case "annually":
        periodsPerYear = 1
        break
    }

    // Calculate rate per period
    const ratePerPeriod = r / periodsPerYear

    // Calculate total number of periods
    const totalPeriods = periodsPerYear * years

    // Calculate future value of initial investment
    const initialFV = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods)

    // Calculate future value of regular contributions
    let contributionFV = 0
    if (ratePerPeriod > 0) {
      contributionFV = (monthlyContribution * (Math.pow(1 + ratePerPeriod, totalPeriods) - 1)) / ratePerPeriod
    } else {
      contributionFV = monthlyContribution * totalPeriods
    }

    // Calculate total future value
    const totalFV = initialFV + contributionFV

    // Calculate total contributions
    const totalContrib = initialInvestment + monthlyContribution * totalPeriods

    // Calculate total interest earned
    const totalInt = totalFV - totalContrib

    setFutureValue(Math.round(totalFV))
    setTotalContributions(Math.round(totalContrib))
    setTotalInterest(Math.round(totalInt))
  }, [initialInvestment, monthlyContribution, years, interestRate, compoundingFrequency])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Investment Calculator</CardTitle>
          <CardDescription>
            Calculate the future value of your investments based on initial investment, regular contributions, and
            expected rate of return.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="initialInvestment">Initial Investment</Label>
                <span className="text-sm text-muted-foreground">GH₵ {initialInvestment.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="initialInvestment"
                  min={0}
                  max={100000}
                  step={1000}
                  value={[initialInvestment]}
                  onValueChange={(value) => setInitialInvestment(value[0])}
                />
                <Input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <span className="text-sm text-muted-foreground">GH₵ {monthlyContribution.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="monthlyContribution"
                  min={0}
                  max={5000}
                  step={100}
                  value={[monthlyContribution]}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
                />
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <span className="text-sm text-muted-foreground">{years} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="years"
                  min={1}
                  max={40}
                  step={1}
                  value={[years]}
                  onValueChange={(value) => setYears(value[0])}
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <span className="text-sm text-muted-foreground">{interestRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="interestRate"
                  min={0}
                  max={20}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger id="compoundingFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Projected value of your investment after {years} years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted">
              <h3 className="font-medium text-sm text-muted-foreground">Future Value</h3>
              <p className="text-3xl font-bold">GH₵ {futureValue.toLocaleString()}</p>
            </div>
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted">
              <h3 className="font-medium text-sm text-muted-foreground">Total Contributions</h3>
              <p className="text-3xl font-bold">GH₵ {totalContributions.toLocaleString()}</p>
            </div>
            <div className="space-y-2 text-center p-4 rounded-lg bg-muted">
              <h3 className="font-medium text-sm text-muted-foreground">Interest Earned</h3>
              <p className="text-3xl font-bold">GH₵ {totalInterest.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
