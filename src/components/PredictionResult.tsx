import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

export interface PredictionResult {
  riskLevel: 'high' | 'moderate' | 'low';
  probability: number;
  confidence: number;
  recommendations: string[];
  riskFactors: string[];
}

interface PredictionResultProps {
  result: PredictionResult | null;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ result, onReset }) => {
  if (!result) return null;

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'high':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'moderate':
        return <TrendingUp className="h-8 w-8 text-amber-500" />;
      case 'low':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
  };

  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getRiskText = () => {
    switch (result.riskLevel) {
      case 'high':
        return 'High Risk';
      case 'moderate':
        return 'Moderate Risk';
      case 'low':
        return 'Low Risk';
    }
  };

  return (
    <Card className="glass-panel w-full max-w-4xl mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
          {getRiskIcon()}
        </div>
        <CardTitle className="text-2xl lg:text-3xl font-semibold">
          Assessment Complete
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          AI-powered cervical spine fracture risk analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Risk Level Display */}
        <div className={`glass-panel p-6 border-2 ${getRiskColor()}`}>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">{getRiskText()}</h3>
            <div className="text-4xl font-bold">
              {result.probability.toFixed(1)}%
            </div>
            <p className="text-sm opacity-80">
              Fracture Risk Probability
            </p>
            <div className="text-sm">
              Model Confidence: {result.confidence.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        {result.riskFactors.length > 0 && (
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              Contributing Risk Factors
            </h4>
            <ul className="space-y-2">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Clinical Recommendations */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Clinical Recommendations
          </h4>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notice */}
        <div className="glass-panel p-6 bg-amber-50/50 border-amber-200 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h4 className="font-semibold text-amber-800">Important Medical Notice</h4>
          </div>
          <p className="text-sm text-amber-700 leading-relaxed">
            This AI assessment is for educational and supportive purposes only. It should not replace 
            professional medical judgment or clinical decision-making. Always consult with qualified 
            healthcare professionals for definitive diagnosis and treatment decisions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={onReset}
            variant="outline"
            className="glass-input flex items-center gap-2 py-3"
          >
            <RotateCcw className="h-4 w-4" />
            New Assessment
          </Button>
          <Button 
            onClick={() => window.print()}
            className="glass-button flex items-center gap-2 py-3"
          >
            Print Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};