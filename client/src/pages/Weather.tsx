import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

function WeatherContent() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: 15,
    humidity: 60,
    windSpeed: 10,
    precipitation: 0,
    conditions: "partly cloudy",
    uvIndex: 4,
    visibility: 10,
  });

  // New Open-Meteo endpoints
  const {
    data: currentWeather,
    isLoading: currentLoading,
    refetch: refetchCurrent,
  } = trpc.weather.getCurrent.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: forecast, isLoading: forecastLoading } =
    trpc.weather.getForecast.useQuery(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
    });

  const { data: latestWeather, isLoading: weatherLoading } =
    trpc.weather.getLatest.useQuery();
  const { data: weatherHistory } = trpc.weather.getHistory.useQuery({
    limit: 5,
  });

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
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "poor":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "not_recommended":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "excellent":
      case "good":
        return <CheckCircle className="w-5 h-5" />;
      case "fair":
        return <AlertTriangle className="w-5 h-5" />;
      case "poor":
      case "not_recommended":
        return <XCircle className="w-5 h-5" />;
      default:
        return <CloudSun className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Weather & Riding Conditions
        </h1>
        <p className="text-muted-foreground mt-1">
          Real-time weather data with intelligent riding recommendations
        </p>
      </div>

      {/* Current Weather Card */}
      {currentLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </CardContent>
        </Card>
      ) : currentWeather ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-6 h-6" />
                Current Conditions
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetchCurrent()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Weather Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Thermometer className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Wind className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.windSpeed} km/h
                </div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.precipitation} mm
                </div>
                <div className="text-sm text-muted-foreground">
                  Precipitation
                </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-500 mb-2" />
                <div className="text-2xl font-bold">
                  {currentWeather.weather.humidity}%
                </div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
            </div>

            {/* Riding Advice */}
            <div
              className={`p-4 rounded-lg border-2 ${getRecommendationColor(currentWeather.advice.level)}`}
            >
              <div className="flex items-start gap-3">
                {getRecommendationIcon(currentWeather.advice.level)}
                <div className="flex-1">
                  <div className="font-semibold text-lg capitalize mb-2">
                    {currentWeather.advice.level} Riding Conditions
                  </div>
                  <p className="text-sm mb-3">
                    {currentWeather.advice.message}
                  </p>
                  {currentWeather.advice.warnings.length > 0 && (
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Warnings:</div>
                      {currentWeather.advice.warnings.map((warning, i) => (
                        <div
                          key={i}
                          className="text-sm flex items-center gap-2"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Condition: {currentWeather.weather.condition} • Last updated:{" "}
              {new Date(currentWeather.weather.timestamp).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-3">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Please set your location in Settings to see current weather
                conditions
              </p>
              <Button onClick={() => (window.location.href = "/settings")}>
                Go to Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 7-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {forecast.map((day, i) => (
                <div key={i} className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <CloudSun className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-semibold">{day.tempMax}°</div>
                  <div className="text-xs text-muted-foreground">
                    {day.tempMin}°
                  </div>
                  <div className="text-xs mt-1">{day.condition}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location (e.g., London, UK)"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="temperature"
                  className="flex items-center gap-2"
                >
                  <Thermometer className="w-4 h-4" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  value={weatherData.temperature}
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      temperature: parseInt(e.target.value) || 0,
                    })
                  }
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
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      humidity: parseInt(e.target.value) || 0,
                    })
                  }
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
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      windSpeed: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="precipitation"
                  className="flex items-center gap-2"
                >
                  <CloudRain className="w-4 h-4" />
                  Rain (mm)
                </Label>
                <Input
                  id="precipitation"
                  type="number"
                  min="0"
                  value={weatherData.precipitation}
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      precipitation: parseInt(e.target.value) || 0,
                    })
                  }
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
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      conditions: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      uvIndex: parseInt(e.target.value) || 0,
                    })
                  }
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
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      visibility: parseInt(e.target.value) || 0,
                    })
                  }
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
          <Card>
            <CardHeader>
              <CardTitle>Current Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              {analyzeMutation.data ? (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg border ${getRecommendationColor(analyzeMutation.data.recommendation)}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getRecommendationIcon(
                        analyzeMutation.data.recommendation,
                      )}
                      <span className="font-semibold capitalize text-lg">
                        {analyzeMutation.data.recommendation.replace("_", " ")}
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
                  <div
                    className={`p-4 rounded-lg border ${getRecommendationColor(latestWeather.ridingRecommendation || "fair")}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getRecommendationIcon(
                        latestWeather.ridingRecommendation || "fair",
                      )}
                      <span className="font-semibold capitalize text-lg">
                        {(latestWeather.ridingRecommendation || "fair").replace(
                          "_",
                          " ",
                        )}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">
                      Last checked:{" "}
                      {new Date(latestWeather.checkedAt).toLocaleString()}
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
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                    >
                      <div>
                        <p className="text-sm font-medium">{log.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.checkedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`capitalize ${getRecommendationColor(log.ridingRecommendation || "fair")}`}
                      >
                        {(log.ridingRecommendation || "fair").replace("_", " ")}
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
