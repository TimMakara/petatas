'use client';

import { useState, useEffect, useRef } from 'react';

export default function ARDebugPage() {
  const [arSupported, setArSupported] = useState(false);
  const [planeDetectionSupported, setPlaneDetectionSupported] = useState(false);
  const [hitTestSupported, setHitTestSupported] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  const [logs, setLogs] = useState([]);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const xrSessionRef = useRef(null);
  const hitTestSourceRef = useRef(null);
  const reticleRef = useRef(null);
  const placedModelRef = useRef(null);
  const controllerRef = useRef(null);

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

        // Note: isSessionSupported doesn't check individual features
        // We'll test features when starting the session
        if (basicSupported) {
          addLog('Device supports immersive-ar mode');
          addLog('Will test hit-test and plane-detection features on session start');
          setHitTestSupported(true); // Assume supported, will verify on session start
          setStatusMessage('WebXR AR supported! Ready to test features');
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
        
        // CRITICAL: Set reference space type to 'local' instead of default 'local-floor'
        // Samsung Tab S9 doesn't support 'local-floor'
        addLog('⚙️ Configuring Three.js XR reference space type...');
        try {
          // Three.js WebXRManager allows setting reference space type
          if (renderer.xr.setReferenceSpaceType) {
            renderer.xr.setReferenceSpaceType('local');
            addLog('✅ Three.js reference space set to: local');
          } else {
            addLog('⚠️ Three.js version may not support setReferenceSpaceType');
          }
        } catch (e) {
          addLog(`⚠️ Could not set reference space type: ${e.message}`);
        }

        // Add basic lighting
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbbb, 1);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Create reticle (placement indicator)
        const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
        const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        scene.add(reticle);
        reticleRef.current = reticle;
        addLog('✅ Reticle (placement indicator) created');

        rendererRef.current = { THREE, renderer, scene, camera };

        renderer.setAnimationLoop((timestamp, frame) => {
          // Handle hit testing in AR mode
          if (frame && xrSessionRef.current) {
            const referenceSpace = renderer.xr.getReferenceSpace();
            const reticle = reticleRef.current;

            // Perform hit test to find surfaces
            if (hitTestSourceRef.current && referenceSpace && reticle) {
              const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current);
              if (hitTestResults.length > 0) {
                const hit = hitTestResults[0];
                const pose = hit.getPose(referenceSpace);
                reticle.visible = true;
                reticle.matrix.fromArray(pose.transform.matrix);
              } else {
                reticle.visible = false;
              }
            }

            // Auto-rotate placed model
            if (placedModelRef.current) {
              placedModelRef.current.rotation.y += 0.01;
            }
          }

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
      addLog('🚀 Attempting to start AR session with hit-test (required) and plane-detection (optional)...');
      setStatusMessage('Starting AR session...');

      // Request session with hit-test as required feature
      // plane-detection is optional (not all devices support it)
      const sessionOptions = {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay', 'plane-detection'],
      };

      addLog(`Session options: ${JSON.stringify(sessionOptions)}`);

      const session = await navigator.xr.requestSession('immersive-ar', sessionOptions);
      
      addLog('✅ AR session created successfully!');
      xrSessionRef.current = session;

      // Log session details BEFORE anything else
      addLog(`Session mode: ${session.mode}`);
      if (session.enabledFeatures) {
        const features = Array.from(session.enabledFeatures);
        addLog(`Session enabled features: ${features.join(', ')}`);
        
        const hasHitTest = features.includes('hit-test');
        const hasPlaneDetection = features.includes('plane-detection');
        
        addLog(`✅ hit-test: ${hasHitTest ? 'ENABLED' : 'NOT ENABLED'}`);
        addLog(`${hasPlaneDetection ? '✅' : '❌'} plane-detection: ${hasPlaneDetection ? 'ENABLED' : 'NOT ENABLED (optional)'}`);
        
        setHitTestSupported(hasHitTest);
        setPlaneDetectionSupported(hasPlaneDetection);
      } else {
        addLog('Could not retrieve enabled features');
      }

      // Test all possible reference space types
      addLog('🔍 Testing available reference space types...');
      const spaceTypes = ['viewer', 'local', 'local-floor', 'bounded-floor', 'unbounded'];
      const supportedSpaces = [];
      
      for (const spaceType of spaceTypes) {
        try {
          const testSpace = await session.requestReferenceSpace(spaceType);
          addLog(`✅ ${spaceType}: SUPPORTED`);
          supportedSpaces.push(spaceType);
        } catch (e) {
          addLog(`❌ ${spaceType}: NOT SUPPORTED (${e.message})`);
        }
      }

      if (supportedSpaces.length === 0) {
        throw new Error('No reference space types are supported on this device');
      }

      addLog(`📍 Supported spaces: ${supportedSpaces.join(', ')}`);

      // THREE.JS RENDERER SET SESSION
      // This might fail if Three.js tries to use a reference space that's not supported
      try {
        addLog('🎨 Setting session on Three.js renderer...');
        addLog('⚠️ Three.js may request its own reference space internally');
        
        await rendererRef.current.renderer.xr.setSession(session);
        
        addLog('✅ Three.js renderer session set successfully!');
      } catch (rendererError) {
        addLog(`❌ Three.js setSession failed: ${rendererError.name} - ${rendererError.message}`);
        addLog('💡 This might be because Three.js needs "local-floor" reference space');
        throw rendererError;
      }

      // Get the reference space that Three.js is using
      try {
        const threeRefSpace = rendererRef.current.renderer.xr.getReferenceSpace();
        addLog(`📍 Three.js is using reference space: ${threeRefSpace ? 'Retrieved' : 'Unknown'}`);
      } catch (e) {
        addLog(`⚠️ Could not get Three.js reference space: ${e.message}`);
      }

      // Set up hit test source if hit-test is enabled
      if (session.enabledFeatures && Array.from(session.enabledFeatures).includes('hit-test')) {
        try {
          addLog('🎯 Setting up hit-test source with viewer space...');
          const viewerSpace = await session.requestReferenceSpace('viewer');
          const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
          hitTestSourceRef.current = hitTestSource;
          addLog('✅ Hit-test source created successfully');
        } catch (e) {
          addLog(`⚠️ Hit-test source creation failed: ${e.message}`);
        }
      }

      // Load 3D model
      try {
        addLog('🦎 Loading crocodile model...');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();
        const modelUrl = window.location.origin + '/models/cartoon_crocodile_croco-roco.glb';
        
        loader.load(
          modelUrl,
          (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.3, 0.3, 0.3);
            // Store model but don't add to scene yet (will be placed on tap)
            rendererRef.current.loadedModel = model;
            addLog('✅ Crocodile model loaded! Tap screen to place it');
          },
          undefined,
          (error) => {
            addLog(`❌ Error loading model: ${error.message}`);
          }
        );
      } catch (e) {
        addLog(`❌ Error setting up model loader: ${e.message}`);
      }

      // Set up tap-to-place controller
      const controller = rendererRef.current.renderer.xr.getController(0);
      controller.addEventListener('select', () => {
        addLog('👆 Screen tapped!');
        
        const reticle = reticleRef.current;
        const model = rendererRef.current.loadedModel;
        
        if (!reticle || !reticle.visible) {
          addLog('⚠️ No surface detected. Move your device to find a surface.');
          return;
        }
        
        if (!model) {
          addLog('⚠️ Model not loaded yet. Please wait...');
          return;
        }
        
        // Remove previous model if exists
        if (placedModelRef.current) {
          rendererRef.current.scene.remove(placedModelRef.current);
          addLog('🗑️ Removed previous model');
        }
        
        // Clone and place new model
        const newModel = model.clone();
        newModel.position.setFromMatrixPosition(reticle.matrix);
        rendererRef.current.scene.add(newModel);
        placedModelRef.current = newModel;
        addLog('✅ Crocodile placed! It will auto-rotate');
      });
      controllerRef.current = controller;
      rendererRef.current.scene.add(controller);
      addLog('✅ Tap-to-place controller ready');
      
      setSessionActive(true);
      setStatusMessage('AR Session Active');
      addLog('✅ AR Session fully initialized!');
      addLog('🎉 You can now use AR features!');

      // Handle session end
      session.addEventListener('end', () => {
        addLog('AR session ended');
        setSessionActive(false);
        setStatusMessage('AR session ended');
        xrSessionRef.current = null;
        hitTestSourceRef.current = null;
        
        // Clean up placed model
        if (placedModelRef.current) {
          rendererRef.current.scene.remove(placedModelRef.current);
          placedModelRef.current = null;
        }
        
        // Hide reticle
        if (reticleRef.current) {
          reticleRef.current.visible = false;
        }
      });

    } catch (error) {
      addLog(`❌ AR Session Error: ${error.name} - ${error.message}`);
      
      let errorMsg = `Error: ${error.name}\n${error.message}`;

      if (error.name === 'NotSupportedError') {
        errorMsg = '❌ WebXR with hit-test not supported.\n\nPossible reasons:\n1. Device does not support ARCore\n2. Browser needs update\n3. WebXR features not available';
        addLog('hit-test feature is likely not supported on this device/browser');
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
                  <h1 className="text-xl font-bold" style={{color: '#6379B9'}}>WebXR Debug Console</h1>
                </div>
                <div className="flex items-center gap-4">
                  <a href="/" className="text-sm font-medium transition" style={{color: '#6379B9'}}>
                    ← Home
                  </a>
                  <a href="/ar" className="text-sm font-medium transition" style={{color: '#6379B9'}}>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{arSupported ? '✅' : '❌'}</div>
                  <div className="font-bold" style={{color: '#6379B9'}}>Basic AR</div>
                  <div className="text-sm text-gray-600">{arSupported ? 'Supported' : 'Not Supported'}</div>
                </div>

                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{hitTestSupported ? '✅' : '❓'}</div>
                  <div className="font-bold" style={{color: '#6379B9'}}>Hit Test</div>
                  <div className="text-sm text-gray-600">{hitTestSupported ? 'Enabled' : 'Unknown'}</div>
                </div>

                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{planeDetectionSupported ? '✅' : '❓'}</div>
                  <div className="font-bold" style={{color: '#6379B9'}}>Plane Detection</div>
                  <div className="text-sm text-gray-600">{planeDetectionSupported ? 'Enabled' : 'Optional'}</div>
                </div>

                <div className="rounded-xl shadow-md p-6 text-center" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
                  <div className="text-4xl mb-2">{rendererRef.current ? '✅' : '⏳'}</div>
                  <div className="font-bold" style={{color: '#6379B9'}}>Three.js</div>
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
                    backgroundColor: '#6379B9'
                  }}
                >
                  🔍 Start AR Debug Session
                </button>
                <p className="mt-4 text-sm" style={{color: '#6379B9'}}>
                  This will test WebXR with <strong>hit-test</strong> (required) and <strong>plane-detection</strong> (optional)
                </p>
              </div>

              {/* Debug Info */}
              <div className="rounded-3xl p-6" style={{backgroundColor: 'rgba(99, 121, 185, 0.1)', border: '1px solid #6379B9'}}>
                <h3 className="font-bold text-lg mb-4" style={{color: '#6379B9'}}>
                  📋 Debug Information:
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Browser:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.split(' ').slice(-2).join(' ') : 'Unknown'}
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Platform:</strong> {typeof navigator !== 'undefined' ? navigator.platform : 'Unknown'}
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>navigator.xr:</strong> {typeof navigator !== 'undefined' && navigator.xr ? 'Available' : 'Not Available'}
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Device Memory:</strong> {typeof navigator !== 'undefined' && navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown'}
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Hardware Concurrency:</strong> {typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 'Unknown'}
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Required Features:</strong> ['hit-test']
                  </div>
                  <div className="text-sm" style={{color: '#6379B9'}}>
                    <strong>Optional Features:</strong> ['dom-overlay', 'plane-detection']
                  </div>
                </div>

                <h4 className="font-bold text-md mb-2" style={{color: '#6379B9'}}>Console Logs:</h4>
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
            <div>✅ AR Session Active!</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>🦎 Move device to find surfaces</div>
            <div style={{ fontSize: '0.9rem' }}>👆 Tap to place crocodile</div>
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

