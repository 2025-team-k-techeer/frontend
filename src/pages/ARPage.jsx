import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { useLocation, useNavigate } from 'react-router-dom';
// CSS3DRenderer 제거 - 3D 텍스처 방식으로 대체하여 성능 향상
import Tutorial from '../components/Result/Tutorial';

function ARPage() {
  const defaultMockModels = [
    {
      label: '테스트 가구',
      model_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/VintageChair.glb',
      image_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/VintageChair.png',
      width_cm: 1000,
      height_cm: 100,
      depth_cm: 60,
      scale: 1.0,
    },
    {
      label: '테스트 가구2',
      model_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/WoodenChair.glb',
      image_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/WoodenChair.png',
      width_cm: 1000,
      height_cm: 100,
      depth_cm: 60,
      scale: 1.0,
    },
    {
      label: '테스트 가구3',
      model_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/VintageChair.glb',
      image_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/VintageChair.png',
      width_cm: 1000,
      height_cm: 100,
      depth_cm: 60,
      scale: 1.0,
    },
    {
      label: '테스트 가구4',
      model_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/beige_modernchair.glb',
      image_url:
        'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/beige_modernchair.png',
      width_cm: 1000,
      height_cm: 100,
      depth_cm: 60,
      scale: 1.0,
    },

    // {
    //   label: '테스트 가구5',
    //   model_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/black_leather_officechair.glb',
    //   image_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/black_leather_officechair.png',
    //   width_cm: 1000,
    //   height_cm: 100,
    //   depth_cm: 60,
    //   scale: 1.0,
    // },
    // {
    //   label: '테스트 가구6',
    //   model_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/black_officechair.glb',
    //   image_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/black_officechair.png',
    //   width_cm: 1000,
    //   height_cm: 100,
    //   depth_cm: 60,
    //   scale: 1.0,
    // },
    // {
    //   label: '테스트 가구7',
    //   model_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/brown_leather_officechair.glb',
    //   image_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/brown_leather_officechair.png',
    //   width_cm: 1000,
    //   height_cm: 100,
    //   depth_cm: 60,
    //   scale: 1.0,
    // },
    // {
    //   label: '테스트 가구8',
    //   model_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/glb_chair/grey_armchair.glb',
    //   image_url:
    //     'https://storage.googleapis.com/teamk-backend/ar_assets/thumbnail_chair/grey_armchair.png',
    //   width_cm: 1000,
    //   height_cm: 100,
    //   depth_cm: 60,
    //   scale: 1.0,
    // },
  ];
  console.log('defaultMockModels', defaultMockModels);
  const location = useLocation();
  const navigate = useNavigate();

  const models = location.state?.models || defaultMockModels;

  // scale은 models 배열의 각 객체에 포함되어 있음

  // 튜토리얼 상태 관리
  const [showTutorial, setShowTutorial] = useState(false);

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
  // const sizeInfoCardRef = useRef(null);
  const itemSelectedIndexRef = useRef(0);
  const hitTestSourceRef = useRef(null);
  const hitTestSourceRequestedRef = useRef(false);
  const lastTapTimeRef = useRef(0);
  const longPressTimeoutRef = useRef(null);
  const isRotatingRef = useRef(false);
  const initialTouchCenterXRef = useRef(0);
  const initialObjectYRotationRef = useRef(0);

  const DOUBLE_TAP_THRESHOLD = 400;
  const LONG_PRESS_DURATION = 500;
  const RING_SCALE_FACTOR = 1.2;
  const ROTATION_SENSITIVITY = 0.01;

  const measurementGroupRef = useRef(null); // 크기 측정 선 그룹

  // let reticleDetectedFrames = 0;
  //const RETICLE_THRESHOLD = 300;

  //let lineGroup = null;

  // 크기 정보 카드 관련 변수들


  useEffect(() => {
    // models 배열 콘솔 출력
    console.log('AR models:', models);

    // 첫 방문자인지 확인하여 튜토리얼 표시
    const hasVisitedARTutorial = localStorage.getItem('hasVisitedARTutorial');
    if (!hasVisitedARTutorial) {
      setShowTutorial(true);
    }

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
  }



  //   // 카드 메시 생성
  //   const cardGeometry = new THREE.PlaneGeometry(0.5, 0.25);
  //   const cardMaterial = new THREE.MeshBasicMaterial({
  //     map: texture,
  //     transparent: true,
  //     alphaTest: 0.1,
  //   });

  //   sizeInfoCardRef.current = new THREE.Mesh(cardGeometry, cardMaterial);

  //   // 회전 초기화
  //   sizeInfoCardRef.current.rotation.set(0, 0, 0);

  //   return sizeInfoCardRef.current;
  // }

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
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // // 크기 정보 카드 생성
    // const modelInfo = selectedObjectRef.current.userData?.modelInfo;
    // const widthCm = modelInfo?.width_cm || 100;
    // const heightCm = modelInfo?.height_cm || 100;
    // const depthCm = modelInfo?.depth_cm || 100;
    // const card = createSizeInfoCard(widthCm, heightCm, depthCm);

    // // 카드 위치: 객체 위로
    // card.position.copy(center);
    // card.position.y = box.max.y + 0.3;
    // card.lookAt(cameraRef.current.position);
    // card.rotation.x = 0;
    // card.rotation.z = 0;
    // sceneRef.current.add(card);

    // 링 위치: 바닥 중심
    selectionRingRef.current.position.set(center.x, box.min.y, center.z);
    sceneRef.current.add(selectionRingRef.current); // 씬에 직접 추가

    // 크기 측정 선 표시
    showMeasurementLines(
      selectedObjectRef.current,
      sceneRef.current,
      cameraRef.current
    );

    const maxDim = Math.max(size.x, size.z);
    selectionRingRef.current.scale.set(
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR,
      maxDim * RING_SCALE_FACTOR
    );


    selectionRingRef.current.visible = true;

  }



  function createLine(start, end, color = 0x00ff00, radius = 0.005) {
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const geometry = new THREE.CylinderGeometry(radius, radius, len, 8);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mesh.position.copy(mid);

    const axis = new THREE.Vector3(0, 1, 0);
    mesh.quaternion.setFromUnitVectors(axis, dir.clone().normalize());

    return mesh;
  }

  function createTextLabel(text = '100cm', size = 0.08) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const geometry = new THREE.PlaneGeometry(size * 2, size);
    return new THREE.Mesh(geometry, material);
  }

  // 가구 크기 측정 선 표시 함수
  function showMeasurementLines(object, scene, camera) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const group = new THREE.Group();
    const offsetY = 0.05;
    const offsetText = 0.1;
    const tipLength = 0.03; // 짧은 선 길이

    // === 가로 (X)
    const xY = box.min.y + offsetY;
    const xZ = box.max.z + 0.05;
    const x1 = new THREE.Vector3(box.min.x, xY, xZ);
    const x2 = new THREE.Vector3(box.max.x, xY, xZ);
    const lineX = createLine(x1, x2, 0xff7700);
    // 가로선 끝에 수직선 추가 (Z축 양방향)
    const x1Tip1 = x1.clone();
    const x1Tip2a = x1.clone().add(new THREE.Vector3(0, 0, tipLength));
    const x1Tip2b = x1.clone().add(new THREE.Vector3(0, 0, -tipLength));
    const x2Tip1 = x2.clone();
    const x2Tip2a = x2.clone().add(new THREE.Vector3(0, 0, tipLength));
    const x2Tip2b = x2.clone().add(new THREE.Vector3(0, 0, -tipLength));
    const xTipLine1a = createLine(x1Tip1, x1Tip2a, 0xff7700);
    const xTipLine1b = createLine(x1Tip1, x1Tip2b, 0xff7700);
    const xTipLine2a = createLine(x2Tip1, x2Tip2a, 0xff7700);
    const xTipLine2b = createLine(x2Tip1, x2Tip2b, 0xff7700);

    const labelX = createTextLabel(`가로: ${size.x.toFixed(2)}m`);
    labelX.position.set(center.x, xY + offsetText, xZ);
    labelX.lookAt(camera.position);

    // === 세로 (Z)
    const zY = box.min.y + offsetY;
    const zX = box.min.x - 0.05;
    const z1 = new THREE.Vector3(zX, zY, box.min.z);
    const z2 = new THREE.Vector3(zX, zY, box.max.z);
    const lineZ = createLine(z1, z2, 0xff7700);
    // 세로선 끝에 수직선 추가 (X축 양방향)
    const z1Tip1 = z1.clone();
    const z1Tip2a = z1.clone().add(new THREE.Vector3(-tipLength, 0, 0));
    const z1Tip2b = z1.clone().add(new THREE.Vector3(tipLength, 0, 0));
    const z2Tip1 = z2.clone();
    const z2Tip2a = z2.clone().add(new THREE.Vector3(-tipLength, 0, 0));
    const z2Tip2b = z2.clone().add(new THREE.Vector3(tipLength, 0, 0));
    const zTipLine1a = createLine(z1Tip1, z1Tip2a, 0xff7700);
    const zTipLine1b = createLine(z1Tip1, z1Tip2b, 0xff7700);
    const zTipLine2a = createLine(z2Tip1, z2Tip2a, 0xff7700);
    const zTipLine2b = createLine(z2Tip1, z2Tip2b, 0xff7700);

    const labelZ = createTextLabel(`세로: ${size.z.toFixed(2)}m`);
    labelZ.position.set(zX, zY + offsetText, center.z);
    labelZ.lookAt(camera.position);

    // === 높이 (Y)
    const yX = box.max.x + 0.05;
    const yZ = box.max.z + 0.05;
    // y1의 y좌표를 xY로 맞춤
    const y1 = new THREE.Vector3(yX, xY, yZ);
    const y2 = new THREE.Vector3(yX, box.max.y, yZ);
    const lineY = createLine(y1, y2, 0xff7700);
    // 높이선 끝에 수직선 추가 (Z축 양방향)
    const y1Tip1 = y1.clone();
    const y1Tip2a = y1.clone().add(new THREE.Vector3(0, 0, tipLength));
    const y1Tip2b = y1.clone().add(new THREE.Vector3(0, 0, -tipLength));
    const y2Tip1 = y2.clone();
    const y2Tip2a = y2.clone().add(new THREE.Vector3(0, 0, tipLength));
    const y2Tip2b = y2.clone().add(new THREE.Vector3(0, 0, -tipLength));
    const yTipLine1a = createLine(y1Tip1, y1Tip2a, 0xff7700);
    const yTipLine1b = createLine(y1Tip1, y1Tip2b, 0xff7700);
    const yTipLine2a = createLine(y2Tip1, y2Tip2a, 0xff7700);
    const yTipLine2b = createLine(y2Tip1, y2Tip2b, 0xff7700);
    // 중간 위치 계산
    const midY = (box.min.y + box.max.y) / 2;
    const delta = 0.05; // 카메라 쪽으로 이동할 거리
    const labelY = createTextLabel(`높이: ${size.y.toFixed(2)}m`);
    labelY.position.set(yX, midY, yZ + delta);
    labelY.lookAt(camera.position);

    group.add(
      lineX,
      xTipLine1a,
      xTipLine1b,
      xTipLine2a,
      xTipLine2b,
      labelX,
      lineZ,
      zTipLine1a,
      zTipLine1b,
      zTipLine2a,
      zTipLine2b,
      labelZ,
      lineY,
      yTipLine1a,
      yTipLine1b,
      yTipLine2a,
      yTipLine2b,
      labelY
    );
    scene.add(group);
    measurementGroupRef.current = group;
  }


  function deselectObject() {
    if (selectedObjectRef.current) {
      selectedObjectRef.current.remove(selectionRingRef.current);
      // 주석 처리된 크기선 제거
      // if (lineGroup) {
      //   selectedObject.remove(lineGroup);
      //   lineGroup = null;
      // }
    }

    // // 크기 정보 카드 제거
    // if (sizeInfoCardRef.current) {
    //   sceneRef.current.remove(sizeInfoCardRef.current);
    //   sizeInfoCardRef.current = null;
    // }
    if (measurementGroupRef.current) {
      sceneRef.current.remove(measurementGroupRef.current);
      measurementGroupRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      measurementGroupRef.current = null;
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

    // // 성능 최적화: 카드 업데이트를 선택적으로만 실행
    // if (sizeInfoCardRef.current && selectedObjectRef.current) {
    //   sizeInfoCardRef.current.lookAt(cameraRef.current.position);
    // }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    // 주석 처리된 CSS3D 렌더링
    // cssRenderer.render(cssScene, camera); // CSS3D 렌더링 제거
  }

  // 튜토리얼 닫기 핸들러
  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

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

  // 튜토리얼 버튼 UI (좌측 상단 고정)
  const TutorialButton = () => (
    <button
      onClick={() => setShowTutorial(true)}
      className="fixed top-4 left-4 z-50 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );

  return (
    <div className="App">
      <BackButton />
      <TutorialButton />
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
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 w-full max-w-lg px-2  rounded-xl py-4 overflow-x-auto whitespace-nowrap">
        {models.slice(0, 4).map((model, index) => (
          <button
            key={index}
            id={`item${index}`}
            className={`bg-[#F0F0F0] rounded-xl p-3 flex-shrink-0 shadow-md w-20 h-20 flex items-center justify-center border-4 focus:outline-none focus:ring-0`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClicked(e, null, index);
            }}
          >
            <div className="w-16 h-16 rounded overflow-hidden flex items-center justify-center">
              <img
                src={model.image_url}
                alt={model.label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyOEMyNi4yMDkxIDI4IDI4IDI2LjIwOTEgMjggMjRDMjggMjEuNzkwOSAyNi4yMDkxIDIwIDI0IDIwQzIxLjc5MDkgMjAgMjAgMjEuNzkwOSAyMCAyNEMyMCAyNi4yMDkxIDIxLjc5MDkgMjggMjQgMjhaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yNCA0QzEyLjk1NDMgNCA0IDEyLjk1NDMgNCAyNFMxMi45NTQzIDQ0IDI0IDQ0QzM1LjA0NTcgNDQgNDQgMzUuMDQ1NyA0NCAyNFMzNS4wNDU3IDQgMjQgNFpNMjQgNDBDMTUuMTY0IDQwIDggMzIuODM2IDggMjRTMTUuMTY0IDggMjQgOEMzMi44MzYgOCA0MCAxNS4xNjQgNDAgMjRTMzIuODM2IDQwIDI0IDQwWiIgZmlsbD0iIzlCOUJBQCIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </button>
        ))}
      </div>
      <Tutorial isVisible={showTutorial} onClose={handleTutorialClose} />
    </div>
  );
}

export default ARPage;
