import React, { useState, useRef, useEffect } from 'react';
import { SAMPLE_DISHES, SampleDish } from '../data/sampleDishes';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeCustomImage: (base64: string, mimeType: string, userNote?: string) => void;
  onSelectSampleDish: (dish: SampleDish) => void;
  isAnalyzing: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeCustomImage,
  onSelectSampleDish,
  isAnalyzing,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'samples'>('samples');
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [userNote, setUserNote] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera when tab changes or modal closes
  useEffect(() => {
    if (activeTab !== 'camera' || !isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    } else if (activeTab === 'camera' && isOpen) {
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [activeTab, isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access webcam or camera stream. Please check permissions or upload a file.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setPreviewUrl(dataUrl);
    setSelectedFileBase64(dataUrl);
    setSelectedMimeType('image/jpeg');
    setActiveTab('upload');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WEBP).');
      return;
    }
    setSelectedMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setPreviewUrl(res);
      setSelectedFileBase64(res);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyzeUploaded = () => {
    if (!selectedFileBase64) return;
    onAnalyzeCustomImage(selectedFileBase64, selectedMimeType, userNote);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Select Food for Deep Learning Recognition</h3>
              <p className="text-[11px] text-slate-400">
                Multi-item segmentation, portion sizing &amp; calorie estimation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('samples')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'samples'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Benchmark Meals (Instant)</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('camera')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'camera'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Live Camera</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Tab 1: Benchmark Samples */}
          {activeTab === 'samples' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Choose any high-definition culinary benchmark platter below to run instantaneous deep learning inference and spatial feature extraction:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SAMPLE_DISHES.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => onSelectSampleDish(dish)}
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 transition-all hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 right-2 rounded-lg bg-slate-950/80 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-400 backdrop-blur-md border border-slate-800">
                        ~{dish.estimatedCalories} kcal
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {dish.name}
                      </h4>
                      <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                        {dish.subtitle}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-400">
                        {dish.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-slate-800/80 px-1.5 py-0.5 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Upload Photo */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {!previewUrl ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400 mb-3 border border-slate-700">
                    <Upload className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    Drop your meal photograph here
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    or click to browse from your device (JPG, PNG, WEBP)
                  </p>
                  <span className="mt-3 text-[10px] text-slate-500 font-mono">
                    High resolution plate photos yield best bounding box accuracy
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    <img
                      src={previewUrl}
                      alt="Uploaded food preview"
                      className="h-full w-full object-contain"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFileBase64(null);
                      }}
                      className="absolute top-2 right-2 rounded-lg bg-slate-950/80 p-1.5 text-slate-400 hover:text-white backdrop-blur-md"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Optional user note / culinary hint */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Optional context or portion note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sugar-free dressing, double chicken, extra rice"
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAnalyzeUploaded}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Running Deep Learning Vision Pipeline...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Analyze &amp; Estimate Calories</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Live Camera */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              {cameraError ? (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                  <div>
                    <p className="font-semibold text-rose-200">Camera Access Notice</p>
                    <p className="mt-1">{cameraError}</p>
                    <button
                      onClick={startCamera}
                      className="mt-3 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-700"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover"
                    />

                    {/* Target reticle */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-48 w-48 rounded-full border border-dashed border-emerald-400/50" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={capturePhoto}
                      className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Snap Food Photograph</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
