"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyContribution, setMonthlyContribution] = useState(1000)
  const [returnRate, setReturnRate] = useState(7)
  const [inflationRate, setInflationRate] = useState(3)
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(5000)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)

  const [projectedSavings, setProjectedSavings] = useState(0)
  const [projectedMonthlyIncome, setProjectedMonthlyIncome] = useState(0)
  const [incomeGap, setIncomeGap] = useState(0)
  const [additionalSavingsNeeded, setAdditionalSavingsNeeded] = useState(0)

  // Calculate retirement projections
  useEffect(() => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge

    // Years in retirement
    const yearsInRetirement = lifeExpectancy - retirementAge

    // Real rate of return (adjusted for inflation)
    const realReturnRate = (1 + returnRate / 100) / (1 + inflationRate / 100) - 1

    // Calculate future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + returnRate / 100, yearsToRetirement)

    // Calculate future value of monthly contributions
    const monthlyRate = returnRate / 100 / 12
    const months = yearsToRetirement * 12
    let futureValueContributions = 0

    if (monthlyRate > 0) {
      futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    } else {
      futureValueContributions = monthlyContribution * months
    }

    // Total projected savings at retirement
    const totalProjectedSavings = futureValueCurrentSavings + futureValueContributions

    // Calculate sustainable monthly withdrawal (4% rule adjusted for inflation)
    const annualWithdrawalRate = 0.04
    const monthlyWithdrawal = (totalProjectedSavings * annualWithdrawalRate) / 12

    // Calculate income gap
    const inflationAdjustedDesiredIncome = desiredMonthlyIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement)
    const gap = inflationAdjustedDesiredIncome - monthlyWithdrawal

    // Calculate additional savings needed to close the gap
    let additionalNeeded = 0
    if (gap > 0) {
      additionalNeeded = (gap * 12) / annualWithdrawalRate
    }

    setProjectedSavings(Math.round(totalProjectedSavings))
    setProjectedMonthlyIncome(Math.round(monthlyWithdrawal))
    setIncomeGap(Math.round(gap))
    setAdditionalSavingsNeeded(Math.round(additionalNeeded))
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    returnRate,
    inflationRate,
    desiredMonthlyIncome,
    lifeExpectancy,
  ])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Retirement Calculator</CardTitle>
          <CardDescription>
            Plan for your retirement by estimating how much you need to save and how much income you can expect.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <span className="text-sm text-muted-foreground">{currentAge} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="currentAge"
                    min={18}
                    max={70}
                    step={1}
                    value={[currentAge]}
                    onValueChange={(value) => setCurrentAge(value[0])}
                  />
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <span className="text-sm text-muted-foreground">{retirementAge} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="retirementAge"
                    min={currentAge + 1}
                    max={80}
                    step={1}
                    value={[retirementAge]}
                    onValueChange={(value) => setRetirementAge(value[0])}
                  />
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="currentSavings">Current Retirement Savings</Label>
                  <span className="text-sm text-muted-foreground">GH₵ {currentSavings.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="currentSavings"
                    min={0}
                    max={1000000}
                    step={5000}
                    value={[currentSavings]}
                    onValueChange={(value) => setCurrentSavings(value[0])}
                  />
                  <Input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
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
                    max={10000}
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
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="returnRate">Expected Annual Return (%)</Label>
                  <span className="text-sm text-muted-foreground">{returnRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="returnRate"
                    min={1}
                    max={15}
                    step={0.1}
                    value={[returnRate]}
                    onValueChange={(value) => setReturnRate(value[0])}
                  />
                  <Input
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <span className="text-sm text-muted-foreground">{inflationRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="inflationRate"
                    min={1}
                    max={10}
                    step={0.1}
                    value={[inflationRate]}
                    onValueChange={(value) => setInflationRate(value[0])}
                  />
                  <Input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="desiredMonthlyIncome">Desired Monthly Income</Label>
                  <span className="text-sm text-muted-foreground">GH₵ {desiredMonthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="desiredMonthlyIncome"
                    min={1000}
                    max={50000}
                    step={500}
                    value={[desiredMonthlyIncome]}
                    onValueChange={(value) => setDesiredMonthlyIncome(value[0])}
                  />
                  <Input
                    type="number"
                    value={desiredMonthlyIncome}
                    onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="lifeExpectancy">Life Expectancy</Label>
                  <span className="text-sm text-muted-foreground">{lifeExpectancy} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="lifeExpectancy"
                    min={retirementAge + 1}
                    max={100}
                    step={1}
                    value={[lifeExpectancy]}
                    onValueChange={(value) => setLifeExpectancy(value[0])}
                  />
                  <Input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retirement Projection</CardTitle>
          <CardDescription>
            Based on your inputs, here's what your retirement could look like at age {retirementAge}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-2">Projected Retirement Savings</h3>
                <p className="text-3xl font-bold">GH₵ {projectedSavings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Total savings at retirement age {retirementAge}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-2">Projected Monthly Income</h3>
                <p className="text-3xl font-bold">GH₵ {projectedMonthlyIncome.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Sustainable monthly withdrawal (4% rule)</p>
              </div>
            </div>

            <div className="space-y-4">
              {incomeGap > 0 ? (
                <>
                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                    <h3 className="font-medium mb-2">Monthly Income Gap</h3>
                    <p className="text-3xl font-bold">GH₵ {incomeGap.toLocaleString()}</p>
                    <p className="text-sm mt-1">Shortfall between desired and projected monthly income</p>
                  </div>

                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                    <h3 className="font-medium mb-2">Additional Savings Needed</h3>
                    <p className="text-3xl font-bold">GH₵ {additionalSavingsNeeded.toLocaleString()}</p>
                    <p className="text-sm mt-1">Extra amount needed at retirement to meet your income goal</p>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-lg bg-green-100 text-green-800">
                  <h3 className="font-medium mb-2">Retirement Goal Status</h3>
                  <p className="text-xl font-bold">On Track! 🎉</p>
                  <p className="text-sm mt-1">Your projected savings exceed your retirement income goals</p>
                </div>
              )}
            </div>
          </div>

          <Alert className="mt-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Retirement Planning Tips</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Start saving early to take advantage of compound interest</li>
                <li>Increase your contributions as your income grows</li>
                <li>Diversify your investments to manage risk</li>
                <li>Consider consulting with a financial advisor for personalized advice</li>
                <li>Review and adjust your retirement plan regularly</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
