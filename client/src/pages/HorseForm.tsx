import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Save, Loader2, Camera, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const disciplines = [
  "Dressage",
  "Show Jumping",
  "Eventing",
  "Western",
  "Endurance",
  "Polo",
  "Racing",
  "Trail Riding",
  "Driving",
  "Other"
];

const levels = [
  "Beginner",
  "Novice",
  "Intermediate",
  "Advanced",
  "Competition",
  "Professional"
];

function HorseFormContent() {
  const params = useParams<{ id?: string }>();
  const [, navigate] = useLocation();
  const isEditing = params.id && params.id !== "new";
  const horseId = isEditing ? parseInt(params.id!) : null;

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    color: "",
    gender: "" as "" | "stallion" | "mare" | "gelding",
    discipline: "",
    level: "",
    registrationNumber: "",
    microchipNumber: "",
    notes: "",
    photoUrl: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: horse, isLoading: horseLoading } = trpc.horses.get.useQuery(
    { id: horseId! },
    { enabled: !!horseId }
  );

  const createMutation = trpc.horses.create.useMutation({
    onSuccess: (data) => {
      toast.success("Horse added successfully!");
      navigate(`/horses/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add horse");
    },
  });

  const updateMutation = trpc.horses.update.useMutation({
    onSuccess: () => {
      toast.success("Horse updated successfully!");
      navigate(`/horses/${horseId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update horse");
    },
  });

  const uploadPhotoMutation = trpc.horses.uploadPhoto.useMutation({
    onSuccess: (data) => {
      toast.success("Photo uploaded successfully!");
      setFormData({ ...formData, photoUrl: data.url });
      setPhotoPreview(data.url);
      setPhotoFile(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload photo");
      setUploadingPhoto(false);
    },
  });

  useEffect(() => {
    if (horse) {
      setFormData({
        name: horse.name || "",
        breed: horse.breed || "",
        age: horse.age?.toString() || "",
        dateOfBirth: horse.dateOfBirth ? new Date(horse.dateOfBirth).toISOString().split('T')[0] : "",
        height: horse.height?.toString() || "",
        weight: horse.weight?.toString() || "",
        color: horse.color || "",
        gender: (horse.gender as "" | "stallion" | "mare" | "gelding") || "",
        discipline: horse.discipline || "",
        level: horse.level || "",
        registrationNumber: horse.registrationNumber || "",
        microchipNumber: horse.microchipNumber || "",
        notes: horse.notes || "",
        photoUrl: horse.photoUrl || "",
      });
      if (horse.photoUrl) {
        setPhotoPreview(horse.photoUrl);
      }
    }
  }, [horse]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file (JPG, PNG, WebP)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo must be less than 5MB");
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    setFormData({ ...formData, photoUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter a name for your horse");
      return;
    }

    const data = {
      name: formData.name,
      breed: formData.breed || undefined,
      age: formData.age ? parseInt(formData.age) : undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      height: formData.height ? parseInt(formData.height) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      color: formData.color || undefined,
      gender: formData.gender || undefined,
      discipline: formData.discipline || undefined,
      level: formData.level || undefined,
      registrationNumber: formData.registrationNumber || undefined,
      microchipNumber: formData.microchipNumber || undefined,
      notes: formData.notes || undefined,
      photoUrl: formData.photoUrl || undefined,
    };

    // If there's a photo file to upload
    if (photoFile) {
      setUploadingPhoto(true);
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = (reader.result as string).split(',')[1];
          
          // Upload photo first
          let photoUrl = formData.photoUrl;
          if (isEditing && horseId) {
            const uploadResult = await uploadPhotoMutation.mutateAsync({
              horseId,
              fileName: photoFile.name,
              fileData: base64,
              fileType: photoFile.type,
              fileSize: photoFile.size,
            });
            photoUrl = uploadResult.url;
            setUploadingPhoto(false);
          } else {
            // For new horses, we need to create the horse first, then upload photo
            try {
              const createResult = await createMutation.mutateAsync(data);
              if (createResult.id) {
                try {
                  await uploadPhotoMutation.mutateAsync({
                    horseId: createResult.id,
                    fileName: photoFile.name,
                    fileData: base64,
                    fileType: photoFile.type,
                    fileSize: photoFile.size,
                  });
                  toast.success("Horse created and photo uploaded!");
                } catch (uploadError) {
                  toast.warning("Horse created, but photo upload failed. You can add a photo by editing the horse.");
                  navigate(`/horses/${createResult.id}`);
                }
              }
              setUploadingPhoto(false);
              return;
            } catch (createError) {
              setUploadingPhoto(false);
              throw createError;
            }
          }
          
          // Update horse with photo URL
          if (isEditing && horseId) {
            updateMutation.mutate({ id: horseId, ...data, photoUrl });
          }
        };
        reader.readAsDataURL(photoFile);
      } catch (error) {
        toast.error("Failed to upload photo");
        setUploadingPhoto(false);
      }
    } else {
      // No photo to upload, just save the horse
      if (isEditing && horseId) {
        updateMutation.mutate({ id: horseId, ...data });
      } else {
        createMutation.mutate(data);
      }
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending || uploadingPhoto;

  if (horseLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/horses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {isEditing ? "Edit Horse" : "Add New Horse"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Update your horse's information" : "Enter details about your equine companion"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your horse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter horse's name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="e.g., Thoroughbred, Arabian"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Age"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stallion">Stallion</SelectItem>
                    <SelectItem value="mare">Mare</SelectItem>
                    <SelectItem value="gelding">Gelding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  max="250"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="Height in cm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  max="1500"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="Weight in kg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g., Bay, Chestnut"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Training & Discipline</CardTitle>
            <CardDescription>Your horse's specialty and skill level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discipline">Discipline</Label>
                <Select
                  value={formData.discipline}
                  onValueChange={(value) => setFormData({ ...formData, discipline: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplines.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Identification</CardTitle>
            <CardDescription>Registration and identification numbers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="Passport/registration number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="microchipNumber">Microchip Number</Label>
                <Input
                  id="microchipNumber"
                  value={formData.microchipNumber}
                  onChange={(e) => setFormData({ ...formData, microchipNumber: e.target.value })}
                  placeholder="Microchip ID"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Photo and notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Horse Photo</Label>
              <div className="flex flex-col gap-3">
                {photoPreview ? (
                  <div className="relative w-full max-w-sm">
                    <img 
                      src={photoPreview} 
                      alt="Horse preview" 
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleRemovePhoto}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="w-full max-w-sm h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload a photo</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP (max 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handlePhotoSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional notes about your horse..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/horses">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update Horse" : "Add Horse"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function HorseForm() {
  return (
    <DashboardLayout>
      <HorseFormContent />
    </DashboardLayout>
  );
}
