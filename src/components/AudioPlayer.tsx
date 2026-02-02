import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2, VolumeX, FastForward } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
  autoPlay?: boolean;
}

export function AudioPlayer({ src, title, onClose, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      if (autoPlay) {
        audioRef.current.play().catch(e => console.error("Autoplay failed", e));
      }
    }
  }, [autoPlay, src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (autoPlay) setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIndex];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-primary/20 shadow-lg z-50 animate-in slide-in-from-bottom-full duration-300">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted cursor-pointer relative group">
        <div 
          className="absolute h-full bg-primary/50" 
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        {/* Info & Controls */}
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full border border-primary/20 hover:bg-primary/10 hover:text-primary"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
          
          <div className="flex flex-col min-w-0">
            <h3 className="font-serif font-bold text-sm md:text-base truncate pr-2 text-primary">{title}</h3>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Speed Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex text-xs font-mono w-16"
            onClick={changeSpeed}
          >
            {playbackRate}x
          </Button>

          {/* Volume */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex text-muted-foreground hover:text-foreground"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          {/* Close */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-destructive/10 hover:text-destructive"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
