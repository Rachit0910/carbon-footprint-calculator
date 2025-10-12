import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const EmissionCalculator = () => {
  const [scenario, setScenario] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ emissions: number; tips: string[] } | null>(null);

  const calculateEmissions = async () => {
    if (!scenario || !value) {
      toast.error("Please select a scenario and enter a value");
      return;
    }

    setLoading(true);
    try {
      // Simulation of calculation (will be replaced with actual backend call)
      const emissions = calculateEmissionsLocal(scenario, parseFloat(value));
      const tips = getTips(scenario, emissions);
      
      setResult({ emissions, tips });
      toast.success("Emissions calculated successfully!");
    } catch (error) {
      toast.error("Failed to calculate emissions");
    } finally {
      setLoading(false);
    }
  };

  const calculateEmissionsLocal = (scenario: string, value: number): number => {
    const EMISSION_FACTORS = {
      travel: 0.12, // kg CO2 per km
      electricity: 0.92, // kg CO2 per kWh
      flight: 90, // kg CO2 per flight hour
    };

    switch (scenario) {
      case "travel":
        return value * EMISSION_FACTORS.travel;
      case "electricity":
        return value * EMISSION_FACTORS.electricity;
      case "flight":
        return value * EMISSION_FACTORS.flight;
      default:
        return 0;
    }
  };

  const getTips = (scenario: string, emissions: number): string[] => {
    const baseTips: Record<string, string[]> = {
      travel: [
        "Use public transport, carpool, or switch to a fuel-efficient vehicle",
        "Consider cycling or walking for short distances",
        "Plan combined trips to reduce overall mileage",
      ],
      electricity: [
        "Turn off unused appliances and switch to LED bulbs",
        "Consider renewable electricity sources",
        "Use energy-efficient appliances",
      ],
      flight: [
        "Consider train travel for short distances",
        "Offset your flights with carbon credits",
        "Reduce flight frequency when possible",
      ],
    };

    const tips = baseTips[scenario] || [];
    
    if (emissions > 100) {
      tips.unshift("⚠️ Your emissions are high - try long-term behavior changes like reducing meat consumption");
    } else if (emissions > 0) {
      tips.unshift("✅ Good job - small steps add up! Keep track of your monthly footprint");
    }

    return tips;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="scenario">Select Activity</Label>
        <Select value={scenario} onValueChange={setScenario}>
          <SelectTrigger id="scenario">
            <SelectValue placeholder="Choose an activity..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="travel">Car Travel (km)</SelectItem>
            <SelectItem value="electricity">Electricity (kWh)</SelectItem>
            <SelectItem value="flight">Flight (hours)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">Enter Value</Label>
        <Input
          id="value"
          type="number"
          placeholder="Enter amount..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min="0"
          step="0.1"
        />
      </div>

      <Button
        onClick={calculateEmissions}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Calculate Emissions
          </>
        )}
      </Button>

      {result && (
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total CO2 Emissions</p>
              <p className="text-4xl font-bold text-primary">{result.emissions.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">kg CO2</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-sm">💡 Tips to Reduce:</p>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
