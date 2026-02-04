import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Sun,
  CloudRain,
  Loader2,
  MapPin,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

const UK_CITIES = [
  "London", "Birmingham", "Manchester", "Liverpool", "Leeds",
  "Sheffield", "Bristol", "Newcastle upon Tyne", "Nottingham", "Leicester",
  "Coventry", "Bradford", "Cardiff", "Belfast", "Edinburgh",
  "Glasgow", "Cambridge", "Oxford", "Brighton", "Portsmouth",
  "Southampton", "Reading", "Derby", "Plymouth", "Wolverhampton",
  "Stoke-on-Trent", "Preston", "York", "Chester", "Bath"
];

function WeatherContent() {
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [weatherData, setWeatherData] = useState({
    temperature: 15,
    humidity: 60,
    windSpeed: 10,
    precipitation: 0,
    conditions: "partly cloudy",
    uvIndex: 4,
    visibility: 10,
  });

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setSelectedLocation("");
    
    if (value.length > 1) {
      const filtered = UK_CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6);
      setLocationSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (city: string) => {
    setLocation(city);
    setSelectedLocation(city);
    setShowSuggestions(false);
  };

  const { data: latestWeather, isLoading: weatherLoading } = trpc.weather.getLatest.useQuery();
  const { data: weatherHistory } = trpc.weather.getHistory.useQuery({ limit: 5 });
  
  const analyzeMutation = trpc.weather.analyze.useMutation({
    onSuccess: (data) => {
      toast.success("Weather analysis complete!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to analyze weather");
    },
  });

  const handleAnalyze = () => {
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    
    analyzeMutation.mutate({
      location,
      ...weatherData,
    });
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'excellent':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'fair':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'poor':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'not_recommended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="w-5 h-5" />;
      case 'fair':
        return <AlertTriangle className="w-5 h-5" />;
      case 'poor':
      case 'not_recommended':
        return <XCircle className="w-5 h-5" />;
      default:
        return <CloudSun className="w-5 h-5" />;
    }
  };

  const getRidingCondition = () => {
    const { temperature, windSpeed, precipitation, visibility } = weatherData;
    
    if (precipitation > 5 || windSpeed > 40 || visibility < 2) {
      return { status: 'Poor', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    } else if (precipitation > 2 || windSpeed > 25 || temperature < 0 || temperature > 30) {
      return { status: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    } else {
      return { status: 'Good', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    }
  };

  const getSafetyRecommendations = () => {
    const { temperature, windSpeed, precipitation, uvIndex } = weatherData;
    const recommendations: string[] = [];

    if (temperature < 5) {
      recommendations.push("🧥 Cold weather - dress warmly and warm up gradually");
    }
    if (temperature > 25) {
      recommendations.push("☀️ Hot weather - ensure adequate hydration for horse and rider");
    }
    if (windSpeed > 30) {
      recommendations.push("💨 Strong winds - be cautious, horses may be more reactive");
    }
    if (precipitation > 0) {
      recommendations.push("☔ Wet conditions - surfaces may be slippery");
    }
    if (uvIndex > 6) {
      recommendations.push("🕶️ High UV - use sun protection");
    }
    if (recommendations.length === 0) {
      recommendations.push("✅ Excellent conditions for riding");
    }

    return recommendations;
  };

  const ridingCondition = getRidingCondition();
  const safetyRecommendations = getSafetyRecommendations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Weather Analysis</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered riding condition recommendations based on current weather
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weather Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Check Riding Conditions</CardTitle>
            <CardDescription>
              Enter current weather conditions for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location (UK)</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    selectedLocation ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <Input
                    ref={inputRef}
                    id="location"
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={() => {
                      if (locationSuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="Enter UK city (e.g., London, Manchester)"
                    className={`pl-10 ${selectedLocation ? 'border-primary' : ''}`}
                    autoComplete="off"
                  />
                  
                  {/* Autocomplete dropdown */}
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {locationSuggestions.map((city, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectLocation(city)}
                          className="w-full px-4 py-2.5 text-left hover:bg-muted transition-colors flex items-center gap-2 border-b last:border-b-0"
                        >
                          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {selectedLocation && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  Selected: {selectedLocation}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  value={weatherData.temperature}
                  onChange={(e) => setWeatherData({ ...weatherData, temperature: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Humidity (%)
                </Label>
                <Input
                  id="humidity"
                  type="number"
                  min="0"
                  max="100"
                  value={weatherData.humidity}
                  onChange={(e) => setWeatherData({ ...weatherData, humidity: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="windSpeed" className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  Wind (km/h)
                </Label>
                <Input
                  id="windSpeed"
                  type="number"
                  min="0"
                  value={weatherData.windSpeed}
                  onChange={(e) => setWeatherData({ ...weatherData, windSpeed: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precipitation" className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4" />
                  Rain (mm)
                </Label>
                <Input
                  id="precipitation"
                  type="number"
                  min="0"
                  value={weatherData.precipitation}
                  onChange={(e) => setWeatherData({ ...weatherData, precipitation: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="conditions" className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4" />
                  Conditions
                </Label>
                <Input
                  id="conditions"
                  value={weatherData.conditions}
                  onChange={(e) => setWeatherData({ ...weatherData, conditions: e.target.value })}
                  placeholder="e.g., sunny, cloudy, rainy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uvIndex" className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  UV Index
                </Label>
                <Input
                  id="uvIndex"
                  type="number"
                  min="0"
                  max="11"
                  value={weatherData.uvIndex}
                  onChange={(e) => setWeatherData({ ...weatherData, uvIndex: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Visibility (km)
                </Label>
                <Input
                  id="visibility"
                  type="number"
                  min="0"
                  value={weatherData.visibility}
                  onChange={(e) => setWeatherData({ ...weatherData, visibility: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={analyzeMutation.isPending}
              className="w-full"
              size="lg"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Analyze Riding Conditions
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Latest Result */}
        <div className="space-y-6">
          {/* Riding Condition Indicator */}
          <Card>
            <CardHeader>
              <CardTitle>Riding Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border ${ridingCondition.bg} ${ridingCondition.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  {ridingCondition.status === 'Good' ? (
                    <CheckCircle className={`w-6 h-6 ${ridingCondition.color}`} />
                  ) : ridingCondition.status === 'Fair' ? (
                    <AlertTriangle className={`w-6 h-6 ${ridingCondition.color}`} />
                  ) : (
                    <XCircle className={`w-6 h-6 ${ridingCondition.color}`} />
                  )}
                  <span className={`font-bold text-lg ${ridingCondition.color}`}>
                    {ridingCondition.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {safetyRecommendations.map((rec, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">{rec}</p>
                  ))}
                </div>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Thermometer className="w-3 h-3" />
                    <span>Temp</span>
                  </div>
                  <p className="font-semibold">{weatherData.temperature}°C</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Wind className="w-3 h-3" />
                    <span>Wind</span>
                  </div>
                  <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Droplets className="w-3 h-3" />
                    <span>Humidity</span>
                  </div>
                  <p className="font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <CloudRain className="w-3 h-3" />
                    <span>Rain</span>
                  </div>
                  <p className="font-semibold">{weatherData.precipitation} mm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Result */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {analyzeMutation.data ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${getRecommendationColor(analyzeMutation.data.recommendation)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {getRecommendationIcon(analyzeMutation.data.recommendation)}
                      <span className="font-semibold capitalize text-lg">
                        {analyzeMutation.data.recommendation.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {analyzeMutation.data.analysis && (
                    <div className="prose prose-sm max-w-none">
                      <Streamdown>{analyzeMutation.data.analysis}</Streamdown>
                    </div>
                  )}
                </div>
              ) : latestWeather ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${getRecommendationColor(latestWeather.ridingRecommendation || 'fair')}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {getRecommendationIcon(latestWeather.ridingRecommendation || 'fair')}
                      <span className="font-semibold capitalize text-lg">
                        {(latestWeather.ridingRecommendation || 'fair').replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">
                      Last checked: {new Date(latestWeather.checkedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CloudSun className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter weather conditions and click analyze
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Checks</CardTitle>
            </CardHeader>
            <CardContent>
              {!weatherHistory || weatherHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No weather history yet
                </p>
              ) : (
                <div className="space-y-2">
                  {weatherHistory.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-sm font-medium">{log.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.checkedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className={`capitalize ${getRecommendationColor(log.ridingRecommendation || 'fair')}`}>
                        {(log.ridingRecommendation || 'fair').replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Weather() {
  return (
    <DashboardLayout>
      <WeatherContent />
    </DashboardLayout>
  );
}
