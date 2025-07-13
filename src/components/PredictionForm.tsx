import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, Activity, User, Zap } from 'lucide-react';

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

interface PredictionFormProps {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: '',
    gender: '',
    traumaLevel: '',
    neckPain: '',
    neurologicalDeficit: '',
    mechanismOfInjury: '',
    consciousnessLevel: '',
    motorWeakness: ''
  });

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <Card className="glass-panel w-full max-w-4xl mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
          <Activity className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl lg:text-3xl font-semibold text-foreground">
          Cervical Spine Fracture Assessment
        </CardTitle>
        <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
          Enter patient clinical data for AI-powered cervical spine fracture risk assessment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Demographics */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Patient Demographics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="glass-input"
                  min="0"
                  max="120"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Clinical Assessment */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Clinical Assessment</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Trauma Level</Label>
                <RadioGroup 
                  value={formData.traumaLevel} 
                  onValueChange={(value) => handleInputChange('traumaLevel', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="trauma-high" />
                    <Label htmlFor="trauma-high">High Energy (MVA, Fall &gt;3ft)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="trauma-low" />
                    <Label htmlFor="trauma-low">Low Energy (Minor fall, Sports)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Neck Pain</Label>
                <RadioGroup 
                  value={formData.neckPain} 
                  onValueChange={(value) => handleInputChange('neckPain', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="pain-severe" />
                    <Label htmlFor="pain-severe">Severe (7-10/10)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="pain-moderate" />
                    <Label htmlFor="pain-moderate">Moderate (4-6/10)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="pain-mild" />
                    <Label htmlFor="pain-mild">Mild (1-3/10)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="pain-none" />
                    <Label htmlFor="pain-none">No Pain</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Neurological Assessment */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Neurological Assessment</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Neurological Deficit</Label>
                <RadioGroup 
                  value={formData.neurologicalDeficit} 
                  onValueChange={(value) => handleInputChange('neurologicalDeficit', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="neuro-present" />
                    <Label htmlFor="neuro-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="neuro-absent" />
                    <Label htmlFor="neuro-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Motor Weakness</Label>
                <RadioGroup 
                  value={formData.motorWeakness} 
                  onValueChange={(value) => handleInputChange('motorWeakness', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="motor-present" />
                    <Label htmlFor="motor-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="motor-absent" />
                    <Label htmlFor="motor-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Additional Factors */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-medium mb-4">Additional Clinical Factors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mechanism of Injury</Label>
                <Select value={formData.mechanismOfInjury} onValueChange={(value) => handleInputChange('mechanismOfInjury', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select mechanism" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mva">Motor Vehicle Accident</SelectItem>
                    <SelectItem value="fall">Fall from Height</SelectItem>
                    <SelectItem value="sports">Sports Injury</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Consciousness Level</Label>
                <Select value={formData.consciousnessLevel} onValueChange={(value) => handleInputChange('consciousnessLevel', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select consciousness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alert">Alert and Oriented</SelectItem>
                    <SelectItem value="confused">Confused</SelectItem>
                    <SelectItem value="drowsy">Drowsy</SelectItem>
                    <SelectItem value="unconscious">Unconscious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={!isFormValid || isLoading}
            className="glass-button w-full py-6 text-lg font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </div>
            ) : (
              'Assess Fracture Risk'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};