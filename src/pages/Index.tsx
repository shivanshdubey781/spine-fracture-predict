import React, { useState } from 'react';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionResult, type PredictionResult as PredictionResultType } from '@/components/PredictionResult';
import { toast } from '@/hooks/use-toast';
import medicalHero from '@/assets/medical-hero.jpg';

interface PatientData {
  age: string;
  gender: string;
  traumaLevel: string;
  neckPain: string;
  neurologicalDeficit: string;
  mechanismOfInjury: string;
  consciousnessLevel: string;
  motorWeakness: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResultType | null>(null);

  // Mock prediction function - in real app this would call your ML API
  const handlePredict = async (data: PatientData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock ML prediction logic based on risk factors
      const riskFactors = [];
      let riskScore = 0;
      
      // Age factor
      const age = parseInt(data.age);
      if (age > 65) {
        riskFactors.push('Advanced age (>65 years) increases fracture risk');
        riskScore += 25;
      } else if (age > 50) {
        riskFactors.push('Age >50 years moderately increases risk');
        riskScore += 15;
      }
      
      // Trauma level
      if (data.traumaLevel === 'high') {
        riskFactors.push('High-energy trauma mechanism');
        riskScore += 30;
      }
      
      // Pain severity
      if (data.neckPain === 'severe') {
        riskFactors.push('Severe neck pain indicates potential injury');
        riskScore += 20;
      } else if (data.neckPain === 'moderate') {
        riskScore += 10;
      }
      
      // Neurological findings
      if (data.neurologicalDeficit === 'present') {
        riskFactors.push('Neurological deficit suggests spinal cord involvement');
        riskScore += 35;
      }
      
      if (data.motorWeakness === 'present') {
        riskFactors.push('Motor weakness indicates nerve compression');
        riskScore += 25;
      }
      
      // Consciousness level
      if (data.consciousnessLevel === 'unconscious') {
        riskFactors.push('Altered consciousness complicates assessment');
        riskScore += 15;
      }
      
      // Determine risk level
      let riskLevel: 'high' | 'moderate' | 'low';
      let recommendations: string[];
      
      if (riskScore >= 60) {
        riskLevel = 'high';
        recommendations = [
          'Immediate imaging: CT scan of cervical spine recommended',
          'Maintain spinal immobilization until fracture is ruled out',
          'Consider MRI if CT is negative but high clinical suspicion',
          'Urgent neurosurgical consultation if neurological deficits present',
          'Frequent neurological monitoring every 15-30 minutes'
        ];
      } else if (riskScore >= 30) {
        riskLevel = 'moderate';
        recommendations = [
          'CT scan of cervical spine recommended for evaluation',
          'Clinical observation and reassessment in 2-4 hours',
          'Pain management with NSAIDs if no contraindications',
          'Consider soft cervical collar for comfort',
          'Patient education on warning signs to return immediately'
        ];
      } else {
        riskLevel = 'low';
        recommendations = [
          'Clinical observation may be sufficient',
          'X-rays can be considered based on clinical judgment',
          'Patient education on when to seek medical attention',
          'Pain management with acetaminophen or NSAIDs',
          'Follow-up in 24-48 hours if symptoms persist or worsen'
        ];
      }
      
      const result: PredictionResultType = {
        riskLevel,
        probability: Math.min(riskScore + Math.random() * 10, 95),
        confidence: 85 + Math.random() * 10,
        recommendations,
        riskFactors
      };
      
      setPredictionResult(result);
      
      toast({
        title: "Assessment Complete",
        description: `Fracture risk assessment: ${riskLevel.toUpperCase()} risk detected`,
      });
      
    } catch (error) {
      toast({
        title: "Assessment Error",
        description: "Unable to complete assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen medical-gradient">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${medicalHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 backdrop-blur-sm" />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Cervical Spine Fracture
              <span className="block text-3xl lg:text-5xl text-blue-100">
                Risk Assessment
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered tool for rapid cervical spine fracture risk evaluation in emergency and clinical settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {!predictionResult ? (
          <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        ) : (
          <PredictionResult result={predictionResult} onReset={handleReset} />
        )}
      </div>

      {/* Footer */}
      <footer className="glass-panel mx-4 mb-4 p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Medical AI Solutions © 2024 | For Educational and Research Purposes Only
        </p>
      </footer>
    </div>
  );
};

export default Index;
