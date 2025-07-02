
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyPaymentCalc = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPaymentCalc = monthlyPaymentCalc * numPayments;
    const totalInterestCalc = totalPaymentCalc - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mortgage Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly mortgage payments and see how different loan terms affect your costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-blue-600" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Home Price</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  {formatCurrency(loanAmount)}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  {formatCurrency(downPayment)} ({((downPayment / loanAmount) * 100).toFixed(1)}%)
                </div>
              </div>

              <div className="space-y-4">
                <Label>Interest Rate: {interestRate}%</Label>
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  max={15}
                  min={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <Label>Loan Term: {loanTerm} years</Label>
                <Slider
                  value={[loanTerm]}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  max={40}
                  min={5}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                key={monthlyPayment}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <div className="text-gray-600">Monthly Payment</div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Total Payment</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {formatCurrency(totalPayment)}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Percent className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm text-gray-600">Total Interest</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-2">Loan Amount</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(loanAmount - downPayment)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default MortgageCalculator;
