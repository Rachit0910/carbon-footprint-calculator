import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Car, Plane, Home, Utensils } from "lucide-react";

export const EmissionCalculator = () => {
  const [carKm, setCarKm] = useState("");
  const [flightHours, setFlightHours] = useState("");
  const [electricity, setElectricity] = useState("");
  const [meatMeals, setMeatMeals] = useState("");
  const [totalEmissions, setTotalEmissions] = useState<number | null>(null);

  const calculateEmissions = () => {
    // Emission factors (kg CO2 per unit)
    const carEmissionFactor = 0.21; // kg CO2 per km
    const flightEmissionFactor = 90; // kg CO2 per hour
    const electricityEmissionFactor = 0.5; // kg CO2 per kWh
    const meatEmissionFactor = 2.5; // kg CO2 per meal

    const carEmissions = parseFloat(carKm || "0") * carEmissionFactor;
    const flightEmissions = parseFloat(flightHours || "0") * flightEmissionFactor;
    const electricityEmissions = parseFloat(electricity || "0") * electricityEmissionFactor;
    const meatEmissions = parseFloat(meatMeals || "0") * meatEmissionFactor;

    const total = carEmissions + flightEmissions + electricityEmissions + meatEmissions;
    setTotalEmissions(total);
  };

  const getAdvice = () => {
    if (totalEmissions === null) return null;

    const tips = [];
    if (parseFloat(carKm || "0") > 100) {
      tips.push("Consider using public transport or carpooling to reduce car emissions");
    }
    if (parseFloat(flightHours || "0") > 5) {
      tips.push("Try to minimize air travel or choose direct flights when possible");
    }
    if (parseFloat(electricity || "0") > 200) {
      tips.push("Switch to energy-efficient appliances and LED bulbs");
    }
    if (parseFloat(meatMeals || "0") > 10) {
      tips.push("Consider reducing meat consumption and trying more plant-based meals");
    }

    return tips;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Travel */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            Car Travel (km/month)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 500"
            value={carKm}
            onChange={(e) => setCarKm(e.target.value)}
          />
        </div>

        {/* Flight Travel */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-primary" />
            Flight Hours (per year)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 10"
            value={flightHours}
            onChange={(e) => setFlightHours(e.target.value)}
          />
        </div>

        {/* Electricity */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            Electricity (kWh/month)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 300"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
          />
        </div>

        {/* Meat Meals */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-primary" />
            Meat Meals (per week)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 7"
            value={meatMeals}
            onChange={(e) => setMeatMeals(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculateEmissions} className="w-full">
        Calculate Emissions
      </Button>

      {totalEmissions !== null && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-primary mb-2">
              Total Monthly Emissions
            </h3>
            <p className="text-4xl font-bold text-foreground">
              {totalEmissions.toFixed(2)} kg CO₂
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              That's {(totalEmissions / 1000).toFixed(2)} tonnes per year
            </p>
          </div>

          {getAdvice() && getAdvice()!.length > 0 && (
            <div className="space-y-2 mt-4">
              <h4 className="font-semibold text-foreground">How to Reduce:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {getAdvice()!.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
