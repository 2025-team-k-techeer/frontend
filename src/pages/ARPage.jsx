import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { useLocation, useNavigate } from 'react-router-dom';
// CSS3DRenderer 제거

function ARPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const models = location.state?.models || [];
  // scale은 models 배열의 각 객체에 포함되어 있음

  // useRef를 사용하여 변수들을 관리 (React 렌더링과 분리)
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controllerRef = useRef(null);
  const reticleRef = useRef(null);
  const selectionRingRef = useRef(null);
  const itemsRef = useRef([]);
  const placedObjectsRef = useRef([]);
  const selectedObjectRef = useRef(null);
  const sizeInfoCardRef = useRef(null);
  const itemSelectedIndexRef = useRef(0);
  const hitTestSourceRef = useRef(null);
  const hitTestSourceRequestedRef = useRef(false);
  const lastTapTimeRef = useRef(0);
  const longPressTimeoutRef = useRef(null);
  const isRotatingRef = useRef(false);
  const initialTouchCenterXRef = useRef(0);
  const initialObjectYRotationRef = useRef(0);

  const DOUBLE_TAP_THRESHOLD = 300;
  const LONG_PRESS_DURATION = 500;
  const RING_SCALE_FACTOR = 0.3;
  const ROTATION_SENSITIVITY = 0.01;

  // let reticleDetectedFrames = 0;
  //const RETICLE_THRESHOLD = 300;

  //let lineGroup = null;

  // 크기 정보 카드 관련 변수들

  useEffect(() => {
    // models 배열 콘솔 출력
    console.log('AR models:', models);
    // 컴포넌트가 마운트될 때만 실행
    init();
    setupFurnitureSelection();
    animate();

    // Cleanup 함수
    return () => {
      // 애니메이션 루프 중지
      if (rendererRef.current) {
        rendererRef.current.setAnimationLoop(null);
      }

      // 이벤트 리스너 제거
      if (rendererRef.current?.domElement) {
        rendererRef.current.domElement.removeEventListener(
          'touchstart',
          handleTouchStart
        );
        rendererRef.current.domElement.removeEventListener(
          'touchmove',
          handleTouchMove
        );
        rendererRef.current.domElement.removeEventListener(
          'touchend',
          handleTouchEnd
        );
        rendererRef.current.domElement.removeEventListener(
          'click',
          handleCanvasClick
        );
      }

      // 컨트롤러 이벤트 리스너 제거
      if (controllerRef.current) {
        controllerRef.current.removeEventListener('selectstart', onSelectStart);
        controllerRef.current.removeEventListener('selectend', onSelectEnd);
      }

      // AR 버튼 제거
      const arButton = document.querySelector('#ARButton');
      if (arButton) {
        arButton.remove();
      }

      // 렌더러 정리
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // 씬 정리
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  function init() {
    const myCanvas = document.getElementById('canvas');
    sceneRef.current = new THREE.Scene();

    cameraRef.current = new THREE.PerspectiveCamera(
      70,
      myCanvas.innerWidth / myCanvas.innerHeight,
      0.01,
      20
    );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    sceneRef.current.add(light);

    rendererRef.current = new THREE.WebGLRenderer({
      canvas: myCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(myCanvas.innerWidth, myCanvas.innerHeight);
    rendererRef.current.xr.enabled = true;
    rendererRef.current.setClearColor(0x000000, 0);

    rendererRef.current.domElement.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: false,
      }
    );
    rendererRef.current.domElement.addEventListener(
      'touchmove',
      handleTouchMove,
      {
        passive: false,
      }
    );
    rendererRef.current.domElement.addEventListener(
      'touchend',
      handleTouchEnd,
      {
        passive: false,
      }
    );

    // 빈 공간 클릭 시 가구 선택 해제
    rendererRef.current.domElement.addEventListener(
      'click',
      handleCanvasClick,
      {
        passive: false,
      }
    );

    const xrLight = new XREstimatedLight(rendererRef.current);
    xrLight.addEventListener('estimationstart', () => {
      sceneRef.current.add(xrLight);
      sceneRef.current.remove(light);
      if (xrLight.environment) {
        sceneRef.current.environment = xrLight.environment;
      }
    });
    xrLight.addEventListener('estimationend', () => {
      sceneRef.current.add(light);
      sceneRef.current.remove(xrLight);
    });

    let arButton = ARButton.createButton(rendererRef.current, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation'],
      domOverlay: { root: document.body },
    });
    arButton.style.bottom = '20%';
    document.body.appendChild(arButton);

    for (let i = 0; i < models.length; i++) {
      const loader = new GLTFLoader();
      loader.load(
        models[i].model_url,
        function (glb) {
          let model = glb.scene;
          itemsRef.current[i] = model;
          // 모델 최적화
          model.traverse((child) => {
            if (child.isMesh) {
              child.frustumCulled = true;
              child.castShadow = false;
              child.receiveShadow = false;
            }
          });
        },
        // Progress callback
        function () {},
        // Error callback
        function (error) {
          console.error(`Error loading model ${i}:`, error);
        }
      );
    }

    controllerRef.current = rendererRef.current.xr.getController(0);
    controllerRef.current.addEventListener('selectstart', onSelectStart);
    controllerRef.current.addEventListener('selectend', onSelectEnd);
    sceneRef.current.add(controllerRef.current);

    reticleRef.current = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );

    reticleRef.current.matrixAutoUpdate = false;
    reticleRef.current.visible = false;
    sceneRef.current.add(reticleRef.current);

    selectionRingRef.current = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.03, 16, 100).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    selectionRingRef.current.visible = false;
  }

  // 크기 정보 카드 생성 함수 (3D 텍스처 방식)
  function createSizeInfoCard(width, height, depth) {
    // 기존 카드가 있다면 제거
    if (sizeInfoCardRef.current) {
      sceneRef.current.remove(sizeInfoCardRef.current);
      sizeInfoCardRef.current = null;
    }

    // 캔버스 생성하여 텍스트 그리기
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    // 배경 그리기
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 테두리 그리기
    context.strokeStyle = '#00ff00';
    context.lineWidth = 4;
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // 텍스트 설정
    context.fillStyle = 'white';
    context.font = 'bold 32px Arial';
    context.textAlign = 'center';

    // 제목 그리기
    context.fillStyle = '#00ff00';
    context.fillText('가구 크기', canvas.width / 2, 50);

    // 크기 정보 그리기
    context.fillStyle = 'white';
    context.font = '28px Arial';
    context.fillText(
      `가로: ${(width / 100).toFixed(2)}m`,
      canvas.width / 2,
      100
    );
    context.fillText(
      `세로: ${(depth / 100).toFixed(2)}m`,
      canvas.width / 2,
      140
    );
    context.fillText(
      `높이: ${(height / 100).toFixed(2)}m`,
      canvas.width / 2,
      180
    );

    // 텍스처 생성
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // 카드 메시 생성
    const cardGeometry = new THREE.PlaneGeometry(0.5, 0.25);
    const cardMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1,
    });

    sizeInfoCardRef.current = new THREE.Mesh(cardGeometry, cardMaterial);

    // 회전 초기화
    sizeInfoCardRef.current.rotation.set(0, 0, 0);

    return sizeInfoCardRef.current;
  }

  function onSelectStart() {
    if (isRotatingRef.current) return;
    longPressTimeoutRef.current = setTimeout(() => {
      handleLongPress();
      longPressTimeoutRef.current = null;
    }, LONG_PRESS_DURATION);
  }

  function onSelectEnd() {
    if (isRotatingRef.current) return;
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      handleTap();
    }
  }

  function handleTouchStart(event) {
    if (event.touches.length === 2 && selectedObjectRef.current) {
      event.preventDefault();
      isRotatingRef.current = true;
      initialTouchCenterXRef.current =
        (event.touches[0].pageX + event.touches[1].pageX) / 2;
      initialObjectYRotationRef.current = selectedObjectRef.current.rotation.y;
    }
  }

  function handleTouchMove(event) {
    if (
      isRotatingRef.current &&
      event.touches.length === 2 &&
      selectedObjectRef.current
    ) {
      event.preventDefault();
      const currentCenterX =
        (event.touches[0].pageX + event.touches[1].pageX) / 2;
      const deltaX = currentCenterX - initialTouchCenterXRef.current;
      selectedObjectRef.current.rotation.y =
        initialObjectYRotationRef.current + deltaX * ROTATION_SENSITIVITY;
    }
  }

  function handleTouchEnd(event) {
    if (event.touches.length < 2) {
      isRotatingRef.current = false;
    }
  }

  function handleCanvasClick(event) {
    if (!selectedObjectRef.current) {
      return;
    }

    const raycaster = new THREE.Raycaster();
    const camera = cameraRef.current;
    const mouse = new THREE.Vector2();

    // 화면 좌표를 카메라 좌표로 변환
    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1) * camera.aspect;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1) * camera.aspect;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(
      placedObjectsRef.current,
      true
    );

    if (intersects.length === 0) {
      deselectObject();
    }
  }

  function handleTap() {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTimeRef.current;
    if (timeSinceLastTap < DOUBLE_TAP_THRESHOLD) {
      if (reticleRef.current.visible) {
        placeFurniture();
      }
    }
    lastTapTimeRef.current = currentTime;
  }

  function handleLongPress() {
    const raycaster = new THREE.Raycaster();
    const pointingRay = new THREE.Vector3(0, 0, -1);
    pointingRay.applyQuaternion(controllerRef.current.quaternion);
    raycaster.set(controllerRef.current.position, pointingRay);

    const intersects = raycaster.intersectObjects(
      placedObjectsRef.current,
      true
    );

    if (intersects.length > 0) {
      const intersectedObject = findTopLevelObject(intersects[0].object);
      if (intersectedObject) {
        if (intersectedObject === selectedObjectRef.current) {
          sceneRef.current.remove(intersectedObject);
          const index = placedObjectsRef.current.indexOf(intersectedObject);
          if (index !== -1) {
            placedObjectsRef.current.splice(index, 1);
          }
          deselectObject();
        } else {
          selectObject(intersectedObject);
        }
      }
    } else {
      deselectObject();
    }
  }

  function placeFurniture() {
    const newModel = itemsRef.current[itemSelectedIndexRef.current].clone();
    newModel.visible = true;
    reticleRef.current.matrix.decompose(
      newModel.position,
      newModel.quaternion,
      newModel.scale
    );
    const scale = models[itemSelectedIndexRef.current]?.scale || 1.0;
    newModel.scale.set(scale, scale, scale);

    // 객체에 모델 정보 저장 (크기 정보 표시용)
    newModel.userData = {
      modelIndex: itemSelectedIndexRef.current,
      modelInfo: models[itemSelectedIndexRef.current],
    };

    sceneRef.current.add(newModel);
    placedObjectsRef.current.push(newModel);
    selectObject(newModel);
  }

  function selectObject(object) {
    deselectObject();
    selectedObjectRef.current = object;
    selectedObjectRef.current.add(selectionRingRef.current);

    const box = new THREE.Box3().setFromObject(selectedObjectRef.current);
    const size = box.getSize(new THREE.Vector3());

    // 객체에 저장된 모델 정보에서 크기 정보 가져오기
    const modelInfo = selectedObjectRef.current.userData?.modelInfo;
    const widthCm = modelInfo?.width_cm || 100;
    const heightCm = modelInfo?.height_cm || 100;
    const depthCm = modelInfo?.depth_cm || 100;

    // 크기 정보 카드 생성
    const card = createSizeInfoCard(widthCm, heightCm, depthCm);

    // 카드 위치 설정 (객체 위쪽에 배치)
    card.position.copy(selectedObjectRef.current.position);
    card.position.y += size.y / 2 + 0.3;

    // 카메라와 카드 사이의 방향 벡터 계산
    //const direction = new THREE.Vector3().subVectors(camera.position, card.position);
    card.lookAt(cameraRef.current.position);

    // 카드가 뒤집히지 않도록 Y축 회전만 사용
    card.rotation.x = 0;
    card.rotation.z = 0;

    sceneRef.current.add(card);

    // 링 설정
    selectionRingRef.current.position.set(0, -size.y / 2, 0);
    selectionRingRef.current.scale.set(1, 1, 1);
    const maxDim = Math.max(size.x, size.z) / selectedObjectRef.current.scale.x;
    selectionRingRef.current.scale.set(
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR
    );
    selectionRingRef.current.visible = true;

    //makeSizeLine(size);
  }

  // function createThickLine(start, end, radius = 0.8, color = 0xff0000) {
  //   const direction = new THREE.Vector3().subVectors(end, start);
  //   const length = direction.length();

  //   const material = new THREE.MeshBasicMaterial({ color });
  //   const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);

  //   const cylinder = new THREE.Mesh(geometry, material);

  //   const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  //   cylinder.position.copy(midPoint);

  //   const axis = new THREE.Vector3(0, 1, 0);
  //   cylinder.quaternion.setFromUnitVectors(axis, direction.clone().normalize());

  //   return cylinder;
  // }

  // function makeSizeLine(size) {
  //   const scale = selectedObject.scale;

  //   const trueSize = new THREE.Vector3(
  //     size.x / scale.x,
  //     size.y / scale.y,
  //     size.z / scale.z
  //   );

  //   const scaleFactor = 0.27;
  //   const halfX = (trueSize.x / 2) * scaleFactor;
  //   const halfY = (trueSize.y / 2) * scaleFactor;
  //   const halfZ = (trueSize.z / 2) * scaleFactor;

  //   const xLine = createThickLine(
  //     new THREE.Vector3(-halfX, -halfY, halfZ),
  //     new THREE.Vector3(halfX, -halfY, halfZ)
  //   );

  //   const zLine = createThickLine(
  //     new THREE.Vector3(halfX, -halfY, halfZ),
  //     new THREE.Vector3(halfX, -halfY, -halfZ)
  //   );

  //   const yLine = createThickLine(
  //     new THREE.Vector3(-halfX, -halfY, halfZ),
  //     new THREE.Vector3(-halfX, halfY * 7, halfZ)
  //   );

  //   lineGroup = new THREE.Group();
  //   lineGroup.add(xLine, zLine, yLine);
  //   selectedObject.add(lineGroup);
  // }

  function deselectObject() {
    if (selectedObjectRef.current) {
      selectedObjectRef.current.remove(selectionRingRef.current);
      // if (lineGroup) {
      //   selectedObject.remove(lineGroup);
      //   lineGroup = null;
      // }
    }

    // 크기 정보 카드 제거
    if (sizeInfoCardRef.current) {
      sceneRef.current.remove(sizeInfoCardRef.current);
      sizeInfoCardRef.current = null;
    }

    selectedObjectRef.current = null;
    selectionRingRef.current.visible = false;
  }

  function findTopLevelObject(object) {
    let parent = object;
    while (parent.parent && parent.parent !== sceneRef.current) {
      parent = parent.parent;
    }
    return placedObjectsRef.current.includes(parent) ? parent : null;
  }

  function onClicked(e, selectItem, index) {
    itemSelectedIndexRef.current = index;
    deselectObject();
  }

  function setupFurnitureSelection() {
    // React에서는 DOM 이벤트 리스너 대신 onClick prop 사용
  }

  function animate() {
    rendererRef.current.setAnimationLoop(render);
  }

  function render(timestamp, frame) {
    if (frame) {
      const referenceSpace = rendererRef.current.xr.getReferenceSpace();
      const session = rendererRef.current.xr.getSession();

      if (hitTestSourceRequestedRef.current === false) {
        session.requestReferenceSpace('viewer').then(function (refSpace) {
          session
            .requestHitTestSource({ space: refSpace })
            .then(function (source) {
              hitTestSourceRef.current = source;
            });
        });
        session.addEventListener('end', function () {
          hitTestSourceRequestedRef.current = false;
          hitTestSourceRef.current = null;
          deselectObject();
        });
        hitTestSourceRequestedRef.current = true;
      }

      if (hitTestSourceRef.current) {
        const hitTestResults = frame.getHitTestResults(
          hitTestSourceRef.current
        );
        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          reticleRef.current.visible = true;
          reticleRef.current.matrix.fromArray(
            hit.getPose(referenceSpace).transform.matrix
          );
        } else {
          reticleRef.current.visible = false;
        }
      }
    }

    // 성능 최적화: 카드 업데이트를 선택적으로만 실행
    if (sizeInfoCardRef.current && selectedObjectRef.current) {
      sizeInfoCardRef.current.lookAt(cameraRef.current.position);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    // cssRenderer.render(cssScene, camera); // CSS3D 렌더링 제거
  }

  // 뒤로가기 버튼 UI (오른쪽 위 고정)
  // 실제 AR 캔버스 위에 겹치게 absolute/fixed로 배치
  // 아이콘+텍스트 형태
  const BackButton = () => (
    <button
      onClick={() => navigate('/result')}
      className="fixed top-4 right-4 z-50 bg-black/60 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black/80 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      뒤로가기
    </button>
  );

  return (
    <div className="App">
      <BackButton />
      <canvas
        id="canvas"
        className="w-full h-screen"
        style={{ width: '100%', height: '100vh' }}
      />
      <div
        id="ar-status"
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/70 text-white text-base rounded-lg z-[9999] opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none"
      >
        바닥을 인식 중입니다...
      </div>
      {/* 가구 선택 UI */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {models.map((model, index) => (
          <button
            key={index}
            id={`item${index}`}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClicked(e, null, index);
            }}
          >
            <div className="w-12 h-12 rounded overflow-hidden">
              <img
                src={model.image_url}
                alt={model.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyOEMyNi4yMDkxIDI4IDI4IDI2LjIwOTEgMjggMjRDMjggMjEuNzkwOSAyNi4yMDkxIDIwIDI0IDIwQzIxLjc5MDkgMjAgMjAgMjEuNzkwOSAyMCAyNEMyMCAyNi4yMDkxIDIxLjc5MDkgMjggMjQgMjhaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yNCA0QzEyLjk1NDMgNCA0IDEyLjk1NDMgNCAyNFMxMi45NTQzIDQ0IDI0IDQ0QzM1LjA0NTcgNDQgNDQgMzUuMDQ1NyA0NCAyNFMzNS4wNDU3IDQgMjQgNFpNMjQgNDBDMTUuMTY0IDQwIDggMzIuODM2IDggMjRTMTUuMTY0IDggMjQgOEMzMi44MzYgOCA0MCAxNS4xNjQgNDAgMjRTMzIuODM2IDQwIDI0IDQwWiIgZmlsbD0iIzlCOUJBQCIvPgo8L3N2Zz4K';
                }}
              />
            </div>
            <div className="text-xs font-bold text-gray-600 mt-1 text-center">
              {model.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ARPage;
