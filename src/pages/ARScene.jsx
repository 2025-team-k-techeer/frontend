// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
// export default function ARScene() {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     let scene, camera, renderer;
//     let reticle, selectionRing;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     const models = [
//       './dylan_armchair_yolk_yellow.glb',
//       './ivan_armchair_mineral_blue.glb',
//       './marble_coffee_table.glb',
//       './flippa_functional_coffee_table_w._storagewalnut.glb',
//       './frame_armchairpetrol_velvet_with_gold_frame.glb',
//       './elnaz_nesting_side_tables_brass__green_marble.glb',
//     ];
//     const modelScaleFactor = [0.01, 0.01, 0.005, 0.01, 0.01, 0.01];
//     const items = [];
//     const placedObjects = [];
//     let selectedObject = null;
//     const raycaster = new THREE.Raycaster();
//     let lastTapTime = 0;
//     let longPressTimer = null;
//     const LONG_PRESS_DELAY = 500;
//     const DRAG_THRESHOLD = 10;
//     let initialTouchX = 0,
//       initialTouchY = 0;
//     let isDragging = false;
//     let previousTouchX = 0;
//     // 초기화
//     function init() {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         70,
//         canvas.clientWidth / canvas.clientHeight,
//         0.01,
//         20
//       );
//       scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
//       renderer = new THREE.WebGLRenderer({
//         canvas,
//         antialias: true,
//         alpha: true,
//       });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//       renderer.xr.enabled = true;
//       // 조명 추정
//       const defaultLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
//       defaultLight.position.set(0.5, 1, 0.25);
//       scene.add(defaultLight);
//       const xrLight = new XREstimatedLight(renderer);
//       xrLight.addEventListener('estimationstart', () => {
//         scene.add(xrLight);
//         scene.remove(defaultLight);
//         if (xrLight.environment) scene.environment = xrLight.environment;
//       });
//       xrLight.addEventListener('estimationend', () => {
//         scene.add(defaultLight);
//         scene.remove(xrLight);
//       });
//       // AR 버튼
//       const arButton = ARButton.createButton(renderer, {
//         requiredFeatures: ['hit-test'],
//         optionalFeatures: ['dom-overlay', 'light-estimation'],
//         domOverlay: { root: document.body },
//       });
//       arButton.style.bottom = '20%';
//       document.body.appendChild(arButton);
//       // 모델 로드
//       models.forEach((url, i) => {
//         new GLTFLoader().load(url, ({ scene: glbScene }) => {
//           items[i] = glbScene;
//         });
//       });
//       // 레티클
//       reticle = new THREE.Mesh(
//         new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
//         new THREE.MeshBasicMaterial()
//       );
//       reticle.matrixAutoUpdate = false;
//       reticle.visible = false;
//       scene.add(reticle);
//       // 선택 링
//       selectionRing = new THREE.Mesh(
//         new THREE.RingGeometry(0.3, 0.35, 32).rotateX(-Math.PI / 2),
//         new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//       );
//       selectionRing.visible = false;
//       scene.add(selectionRing);
//       // 컨트롤러
//       const controller = renderer.xr.getController(0);
//       controller.addEventListener('select', onSelect);
//       scene.add(controller);
//       // 터치 이벤트
//       canvas.addEventListener('touchstart', onTouchStart, { passive: false });
//       canvas.addEventListener('touchmove', onTouchMove, { passive: false });
//       canvas.addEventListener('touchend', onTouchEnd, { passive: false });
//       canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });
//       window.addEventListener('resize', onWindowResize);
//     }
//     function onWindowResize() {
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     }
//     // AR 더블 탭 배치
//     function onSelect() {
//       const now = Date.now();
//       const diff = now - lastTapTime;
//       lastTapTime = now;
//       if (diff < 300 && reticle.visible) {
//         const newModel = items[itemSelectedIndex].clone();
//         reticle.matrix.decompose(
//           newModel.position,
//           newModel.quaternion,
//           newModel.scale
//         );
//         newModel.scale.multiplyScalar(modelScaleFactor[itemSelectedIndex]);
//         scene.add(newModel);
//         placedObjects.push(newModel);
//         selectObject(newModel);
//       }
//     }
//     function selectObject(object) {
//       let root = object;
//       while (root.parent && !placedObjects.includes(root)) root = root.parent;
//       if (!placedObjects.includes(root)) return;
//       if (selectedObject === root) return;
//       deselectObject();
//       selectedObject = root;
//       selectionRing.visible = true;
//       selectionRing.position.copy(root.position);
//       selectionRing.quaternion.copy(root.quaternion);
//     }
//     function deselectObject() {
//       selectedObject = null;
//       selectionRing.visible = false;
//     }
//     // 터치 입력 처리
//     function onTouchStart(e) {
//       if (e.target !== canvas) return;
//       initialTouchX = e.touches[0].clientX;
//       initialTouchY = e.touches[0].clientY;
//       if (e.touches.length === 1) {
//         longPressTimer = setTimeout(() => {
//           handleLongPress(e.touches[0].clientX, e.touches[0].clientY);
//         }, LONG_PRESS_DELAY);
//       } else if (e.touches.length === 2 && selectedObject) {
//         clearTimeout(longPressTimer);
//         isDragging = true;
//         previousTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
//       }
//     }
//     function handleLongPress(x, y) {
//       const rect = canvas.getBoundingClientRect();
//       const nx = ((x - rect.left) / rect.width) * 2 - 1;
//       const ny = -((y - rect.top) / rect.height) * 2 + 1;
//       raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
//       const hits = raycaster.intersectObjects(placedObjects, true);
//       if (hits.length) selectObject(hits[0].object);
//       else deselectObject();
//       longPressTimer = null;
//     }
//     function onTouchMove(e) {
//       if (longPressTimer && e.touches.length === 1) {
//         const dx = Math.abs(e.touches[0].clientX - initialTouchX);
//         const dy = Math.abs(e.touches[0].clientY - initialTouchY);
//         if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
//           clearTimeout(longPressTimer);
//           longPressTimer = null;
//         }
//       }
//       if (isDragging && selectedObject && e.touches.length === 2) {
//         e.preventDefault();
//         const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
//         const delta = cx - previousTouchX;
//         selectedObject.rotation.y += delta * 0.01;
//         previousTouchX = cx;
//       }
//     }
//     function onTouchEnd(e) {
//       if (longPressTimer) clearTimeout(longPressTimer);
//       isDragging = false;
//     }
//     function setupFurnitureSelection() {
//       models.forEach((_, i) => {
//         const el = document.querySelector(`#item${i}`);
//         if (!el) return;
//         el.addEventListener('beforexrselect', (e) => e.preventDefault());
//         el.addEventListener('click', (e) => {
//           e.preventDefault();
//           itemSelectedIndex = i;
//           deselectObject();
//           document
//             .querySelectorAll('.clicked')
//             .forEach((c) => c.classList.remove('clicked'));
//           el.classList.add('clicked');
//         });
//       });
//     }
//     function animate() {
//       renderer.setAnimationLoop(render);
//     }
//     function render(_t, frame) {
//       if (frame) {
//         const ref = renderer.xr.getReferenceSpace();
//         const sess = renderer.xr.getSession();
//         if (!hitTestSourceRequested) {
//           sess.requestReferenceSpace('viewer').then((refSpace) =>
//             sess.requestHitTestSource({ space: refSpace }).then((src) => {
//               hitTestSource = src;
//             })
//           );
//           sess.addEventListener('end', () => (hitTestSourceRequested = false));
//           hitTestSourceRequested = true;
//         }
//         if (hitTestSource) {
//           const res = frame.getHitTestResults(hitTestSource);
//           if (res.length) {
//             reticle.visible = true;
//             reticle.matrix.fromArray(res[0].getPose(ref).transform.matrix);
//           } else reticle.visible = false;
//         }
//       }
//       if (selectedObject) {
//         selectionRing.position.copy(selectedObject.position);
//         selectionRing.quaternion.copy(selectedObject.quaternion);
//       }
//       renderer.render(scene, camera);
//     }
//     init();
//     setupFurnitureSelection();
//     animate();
//     // 정리
//     return () => {
//       renderer.dispose();
//       window.removeEventListener('resize', onWindowResize);
//       canvas.removeEventListener('touchstart', onTouchStart);
//       canvas.removeEventListener('touchmove', onTouchMove);
//       canvas.removeEventListener('touchend', onTouchEnd);
//       canvas.removeEventListener('touchcancel', onTouchEnd);
//     };
//   }, []);
//   return (
//     <canvas
//       ref={canvasRef}
//       id="canvas"
//       style={{ width: '100%', height: '100vh', display: 'block' }}
//     />
//   );
// }
