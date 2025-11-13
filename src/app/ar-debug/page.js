'use client';

import { useState, useEffect, useRef } from 'react';

export default function ARDebugPage() {
  const [arSupported, setArSupported] = useState(false);
  const [planeDetectionSupported, setPlaneDetectionSupported] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  const [logs, setLogs] = useState([]);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const xrSessionRef = useRef(null);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  // Check WebXR support
  useEffect(() => {
    const checkSupport = async () => {
      addLog('Starting WebXR support check...');
      setStatusMessage('Checking WebXR support...');

      if (!navigator.xr) {
        addLog('❌ navigator.xr not available');
        setStatusMessage('WebXR not available');
        setArSupported(false);
        return;
      }

      addLog('✅ navigator.xr is available');

      try {
        // Check basic AR support
        const basicSupported = await navigator.xr.isSessionSupported('immersive-ar');
        addLog(`Basic immersive-ar support: ${basicSupported}`);
        setArSupported(basicSupported);

        // Check plane-detection support
        if (basicSupported) {
          try {
            const planeSupported = await navigator.xr.isSessionSupported('immersive-ar');
            addLog(`Plane-detection support check: ${planeSupported}`);
            setPlaneDetectionSupported(planeSupported);
            setStatusMessage(planeSupported ? 'WebXR with plane-detection supported!' : 'WebXR supported but plane-detection unknown');
          } catch (e) {
            addLog(`Error checking plane-detection: ${e.message}`);
            setPlaneDetectionSupported(false);
          }
        }

      } catch (e) {
        addLog(`❌ Error checking WebXR support: ${e.message}`);
        setArSupported(false);
        setStatusMessage('Error checking WebXR support');
      }
    };

    checkSupport();
  }, []);

  // Initialize Three.js
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const init = async () => {
      try {
        addLog('Loading Three.js...');
        const THREE = await import('three');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;

        // Add basic lighting
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbbb, 1);
        scene.add(light);

        rendererRef.current = { THREE, renderer, scene, camera };

        renderer.setAnimationLoop((timestamp, frame) => {
          renderer.render(scene, camera);
        });

        addLog('✅ Three.js initialized successfully');
        setStatusMessage('Ready for AR debugging');

      } catch (error) {
        addLog(`❌ Error initializing Three.js: ${error.message}`);
        setStatusMessage('Error initializing 3D engine');
      }
    };

    init();

    return () => {
      if (rendererRef.current?.renderer) {
        rendererRef.current.renderer.setAnimationLoop(null);
      }
    };
  }, []);

  // Start AR session with plane-detection
  const startARDebugSession = async () => {
    if (!rendererRef.current) {
      addLog('❌ Renderer not ready');
      alert('System not ready. Please wait...');
      return;
    }

    if (!arSupported) {
      addLog('❌ AR not supported on this device');
      alert('WebXR AR is not supported on this device');
      return;
    }

    try {
      addLog('🚀 Attempting to start AR session with plane-detection...');
      setStatusMessage('Starting AR session...');

      // Request session with plane-detection as required feature
      const sessionOptions = {
        requiredFeatures: ['plane-detection'],
        optionalFeatures: ['dom-overlay', 'hit-test'],
      };

      addLog(`Session options: ${JSON.stringify(sessionOptions)}`);

      const session = await navigator.xr.requestSession('immersive-ar', sessionOptions);
      
      addLog('✅ AR session created successfully with plane-detection!');
      xrSessionRef.current = session;

      await rendererRef.current.renderer.xr.setSession(session);
      
      setSessionActive(true);
      setStatusMessage('AR Session Active');
      addLog('✅ Session set on renderer');

      // Log session details
      addLog(`Session mode: ${session.mode}`);
      addLog(`Session supported features: ${session.enabledFeatures ? Array.from(session.enabledFeatures).join(', ') : 'N/A'}`);

      // Handle session end
      session.addEventListener('end', () => {
        addLog('AR session ended');
        setSessionActive(false);
        setStatusMessage('AR session ended');
        xrSessionRef.current = null;
      });

    } catch (error) {
      addLog(`❌ AR Session Error: ${error.name} - ${error.message}`);
      
      let errorMsg = `Error: ${error.name}\n${error.message}`;

      if (error.name === 'NotSupportedError') {
        errorMsg = '❌ WebXR with plane-detection not supported.\n\nPossible reasons:\n1. Device does not support ARCore\n2. Browser needs update\n3. Plane-detection feature not available';
        addLog('Plane-detection is likely not supported on this device/browser');
      } else if (error.name === 'NotAllowedError') {
        errorMsg = '❌ Permission denied.\n\nPlease allow camera permission and try again.';
        addLog('User denied camera permission');
      } else if (error.name === 'SecurityError') {
        errorMsg = '❌ Security error.\n\nMust be accessed via HTTPS (not HTTP).';
        addLog('Security error - check HTTPS connection');
      }

      alert(errorMsg);
      setStatusMessage(`Error: ${error.name}`);
    }
  };

  const endARSession = () => {
    if (xrSessionRef.current) {
      addLog('Ending AR session manually...');
      xrSessionRef.current.end();
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F5F2'}}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: sessionActive ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: sessionActive ? 'block' : 'none',
          zIndex: 0
        }}
      />

      {/* UI Overlay */}
      {!sessionActive && (
        <>
          <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b" style={{backgroundColor: 'rgba(248, 245, 242, 0.95)', borderColor: '#D4A373'}}>
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold" style={{color: '#473C8B'}}>WebXR Debug Console</h1>
                </div>
                <div className="flex items-center gap-4">
                  <a href="/" className="text-sm font-medium transition" style={{color: '#473C8B'}}>
                    ← Home
                  </a>
                  <a href="/ar" className="text-sm font-medium transition" style={{color: '#473C8B'}}>
                    AR Page
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold" style={{color: '#1B1B1E'}}>
                  WebXR Plane Detection Debug
                </h2>
                <div className="text-sm px-4 py-2 rounded-lg inline-block" style={{
                  backgroundColor: arSupported ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                  color: arSupported ? '#4CAF50' : '#FF9800'
                }}>
                  {statusMessage}
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{arSupported ? '✅' : '❌'}</div>
                  <div className="font-bold" style={{color: '#473C8B'}}>Basic AR Support</div>
                  <div className="text-sm text-gray-600">{arSupported ? 'Supported' : 'Not Supported'}</div>
                </div>

                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{planeDetectionSupported ? '✅' : '❓'}</div>
                  <div className="font-bold" style={{color: '#473C8B'}}>Plane Detection</div>
                  <div className="text-sm text-gray-600">{planeDetectionSupported ? 'Available' : 'Unknown'}</div>
                </div>

                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{rendererRef.current ? '✅' : '⏳'}</div>
                  <div className="font-bold" style={{color: '#473C8B'}}>Three.js</div>
                  <div className="text-sm text-gray-600">{rendererRef.current ? 'Ready' : 'Loading'}</div>
                </div>
              </div>

              {/* Control Button */}
              <div className="rounded-3xl shadow-lg p-8 mb-8 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                <button
                  onClick={startARDebugSession}
                  disabled={!arSupported || !rendererRef.current}
                  className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#473C8B'
                  }}
                >
                  🔍 Start AR Debug Session
                </button>
                <p className="mt-4 text-sm" style={{color: '#473C8B'}}>
                  This will test WebXR with <strong>plane-detection</strong> as a required feature
                </p>
              </div>

              {/* Debug Info */}
              <div className="rounded-3xl p-6" style={{backgroundColor: 'rgba(71, 60, 139, 0.1)', border: '1px solid #473C8B'}}>
                <h3 className="font-bold text-lg mb-4" style={{color: '#473C8B'}}>
                  📋 Debug Information:
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="text-sm" style={{color: '#473C8B'}}>
                    <strong>Browser:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.split(' ').slice(-2).join(' ') : 'Unknown'}
                  </div>
                  <div className="text-sm" style={{color: '#473C8B'}}>
                    <strong>navigator.xr:</strong> {typeof navigator !== 'undefined' && navigator.xr ? 'Available' : 'Not Available'}
                  </div>
                  <div className="text-sm" style={{color: '#473C8B'}}>
                    <strong>Required Features:</strong> ['plane-detection']
                  </div>
                  <div className="text-sm" style={{color: '#473C8B'}}>
                    <strong>Optional Features:</strong> ['dom-overlay', 'hit-test']
                  </div>
                </div>

                <h4 className="font-bold text-md mb-2" style={{color: '#473C8B'}}>Console Logs:</h4>
                <div className="bg-black rounded-lg p-4 max-h-96 overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="text-gray-400 text-sm">No logs yet...</div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="text-green-400 text-xs font-mono mb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AR Session Active Overlay */}
      {sessionActive && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 1
          }}
        >
          <div style={{
            backgroundColor: 'rgba(76, 175, 80, 0.95)',
            color: 'white',
            padding: '1rem',
            margin: '1rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '600',
            maxWidth: '90%',
            alignSelf: 'center'
          }}>
            ✅ AR Session Active with Plane Detection!
          </div>

          <div style={{
            backgroundColor: 'rgba(248, 245, 242, 0.95)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={endARSession}
              style={{
                backgroundColor: '#DC3545',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              🛑 End AR Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
