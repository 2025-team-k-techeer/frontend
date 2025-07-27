import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { useLocation, useNavigate } from 'react-router-dom';
// CSS3DRenderer 제거 - 3D 텍스처 방식으로 대체하여 성능 향상

function ARPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const models = location.state?.models || []; // ResultPage에서 전달받은 가구 모델 데이터
  // scale은 models 배열의 각 객체에 포함되어 있음

  // useRef를 사용하여 변수들을 관리 (React 렌더링과 분리)
  // React의 상태 변경으로 인한 불필요한 리렌더링 방지
  const sceneRef = useRef(null); // Three.js 씬 객체
  const cameraRef = useRef(null); // 카메라 객체
  const rendererRef = useRef(null); // WebGL 렌더러
  const controllerRef = useRef(null); // AR 컨트롤러 (VR 컨트롤러)
  const reticleRef = useRef(null); // AR 조준선 (바닥 표시)
  const selectionRingRef = useRef(null); // 선택된 객체 주변 링
  const itemsRef = useRef([]); // 로드된 3D 모델들
  const placedObjectsRef = useRef([]); // 배치된 가구 객체들
  const selectedObjectRef = useRef(null); // 현재 선택된 객체
  const sizeInfoCardRef = useRef(null); // 크기 정보 카드
  const itemSelectedIndexRef = useRef(0); // 선택된 가구 인덱스
  const hitTestSourceRef = useRef(null); // AR 히트 테스트 소스
  const hitTestSourceRequestedRef = useRef(false); // 히트 테스트 요청 상태
  const lastTapTimeRef = useRef(0); // 마지막 탭 시간 (더블탭 감지용)
  const longPressTimeoutRef = useRef(null); // 롱프레스 타이머
  const isRotatingRef = useRef(false); // 회전 중인지 상태
  const initialTouchCenterXRef = useRef(0); // 초기 터치 중심점 X
  const initialObjectYRotationRef = useRef(0); // 초기 객체 Y축 회전값

  // 상수 정의
  const DOUBLE_TAP_THRESHOLD = 400; // 더블탭 감지 임계값 (ms)
  const LONG_PRESS_DURATION = 500; // 롱프레스 감지 시간 (ms)
  const RING_SCALE_FACTOR = 0.3; // 선택 링 크기 조정 팩터
  const ROTATION_SENSITIVITY = 0.01; // 회전 감도

  // 주석 처리된 변수들 (성능 최적화로 제거)
  // let reticleDetectedFrames = 0; // 조준선 감지 프레임 수
  //const RETICLE_THRESHOLD = 300; // 조준선 임계값
  //let lineGroup = null; // 크기 표시선 그룹

  useEffect(() => {
    // models 배열 콘솔 출력
    console.log('AR models:', models);
    // 컴포넌트가 마운트될 때만 실행
    init();
    setupFurnitureSelection();
    animate();

    // Cleanup 함수 - 컴포넌트 언마운트 시 실행
    return () => {
      // 애니메이션 루프 중지
      if (rendererRef.current) {
        rendererRef.current.setAnimationLoop(null);
      }

      // 이벤트 리스너 제거 - 메모리 누수 방지
      // React 컴포넌트가 언마운트될 때 DOM 이벤트 리스너를 제거하지 않으면
      // 메모리 누수가 발생하고, 다른 페이지에서도 이벤트가 계속 실행될 수 있음
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

      // 렌더러 정리 - GPU 메모리 해제
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // 씬 정리 - 3D 객체들 메모리 해제
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  // AR 환경 초기화 함수
  function init() {
    const myCanvas = document.getElementById('canvas');
    sceneRef.current = new THREE.Scene();

    // 원근 카메라 설정 (AR용)
    cameraRef.current = new THREE.PerspectiveCamera(
      70, // 시야각- 수직으로 얼마나 넓은 영역을 볼 수 있는지를 각도
      myCanvas.innerWidth / myCanvas.innerHeight, // 종횡비- 가로 대비 세로 비율
      0.01, // 근평면- 가까운 물체까지의 거리
      20 // 원평면- 먼 물체까지의 거리
    );

    // 환경 조명 설정
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    sceneRef.current.add(light);

    // WebGL 렌더러 설정 - 3D 객체를 화면에 그리는 역할
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: myCanvas,
      antialias: true, // 안티앨리어싱 - 모서리가 더 부드럽게 보이도록 함
      alpha: true, // 투명 배경
      powerPreference: 'high-performance', // 고성능 모드 - 성능 최적화
      stencil: false, // 스텐실 버퍼 비활성화 (성능 향상)
      depth: true, // 깊이 버퍼 활성화 - 객체 간 깊이 순서 관리
    });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(myCanvas.innerWidth, myCanvas.innerHeight);
    rendererRef.current.xr.enabled = true; // WebXR 활성화
    rendererRef.current.setClearColor(0x000000, 0); // 투명 배경

    // 터치 이벤트 리스너 추가 (가구 회전용) - 터치 이벤트 처리
    rendererRef.current.domElement.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: false, // preventDefault 사용 가능 - 기본 동작 방지
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

    // AR 조명 추정 설정
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

    // AR 버튼 생성
    let arButton = ARButton.createButton(rendererRef.current, {
      requiredFeatures: ['hit-test'], // 히트 테스트 필수 - 카메라 조준 기능
      optionalFeatures: ['dom-overlay', 'light-estimation'], // 선택적 기능 - 화면 오버레이, 조명 추정
      domOverlay: { root: document.body }, // 버튼 위치 설정
    });
    arButton.style.bottom = '20%';
    document.body.appendChild(arButton);

    // 3D 모델 로드
    for (let i = 0; i < models.length; i++) {
      const loader = new GLTFLoader();
      loader.load(
        models[i].model_url,
        function (glb) {
          let model = glb.scene;
          itemsRef.current[i] = model;
          // 모델 최적화 - 성능 향상
          model.traverse((child) => {
            if (child.isMesh) {
              child.frustumCulled = true; // 절두체 컬링 활성화
              child.castShadow = false; // 그림자 비활성화
              child.receiveShadow = false; // 그림자 수신 비활성화
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

    // AR 컨트롤러 설정 - 컨트롤러 이벤트 처리
    controllerRef.current = rendererRef.current.xr.getController(0); // 컨트롤러 가져오기
    controllerRef.current.addEventListener('selectstart', onSelectStart); // 선택 시작 이벤트 처리
    controllerRef.current.addEventListener('selectend', onSelectEnd); // 선택 종료 이벤트 처리
    sceneRef.current.add(controllerRef.current); // 컨트롤러 추가

    // AR 조준선 생성 (바닥 표시용) - 카메라 조준 기능
    reticleRef.current = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );

    reticleRef.current.matrixAutoUpdate = false;
    reticleRef.current.visible = false;
    sceneRef.current.add(reticleRef.current);

    // 선택 링 생성 (선택된 가구 표시용) - 선택된 가구 표시
    selectionRingRef.current = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.03, 16, 100).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    selectionRingRef.current.visible = false;
    sceneRef.current.add(selectionRingRef.current); // 씬에만 add
  }

  // 크기 정보 카드 생성 함수 (3D 텍스처 방식)
  // CSS3DRenderer 대신 Canvas 텍스처 사용으로 성능 향상
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

    // 크기 정보 그리기 (cm를 m로 변환)
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

  // 컨트롤러 선택 시작 이벤트 - 롱프레스 처리
  function onSelectStart() {
    if (isRotatingRef.current) return; // 회전 중이면 무시
    longPressTimeoutRef.current = setTimeout(() => {
      handleLongPress(); // 롱프레스 처리
      longPressTimeoutRef.current = null; // 타임아웃 제거
    }, LONG_PRESS_DURATION);
  }

  // 컨트롤러 선택 종료 이벤트
  function onSelectEnd() {
    if (isRotatingRef.current) return; // 회전 중이면 무시
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      handleTap(); // 짧은 탭으로 처리
    }
  }

  // 터치 시작 이벤트 (2손가락 회전용)
  function handleTouchStart(event) {
    if (event.touches.length === 2 && selectedObjectRef.current) {
      event.preventDefault(); // 기본 동작 방지
      isRotatingRef.current = true; // 회전 상태 설정
      initialTouchCenterXRef.current =
        (event.touches[0].pageX + event.touches[1].pageX) / 2; // 초기 터치 중심 좌표 저장
      initialObjectYRotationRef.current = selectedObjectRef.current.rotation.y; // 초기 회전 각도 저장
    }
  }

  // 터치 이동 이벤트 (2손가락 회전 처리)
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

  // 터치 종료 이벤트
  function handleTouchEnd(event) {
    if (event.touches.length < 2) {
      isRotatingRef.current = false;
    }
  }

  // 캔버스 클릭 이벤트 (빈 공간 클릭 시 선택 해제)
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
      deselectObject(); // 빈 공간 클릭 시 선택 해제
    }
  }

  // 탭 이벤트 처리 (더블탭으로 가구 배치)
  function handleTap() {
    const currentTime = Date.now(); // 현재시간 저장
    const timeSinceLastTap = currentTime - lastTapTimeRef.current; // 마지막 탭 이후 경과 시간 계산
    if (timeSinceLastTap < DOUBLE_TAP_THRESHOLD) {
      // 더블탭 타임 체크
      if (reticleRef.current.visible) {
        placeFurniture(); // 더블탭 시 가구 배치
      }
    }
    lastTapTimeRef.current = currentTime;
  }

  // 롱프레스 이벤트 처리 (가구 선택/삭제)
  function handleLongPress() {
    const raycaster = new THREE.Raycaster(); // 레이캐스터 생성
    const pointingRay = new THREE.Vector3(0, 0, -1); // 포인팅 레이 생성
    pointingRay.applyQuaternion(controllerRef.current.quaternion); // 컨트롤러 회전 적용
    raycaster.set(controllerRef.current.position, pointingRay); // 레이캐스터 설정

    const intersects = raycaster.intersectObjects(
      // 레이캐스터 충돌 감지
      placedObjectsRef.current, // 배치된 객체 리스트
      true // 충돌 감지 여부
    );

    if (intersects.length > 0) {
      const intersectedObject = findTopLevelObject(intersects[0].object);
      if (intersectedObject) {
        if (intersectedObject === selectedObjectRef.current) {
          // 이미 선택된 객체를 다시 롱프레스하면 삭제
          sceneRef.current.remove(intersectedObject);
          const index = placedObjectsRef.current.indexOf(intersectedObject);
          if (index !== -1) {
            placedObjectsRef.current.splice(index, 1);
          }
          deselectObject();
        } else {
          // 다른 객체 선택
          selectObject(intersectedObject);
        }
      }
    } else {
      deselectObject(); // 빈 공간 롱프레스 시 선택 해제
    }
  }

  // 가구 배치 함수
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

  // 객체 선택 함수
  function selectObject(object) {
    deselectObject(); // 기존 선택 해제
    selectedObjectRef.current = object;

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

    // selectionRing을 오브젝트의 월드 좌표에 위치
    selectedObjectRef.current.updateMatrixWorld();
    const worldPos = new THREE.Vector3();
    selectedObjectRef.current.getWorldPosition(worldPos);
    selectionRingRef.current.position.copy(worldPos);
    // 오브젝트의 회전도 맞춰줌
    const worldQuat = new THREE.Quaternion();
    selectedObjectRef.current.getWorldQuaternion(worldQuat);
    selectionRingRef.current.quaternion.copy(worldQuat);
    // 크기 맞추기
    const maxDim = Math.max(size.x, size.z) / selectedObjectRef.current.scale.x;
    selectionRingRef.current.scale.set(
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR
    );
    selectionRingRef.current.visible = true;

    // 주석 처리된 크기선 표시 기능
    //makeSizeLine(size);
  }

  // 주석 처리된 크기선 생성 함수들 (성능 최적화로 제거)
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

  // 객체 선택 해제 함수
  function deselectObject() {
    if (selectedObjectRef.current) {
      selectedObjectRef.current.remove(selectionRingRef.current);
      // 주석 처리된 크기선 제거
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

  // 최상위 객체 찾기 함수 (중첩된 객체 구조에서)
  function findTopLevelObject(object) {
    let parent = object;
    while (parent.parent && parent.parent !== sceneRef.current) {
      parent = parent.parent;
    }
    return placedObjectsRef.current.includes(parent) ? parent : null;
  }

  // 가구 선택 UI 클릭 이벤트
  function onClicked(e, selectItem, index) {
    itemSelectedIndexRef.current = index;
    deselectObject();
  }

  // 가구 선택 UI 설정 (React에서는 DOM 이벤트 리스너 대신 onClick prop 사용)
  function setupFurnitureSelection() {
    // React에서는 DOM 이벤트 리스너 대신 onClick prop 사용
  }

  // 애니메이션 루프 시작
  function animate() {
    rendererRef.current.setAnimationLoop(render);
  }

  // 렌더링 함수 (매 프레임 실행)
  function render(timestamp, frame) {
    if (frame) {
      const referenceSpace = rendererRef.current.xr.getReferenceSpace();
      const session = rendererRef.current.xr.getSession();

      // AR 히트 테스트 설정 (바닥 감지)
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

      // 히트 테스트 결과로 조준선 위치 업데이트
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

    // selectionRing 위치/회전 동기화
    if (selectedObjectRef.current && selectionRingRef.current) {
      selectedObjectRef.current.updateMatrixWorld();
      const worldPos = new THREE.Vector3();
      selectedObjectRef.current.getWorldPosition(worldPos);
      selectionRingRef.current.position.copy(worldPos);
      const worldQuat = new THREE.Quaternion();
      selectedObjectRef.current.getWorldQuaternion(worldQuat);
      selectionRingRef.current.quaternion.copy(worldQuat);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    // 주석 처리된 CSS3D 렌더링
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
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 overflow-x-auto whitespace-nowrap px-2 w-[90vw] max-w-2xl">
        {models.map((model, index) => (
          <button
            key={index}
            id={`item${index}`}
            className="inline-block bg-white/80 backdrop-blur-sm rounded-lg p-3 hover:bg-white transition-colors mr-2 last:mr-0"
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
