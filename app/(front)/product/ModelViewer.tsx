'use client'
import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

type ModelViewerProps = {
  modelLink: string;
};

export default function ModelViewer({ modelLink }: ModelViewerProps) {
  const modelViewerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (modelViewer) {
      modelViewer.addEventListener('load', handleLoad);
    }

    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleLoad);
      }
    };
  }, [modelLink]);

  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500" />
        </div>
      )}
      
      <model-viewer
        ref={modelViewerRef}
        src={modelLink}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}