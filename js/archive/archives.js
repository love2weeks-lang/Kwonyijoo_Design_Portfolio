/*
 * 아카이브 데이터. 다른 프로젝트는 같은 형태로 ARCHIVES에 추가한다.
 * 이미지 크기는 원본 px. 좌표는 각 아카이브 시안(archive/<폴더>/아카이브_*.jpg, 1920 기준).
 * 썸네일 이미지에 제목·설명·하단 정보가 이미 들어 있어 title·description·info는 화면에 다시 그리지 않고
 * 스크린 리더용 텍스트로만 쓴다.
 *
 * 항목 형태
 *   pages:     상세 팝업 페이지. 비어 있으면 FULL DESIGN 버튼이 없다
 *   carousel:  썸네일 안 슬라이드 (좌표는 썸네일 기준 px)
 *     cover:   슬라이드를 바꿀 때 썸네일에 그려진 첫 슬라이드를 가리는 영역과 색
 *     slides:  { images: [{ src, x, y, w, h }], label?: { src, x, y, w, h }, page: 열릴 팝업 페이지 }
 *     area:    드래그·스와이프·휠을 받는 영역
 *     arrows:  { left: { src, x, y }, right: { src, x, y } } (71×72)
 *     dots:    점 위치(centers, cy)와, 이미지에서 원형으로 잘라 쓸 활성·비활성 점
 *              ({ src, cx, cy, size, imgW, imgH }). 썸네일에 그려진 점을 가려야 하면 color
 */

// 빌드 도구가 경로를 찾을 수 있도록 new URL('리터럴', import.meta.url) 형태를 그대로 쓴다
const page = (label, images) => ({ label, images });
const image = (src, width, height) => ({ src, width, height });
const rect = (src, x, y, w, h) => ({ src, x, y, w, h });

const TALES_RUNNER = {
  id: 'tales-runner',
  number: '01',
  title: '테일즈런너',
  // 시안의 카드 x 234px: 정중앙(238px)보다 4px 왼쪽
  shiftX: -4,
  items: [
    {
      id: 'anniversary-21',
      title: '21주년 파티 랜딩페이지 TAB 1~2',
      description:
        '개발사 검수에서 수정 없이 최초 승인받았으며, 제작한 디자인과 그래픽 소스는 후속 홍보 콘텐츠의 제작 가이드로 활용되었습니다. AI를 활용해 초기 톤앤매너와 그래픽 구도를 검토하고, 인게임의 21주년 기념 케이크를 모티브로 메인 그래픽과 디저트 컨셉의 UI를 직접 제작했습니다. 팝업 및 인터랙션 리소스는 피그마 컴포넌트로 분리하여 전달해 개발 연계를 지원했습니다.',
      thumb: image(new URL('../../archive/01_테일즈런너/테런_1_21주년 썸네일.png', import.meta.url).href, 1444, 1181),
      offsetX: 0,
      info: { date: '2026.09', period: '8일', contribution: '100%', tools: ['Photoshop', 'Illustrator', 'Figma'], ai: '레퍼런스 탐색 · 그래픽 구도 시뮬레이션' },
      pages: [
        page('TAB 1', [
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭1_sec1.jpg', import.meta.url).href, 1152, 835),
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭1_sec2.jpg', import.meta.url).href, 1152, 835),
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭1_sec3.jpg', import.meta.url).href, 1152, 835),
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭1_sec4.jpg', import.meta.url).href, 1152, 835),
        ]),
        page('TAB 2', [
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭2_sec1.jpg', import.meta.url).href, 1152, 968),
          image(new URL('../../archive/01_테일즈런너/1_21주년 랜딩페이지/21주년_탭2_sec2.jpg', import.meta.url).href, 1152, 967),
        ]),
      ],
    },
    {
      id: 'sugar-rune',
      title: '슈가슈가룬 콜라보 랜딩페이지 TAB 1~3',
      description:
        '슈가슈가룬 IP의 세계관과 캐릭터별 특성을 사전 분석해 [피에르와 티타임] 웹 이벤트의 스토리보드 기획을 주도했으며, IP에 대한 높은 이해도를 바탕으로 원작사 검수를 수정 없이 통과했습니다. 원작 디자인 가이드를 준수해 AI 없이 마법소녀 특유의 비주얼을 직접 구현했습니다. 또한 키비주얼 모션 스펙 문서를 작성해 원활한 개발 협업에 기여했습니다.',
      thumb: image(new URL('../../archive/01_테일즈런너/테런_2_슈가슈가룬 썸네일.png', import.meta.url).href, 1459, 1184),
      offsetX: -1,
      info: { date: '2026.08', period: '16일', contribution: '100%', tools: ['Photoshop', 'Illustrator', 'Figma'], ai: 'X' },
      pages: [
        page('TAB 1', [
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭1_sec1.jpg', import.meta.url).href, 1152, 1649),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭1_sec2.jpg', import.meta.url).href, 1152, 1279),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭1_sec3.jpg', import.meta.url).href, 1152, 1401),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭1_sec4.jpg', import.meta.url).href, 1152, 1527),
        ]),
        page('TAB 2', [
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭2_sec1.jpg', import.meta.url).href, 1152, 2595),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭2_sec2.jpg', import.meta.url).href, 1152, 2595),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭2_sec3.jpg', import.meta.url).href, 1152, 2595),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭2_sec4.jpg', import.meta.url).href, 1152, 2595),
        ]),
        page('TAB 3', [
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭3_sec1.jpg', import.meta.url).href, 1152, 1007),
          image(new URL('../../archive/01_테일즈런너/2_슈가슈가룬 콜라보/슈가슈가룬_탭3_sec2.jpg', import.meta.url).href, 1152, 1006),
        ]),
      ],
    },
    {
      id: 'daegu-content-fair',
      title: '대구콘텐츠페어 행사 안내 랜딩페이지',
      description:
        '대구콘텐츠페어 공식 포스터의 사이버틱한 무드를 재해석해 키비주얼 그래픽을 제작했습니다. 네온 컬러와 게임 UI 형태의 프레임을 활용해 콘셉트의 일관성을 유지하고, 섹션별 컬러 구분으로 정보 가독성을 높였습니다. 키비주얼 타이틀은 AI를 활용해 메탈릭 효과를 디벨롭하며 비주얼 완성도를 높였습니다.',
      thumb: image(new URL('../../archive/01_테일즈런너/테런_3_대구콘텐츠페어 썸네일.png', import.meta.url).href, 1444, 1179),
      offsetX: 0,
      info: { date: '2026.09', period: '5일', contribution: '100%', tools: ['Photoshop', 'Illustrator', 'Figma'], ai: '키비주얼 타이틀 메탈릭 효과 구현' },
      pages: [
        page('', [
          image(new URL('../../archive/01_테일즈런너/3_대구콘텐츠페어/대콘페_sec1.jpg', import.meta.url).href, 1152, 1269),
          image(new URL('../../archive/01_테일즈런너/3_대구콘텐츠페어/대콘페_sec2.jpg', import.meta.url).href, 1152, 1269),
          image(new URL('../../archive/01_테일즈런너/3_대구콘텐츠페어/대콘페_sec3.jpg', import.meta.url).href, 1152, 2538),
        ]),
      ],
    },
    {
      id: 'idea-festival',
      title: '아이디어 페스티벌 랜딩페이지 1~3차',
      description:
        '유저 공모전의 참여 안내부터 출품작 투표, 최종 결과 발표까지 총 3차에 걸친 이벤트 페이지를 제작했습니다. 손그림 스타일의 그래픽과 파스텔 컬러로 친근한 분위기를 구현하고, 이벤트 단계별 목적에 맞춰 UI를 설계했습니다. 투표 팝업과 출품작 카드 등 다양한 UI 리소스를 제작 및 관리하여 전체 페이지의 시각적 일관성을 유지했습니다.',
      thumb: image(new URL('../../archive/01_테일즈런너/테런_4_아이디어페스티벌_썸네일.png', import.meta.url).href, 1444, 1179),
      offsetX: 0,
      info: { date: '2026.2Q', period: '각 7~8일', contribution: '100%', tools: ['Photoshop', 'Illustrator', 'Figma'], ai: 'X' },
      pages: [
        page('1차', [
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_1차_sec1.jpg', import.meta.url).href, 1152, 2262),
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_1차_sec2.jpg', import.meta.url).href, 1152, 2261),
        ]),
        page('2차', [
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_2차_sec1.jpg', import.meta.url).href, 1152, 1467),
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_2차_sec2.jpg', import.meta.url).href, 1152, 1466),
        ]),
        page('3차', [
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_3차_sec1.jpg', import.meta.url).href, 1152, 1439),
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_3차_sec2.jpg', import.meta.url).href, 1152, 1439),
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_3차_sec3.jpg', import.meta.url).href, 1152, 1439),
          image(new URL('../../archive/01_테일즈런너/4_아이디어페스티벌/아이디어페스티벌_3차_sec4.jpg', import.meta.url).href, 1152, 1439),
        ]),
      ],
    },
    {
      id: 'runners-closet',
      title: '런너의 옷장 2026 1~3Q',
      description:
        '정기 업데이트에 맞춰 신규 코스튬을 소개하는 프로모션 페이지를 제작했습니다. 코스튬별 컨셉을 반영한 타이틀과 배경 그래픽으로 각 업데이트의 개성을 살리고, 기존 UI 가이드에 맞춰 콘텐츠를 구성해 전체 페이지의 일관성을 유지했습니다.',
      thumb: image(new URL('../../archive/01_테일즈런너/테런_5_런너의옷장 썸네일.png', import.meta.url).href, 1444, 1139),
      offsetX: 0,
      info: { date: '', period: '각 1~1.5일', contribution: '100%', tools: ['Photoshop', 'Illustrator', 'Figma'], ai: 'X' },
      /*
       * 썸네일 안의 슬라이드. 시안은 썸네일06을 첫 번째(첫 점 활성)로 보여 주므로 최신순으로 둔다.
       * page: 같은 회차의 상세 페이지(pages) 인덱스
       */
      carousel: {
        slides: [
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일06.png', import.meta.url).href, 2, 289, 1440, 584)], page: 5 },
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일05.png', import.meta.url).href, 2, 289, 1440, 584)], page: 4 },
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일04.png', import.meta.url).href, 2, 289, 1440, 584)], page: 3 },
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일03.png', import.meta.url).href, 2, 289, 1440, 584)], page: 2 },
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일02.png', import.meta.url).href, 2, 289, 1440, 584)], page: 1 },
          { images: [rect(new URL('../../archive/01_테일즈런너/5_런너의옷장/썸네일01.png', import.meta.url).href, 2, 289, 1440, 584)], page: 0 },
        ],
        arrows: {
          left: { src: new URL('../../archive/01_테일즈런너/5_런너의옷장/화살표_왼쪽_이미지안쪽.png', import.meta.url).href, x: 43, y: 546 },
          right: { src: new URL('../../archive/01_테일즈런너/5_런너의옷장/화살표_오른쪽_이미지안쪽.png', import.meta.url).href, x: 1341, y: 546 },
        },
        area: { x: 2, y: 289, w: 1440, h: 584 },
        // 런너의옷장_스크롤_원6개.png 한 장에서 활성(빈 원)·비활성(채운 원) 점을 잘라 쓴다
        dots: {
          x: 671,
          y: 956,
          w: 102,
          h: 10,
          color: '#03010c',
          centers: [4.5, 23, 42, 61.5, 79.5, 97.5],
          cy: 5,
          active: { src: new URL('../../archive/01_테일즈런너/5_런너의옷장/런너의옷장_스크롤_원6개.png', import.meta.url).href, cx: 4.5, cy: 5, size: 10, imgW: 102, imgH: 10 },
          inactive: { src: new URL('../../archive/01_테일즈런너/5_런너의옷장/런너의옷장_스크롤_원6개.png', import.meta.url).href, cx: 23, cy: 5, size: 10, imgW: 102, imgH: 10 },
        },
      },
      pages: [
        page('01', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지01.png', import.meta.url).href, 1152, 2697)]),
        page('02', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지02.png', import.meta.url).href, 1152, 1232)]),
        page('03', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지03.png', import.meta.url).href, 1152, 3512)]),
        page('04', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지04.png', import.meta.url).href, 1152, 2661)]),
        page('05', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지05.png', import.meta.url).href, 1152, 3430)]),
        page('06', [image(new URL('../../archive/01_테일즈런너/5_런너의옷장/런옷_페이지06.png', import.meta.url).href, 1152, 5596)]),
      ],
    },
  ],
};

const LINEAGE_TOOLS = ['Photoshop', '이미지 생성 AI'];

const LINEAGE_REMASTERED = {
  id: 'lineage-remastered',
  number: '02',
  title: '리니지 리마스터',
  shiftX: -4,
  items: [
    {
      id: 'reward-banner',
      title: '보상 배너[제안]',
      description:
        '2종의 배너 시안을 제안해 프로젝트 수주에 기여했습니다. [열정이 식은 이에게 시그니처의 영광을!]이라는 메인 카피를 냉기와 화염의 대비로 시각화했습니다. 불꽃의 강렬함을 강조한 A안, 냉기와 화염의 대비를 강조한 B안으로 각각 차별화된 비주얼을 구현했습니다.',
      thumb: image(new URL('../../archive/02_리니지리마스터/리니지_1_보상배너_썸네일.png', import.meta.url).href, 1445, 892),
      offsetX: 0,
      info: { date: '2024.11', period: '2일', contribution: '100%', tools: ['Photoshop', 'Illustrator', '이미지 생성 AI'], ai: '배경 이미지 생성' },
      pages: [],
    },
    {
      id: 'update-notes',
      title: '업데이트 노트 2025 1Q ~ 2026 1Q',
      description:
        '비주얼 컨셉 기획부터 키비주얼 및 디자인 템플릿 제작까지 전담하며, 전년 대비 조회수 약 70% 증가와 1분기 계약 연장에 기여했습니다. 분기별 업데이트에 맞춰 비주얼을 리뉴얼하고, 주 1회 발행되는 콘텐츠의 정기 운영을 담당했습니다. 또한 디자인 템플릿을 가이드화해 내부 디자이너들과 공유하고, 작업 기준을 표준화하여 제작 및 협업 효율을 높였습니다.',
      thumb: image(new URL('../../archive/02_리니지리마스터/리니지_2_업데이트노트_썸네일.png', import.meta.url).href, 1445, 1182),
      offsetX: 0,
      info: { date: '', period: '분기별 3일', contribution: '100%', tools: LINEAGE_TOOLS, ai: 'UI 장식 및 버튼 디자인 보조 · 배경 이미지 제작' },
      // 슬라이드: 2025 1/2Q, 2025 3/4Q, 2026 1Q. 하단 라벨 이미지에 점(현재 위치)이 함께 그려져 있다
      carousel: {
        cover: { x: 83, y: 218, w: 1278, h: 810, color: '#03010c' },
        area: { x: 2, y: 218, w: 1441, h: 810 },
        slides: [
          {
            images: [
              rect(new URL('../../archive/02_리니지리마스터/251Q썸네일.png', import.meta.url).href, 83, 218, 620, 810),
              rect(new URL('../../archive/02_리니지리마스터/252Q썸네일.png', import.meta.url).href, 742, 218, 619, 810),
            ],
            label: rect(new URL('../../archive/02_리니지리마스터/2025 1 _ 2Q.png', import.meta.url).href, 666, 962, 114, 47),
            name: '2025 1/2Q',
            page: 0,
          },
          {
            images: [
              rect(new URL('../../archive/02_리니지리마스터/253Q썸네일.png', import.meta.url).href, 83, 218, 619, 810),
              rect(new URL('../../archive/02_리니지리마스터/254Q썸네일.png', import.meta.url).href, 742, 218, 619, 810),
            ],
            label: rect(new URL('../../archive/02_리니지리마스터/2025 3 _ 4Q.png', import.meta.url).href, 663, 962, 119, 47),
            name: '2025 3/4Q',
            page: 2,
          },
          {
            images: [rect(new URL('../../archive/02_리니지리마스터/261Q썸네일.png', import.meta.url).href, 413, 218, 619, 810)],
            label: rect(new URL('../../archive/02_리니지리마스터/2026 1Q.png', import.meta.url).href, 680, 962, 84, 47),
            name: '2026 1Q',
            page: 4,
          },
        ],
        arrows: {
          left: { src: new URL('../../archive/02_리니지리마스터/화살표_왼쪽_이미지안쪽.png', import.meta.url).href, x: 41, y: 587 },
          right: { src: new URL('../../archive/02_리니지리마스터/화살표_오른쪽_이미지안쪽.png', import.meta.url).href, x: 1332, y: 587 },
        },
      },
      pages: [
        page('2025 1Q', [
          image(new URL('../../archive/02_리니지리마스터/20251Q_sec1.jpg', import.meta.url).href, 960, 2730),
          image(new URL('../../archive/02_리니지리마스터/20251Q_sec2.jpg', import.meta.url).href, 960, 2730),
          image(new URL('../../archive/02_리니지리마스터/20251Q_sec3.jpg', import.meta.url).href, 960, 2730),
          image(new URL('../../archive/02_리니지리마스터/20251Q_sec4.jpg', import.meta.url).href, 960, 2729),
        ]),
        page('2025 2Q', [
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec1.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec2.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec3.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec4.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec5.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec6.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec7.jpg', import.meta.url).href, 960, 2531),
          image(new URL('../../archive/02_리니지리마스터/20252Q_sec8.jpg', import.meta.url).href, 960, 2530),
        ]),
        page('2025 3Q', [
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec1.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec2.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec3.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec4.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec5.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec6.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec7.jpg', import.meta.url).href, 960, 3004),
          image(new URL('../../archive/02_리니지리마스터/20253Q_sec8.jpg', import.meta.url).href, 960, 3003),
        ]),
        page('2025 4Q', [
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec1.jpg', import.meta.url).href, 960, 1867),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec2.jpg', import.meta.url).href, 960, 1867),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec3.jpg', import.meta.url).href, 960, 1867),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec4.jpg', import.meta.url).href, 960, 1866),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec5.jpg', import.meta.url).href, 960, 1867),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec6.jpg', import.meta.url).href, 960, 1867),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec7.jpg', import.meta.url).href, 960, 3733),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec8.jpg', import.meta.url).href, 960, 3734),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec9.jpg', import.meta.url).href, 960, 3733),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec10.jpg', import.meta.url).href, 960, 3733),
          image(new URL('../../archive/02_리니지리마스터/20254Q_sec11.jpg', import.meta.url).href, 960, 3733),
        ]),
        page('2026 1Q', [
          image(new URL('../../archive/02_리니지리마스터/20261Q_sec1.jpg', import.meta.url).href, 960, 3458),
          image(new URL('../../archive/02_리니지리마스터/20261Q_sec2.jpg', import.meta.url).href, 960, 3457),
          image(new URL('../../archive/02_리니지리마스터/20261Q_sec3.jpg', import.meta.url).href, 960, 3458),
          image(new URL('../../archive/02_리니지리마스터/20261Q_sec4.jpg', import.meta.url).href, 960, 3457),
        ]),
      ],
    },
    {
      id: 'execution-sword-banner',
      title: '업데이트 광고 배너[집행]',
      description:
        '디펜스 미니게임 업데이트 홍보를 위해 제작한 배너입니다. 캐주얼한 캐릭터 리소스에 집행검의 강렬한 이펙트를 더해 MMORPG 특유의 전투 감성을 강조했습니다. 블루와 레드의 대비되는 컬러 구도와 대칭형 레이아웃을 활용하여 팀 대항전의 경쟁 구도를 직관적으로 표현했습니다.',
      thumb: image(new URL('../../archive/02_리니지리마스터/리니지_3_집행검배너_썸네일.png', import.meta.url).href, 1466, 1140),
      offsetX: 0,
      info: { date: '2025.09', period: '1.5일', contribution: '100%', tools: ['Photoshop'], ai: 'X' },
      pages: [],
    },
  ],
};

const CHAOS_ZERO_NIGHTMARE = {
  id: 'chaos-zero-nightmare',
  number: '03',
  title: '카오스 제로 나이트메어',
  shiftX: 0,
  items: [
    {
      id: 'launch-banner',
      title: '런칭 배너[제안]',
      description:
        '[모든 것이 제로]라는 메인 카피를 소멸 효과로 시각화한 비주얼 아이디어를 제안해 프로젝트 수주에 기여했습니다. 캐릭터가 재처럼 흩어지는 연출을 표현해, 해당 아이디어는 내부적으로 긍정적인 평가를 받아 다른 제안 시안에도 확장 적용되었습니다.',
      thumb: image(new URL('../../archive/03_카오스제로나이트메어/카제나_1_런칭배너_썸네일.png', import.meta.url).href, 1444, 1139),
      offsetX: 0,
      info: { date: '2024.07', period: '2일', contribution: '100%', tools: ['Photoshop', 'Illustrator', '이미지 생성 AI'], ai: '캐릭터 포즈 변형' },
      pages: [],
    },
    {
      id: 'infographic',
      title: '인포그래픽 페이지[집행]',
      description:
        '다양한 통계 데이터를 시각화한 인포그래픽 페이지를 하루 만에 제작했으며, 완성된 콘텐츠는 언론 기사에도 게재되었습니다. 덱빌딩 게임의 특성을 반영한 카드형 UI와 SF 그래픽, 노이즈 효과를 활용해 게임 특유의 다크한 분위기를 구현했습니다.',
      thumb: image(new URL('../../archive/03_카오스제로나이트메어/카제나_2_인포그래픽_집행.png', import.meta.url).href, 1444, 1143),
      offsetX: 0,
      info: { date: '2025.11', period: '1일', contribution: '100%', tools: ['Photoshop', 'Illustrator'], ai: 'X' },
      pages: [
        page('', [
          image(new URL('../../archive/03_카오스제로나이트메어/인포그래픽_sec1.jpg', import.meta.url).href, 1152, 2231),
          image(new URL('../../archive/03_카오스제로나이트메어/인포그래픽_sec2.jpg', import.meta.url).href, 1152, 2231),
          image(new URL('../../archive/03_카오스제로나이트메어/인포그래픽_sec3.jpg', import.meta.url).href, 1152, 2231),
          image(new URL('../../archive/03_카오스제로나이트메어/인포그래픽_sec4.jpg', import.meta.url).href, 1152, 2231),
        ]),
      ],
    },
  ],
};

const ALKERON = {
  id: 'alkeron',
  number: '04',
  title: '알케론',
  shiftX: 0,
  items: [
    {
      id: 'launch-key-visual',
      title: '런칭 키비주얼[제안]',
      description:
        '[누구와 오를 것인가]라는 메인 카피를 시각화한 키비주얼을 제안해 프로젝트 수주에 기여했습니다. 게임의 핵심 시스템인 자기장과 상승형 플레이 구조를 바탕으로 카피와 일관된 탑뷰 구도를 연출했습니다.',
      thumb: image(new URL('../../archive/04_알케론/알케론_1_런칭KV_썸네일.png', import.meta.url).href, 1444, 1139),
      offsetX: 0,
      info: { date: '2025.05', period: '2일', contribution: '100%', tools: ['Photoshop', 'Illustrator', '이미지 생성 AI'], ai: '캐릭터 포즈 및 구도 변형' },
      pages: [],
    },
    {
      id: 'launch-banner',
      title: '런칭 광고 배너[집행]',
      description:
        '게임의 비주얼 가이드를 분석하고 브랜드 톤앤매너를 준수하여 제작했습니다. 역동적인 캐릭터 비주얼과 대형 타이포그래피를 활용하여 메인 카피의 주목도를 높였습니다.',
      thumb: image(new URL('../../archive/04_알케론/알케론_2_런칭배너_썸네일.png', import.meta.url).href, 1444, 1142),
      offsetX: 0,
      info: { date: '2026.01', period: '0.5일', contribution: '100%', tools: ['Photoshop'], ai: 'X' },
      pages: [],
    },
    {
      id: 'community-event',
      title: '커뮤니티 이벤트 페이지[집행]',
      description:
        '제공된 메인 키비주얼을 기반으로 하단 콘텐츠 전체를 디자인했습니다. 게임의 다크 판타지 톤앤매너를 유지하면서 장식형 프레임과 UI 요소를 활용해 이벤트 소개부터 참여 방법 및 보상까지 복잡한 정보를 직관적으로 전달할 수 있도록 구성했습니다.',
      thumb: image(new URL('../../archive/04_알케론/알케론_3_이벤트페이지_썸네일.png', import.meta.url).href, 1444, 1140),
      offsetX: 0,
      info: { date: '2026.02', period: '0.5일', contribution: '80%', tools: ['Photoshop'], ai: 'X' },
      pages: [
        page('', [
          image(new URL('../../archive/04_알케론/이벤트페이지_sec1.jpg', import.meta.url).href, 960, 1837),
          image(new URL('../../archive/04_알케론/이벤트페이지_sec2.jpg', import.meta.url).href, 960, 1836),
          image(new URL('../../archive/04_알케론/이벤트페이지_sec3.jpg', import.meta.url).href, 960, 1836),
          image(new URL('../../archive/04_알케론/이벤트페이지_sec4.jpg', import.meta.url).href, 960, 1836),
        ]),
      ],
    },
  ],
};

const SINWOL_DONGHAENG = {
  id: 'sinwol-donghaeng',
  number: '05',
  title: '신월동행',
  shiftX: 0,
  items: [
    {
      id: 'launch-banner-proposal',
      title: '런칭 광고 배너[제안/집행]',
      description:
        '인게임의 수학 공식과 자 모티브 UI, 공식 컬러를 활용하여 캐릭터의 역동적인 전투 장면을 강조한 런칭 배너를 제안했습니다. 해당 시안은 캠페인 수주에 기여했으며, 실제 광고 소재로 채택되어 집행되었습니다.',
      thumb: image(new URL('../../archive/05_신월동행/신월동행_1_배너.png', import.meta.url).href, 1444, 1144),
      offsetX: 0,
      info: { date: '2024.12', period: '2일', contribution: '100%', tools: ['Photoshop', 'Illustrator'], ai: 'X' },
      pages: [],
    },
    {
      id: 'launch-banner',
      title: '런칭 광고 배너[집행]',
      description:
        '인게임 플레이 시 캐릭터의 뒷모습이 보이는 특징을 활용하고, 메인 카피와 비주얼의 일관성을 강조했습니다. 서브컬처 장르 특유의 화려한 색감을 살려 캐릭터별 컬러와 UI를 차별화했으며, 역동적인 구도를 통해 전투의 긴장감과 각 캐릭터의 개성을 표현했습니다.',
      thumb: image(new URL('../../archive/05_신월동행/신월동행_2_배너.png', import.meta.url).href, 1444, 1145),
      offsetX: 0,
      info: { date: '2025.07', period: '1.5일', contribution: '100%', tools: ['Photoshop', 'Illustrator'], ai: 'X' },
      pages: [],
    },
  ],
};

// 배틀그라운드 캐러셀: 슬라이드 이미지(1444~1445×814)가 썸네일 안 패널 전체를 덮는다.
// 화살표는 06 폴더에 따로 없어 같은 디자인의 02 폴더 이미지를 쓰고,
// 점은 원N개.png(비활성)와 썸네일에 그려진 흰 점(활성)을 잘라 쓴다
const PUBG_ARROW_LEFT = new URL('../../archive/02_리니지리마스터/화살표_왼쪽_이미지안쪽.png', import.meta.url).href;
const PUBG_ARROW_RIGHT = new URL('../../archive/02_리니지리마스터/화살표_오른쪽_이미지안쪽.png', import.meta.url).href;
const PUBG_DOTS_3 = new URL('../../archive/06_배틀그라운드/원3개.png', import.meta.url).href;
const PUBG_DOTS_2 = new URL('../../archive/06_배틀그라운드/원2개.png', import.meta.url).href;
const PUBG_THUMB_CHUSEOK = new URL('../../archive/06_배틀그라운드/배그_2_추석캐러셀.png', import.meta.url).href;
const PUBG_THUMB_SEMESTER = new URL('../../archive/06_배틀그라운드/배그_4_신학기콘텐츠.png', import.meta.url).href;
const PUBG_THUMB_EMART = new URL('../../archive/06_배틀그라운드/배그_5_이마트.png', import.meta.url).href;

const BATTLEGROUNDS = {
  id: 'battlegrounds',
  number: '06',
  title: '배틀그라운드',
  shiftX: 0,
  items: [
    {
      id: 'fbr-mode',
      title: 'FBR모드 업데이트 배너[집행]',
      description:
        '캐릭터들의 개성 있는 비주얼, 입체적인 타이포그래피를 활용하여 유쾌한 컨셉의 캠페인 배너를 제작했습니다. FBR 모드 특유의 코믹하고 레트로한 인게임 분위기를 강조하기 위해 빈티지한 목재 간판과 액자 프레임을 활용했습니다.',
      thumb: image(new URL('../../archive/06_배틀그라운드/배그_1_FBR모드.png', import.meta.url).href, 1444, 1139),
      offsetX: 0,
      info: { date: '2024.07', period: '2일', contribution: '100%', tools: ['Photoshop'], ai: 'X' },
      pages: [],
    },
    {
      id: 'chuseok-carousel',
      title: '한가위 대작전 캐러셀 이미지[집행]',
      description:
        '추석 시즌 분위기를 살리기 위해 AI를 활용하여 캐릭터에 한복을 적용하고, 전통 문양과 한국적인 UI 요소를 활용해 이벤트 캐러셀 이미지를 제작했습니다. 제작한 이미지는 배틀그라운드 공식 인스타그램 채널에 게시되었습니다.',
      thumb: image(PUBG_THUMB_CHUSEOK, 1444, 1140),
      offsetX: 0,
      info: { date: '2024.09', period: '1일', contribution: '100%', tools: ['Photoshop', '이미지 생성 AI'], ai: '캐릭터 의상 변형 · 의상 디테일 보정' },
      carousel: {
        slides: [
          { images: [rect(new URL('../../archive/06_배틀그라운드/_2_추석캐러셀_01.png', import.meta.url).href, 0, 175, 1444, 814)], page: 0 },
          { images: [rect(new URL('../../archive/06_배틀그라운드/_2_추석캐러셀_02.png', import.meta.url).href, 0, 175, 1444, 814)], page: 0 },
          { images: [rect(new URL('../../archive/06_배틀그라운드/_2_추석캐러셀_03.png', import.meta.url).href, 0, 175, 1444, 814)], page: 0 },
        ],
        area: { x: 0, y: 175, w: 1444, h: 814 },
        arrows: { left: { src: PUBG_ARROW_LEFT, x: 37, y: 547 }, right: { src: PUBG_ARROW_RIGHT, x: 1335, y: 547 } },
        dots: {
          x: 699, y: 959, w: 46, h: 9,
          centers: [3.5, 22.5, 41.5],
          cy: 4,
          active: { src: PUBG_THUMB_CHUSEOK, cx: 702.5, cy: 962.5, size: 6, imgW: 1444, imgH: 1140 },
          inactive: { src: PUBG_DOTS_3, cx: 3.5, cy: 4.5, size: 8, imgW: 46, imgH: 9 },
        },
      },
      pages: [],
    },
    {
      id: 'hot-drop-mode',
      title: '핫드랍모드 업데이트 배너[집행]',
      description:
        '배틀그라운드 공식 유튜브 채널의 핫드랍 모드 영상 썸네일로도 활용된 배너입니다. 광고 모델 랄로와 괴물쥐를 인게임 캐릭터처럼 합성하고, 좁은 자기장과 다수의 낙하산을 배치해 핫드랍 모드 특유의 긴박감과 역동성을 강조했습니다.',
      thumb: image(new URL('../../archive/06_배틀그라운드/배그_3_핫드랍모드.png', import.meta.url).href, 1444, 1141),
      offsetX: 0,
      info: { date: '2024.10', period: '2일', contribution: '100%', tools: ['Photoshop'], ai: 'X' },
      pages: [],
    },
    {
      id: 'new-semester-carousel',
      title: '신학기 콘텐츠 캐러셀 이미지[집행]',
      description:
        '봄 시즌 개강 컨셉에 맞춰 핑크 컬러와 노트 배경, 손그림 낙서 요소를 활용해 이벤트의 주제인 패션 콘테스트를 직관적으로 표현했습니다. 제작한 이미지는 배틀그라운드 공식 인스타그램 채널에 게시되었습니다.',
      thumb: image(PUBG_THUMB_SEMESTER, 1445, 1139),
      offsetX: -1,
      info: { date: '2025.03', period: '1일', contribution: '100%', tools: ['Photoshop', 'Illustrator'], ai: 'X' },
      carousel: {
        slides: [
          { images: [rect(new URL('../../archive/06_배틀그라운드/4_신학기콘텐츠_01.png', import.meta.url).href, 0, 174, 1445, 814)], page: 0 },
          { images: [rect(new URL('../../archive/06_배틀그라운드/4_신학기콘텐츠_02.png', import.meta.url).href, 0, 174, 1445, 814)], page: 0 },
          { images: [rect(new URL('../../archive/06_배틀그라운드/4_신학기콘텐츠_03.png', import.meta.url).href, 0, 174, 1445, 814)], page: 0 },
        ],
        area: { x: 0, y: 174, w: 1445, h: 814 },
        arrows: { left: { src: PUBG_ARROW_LEFT, x: 38, y: 546 }, right: { src: PUBG_ARROW_RIGHT, x: 1336, y: 546 } },
        dots: {
          x: 700, y: 958, w: 46, h: 9,
          centers: [3.5, 22.5, 41.5],
          cy: 4,
          active: { src: PUBG_THUMB_SEMESTER, cx: 703.5, cy: 961.5, size: 6, imgW: 1445, imgH: 1139 },
          inactive: { src: PUBG_DOTS_3, cx: 3.5, cy: 4.5, size: 8, imgW: 46, imgH: 9 },
        },
      },
      pages: [],
    },
    {
      id: 'emart24-carousel',
      title: '이마트24 콜라보 캐러셀 이미지[집행]',
      description:
        '배틀그라운드 X 이마트24 콜라보 컨셉에 맞춰 AI로 캐릭터의 포즈를 변형하고, 편의점에서 먹방 준비를 하는 상황을 연출했습니다. 제작한 이미지는 배틀그라운드 공식 인스타그램 채널에 게시되었으며, AI 활용 및 비주얼 완성도에 대해 광고주로부터 긍정적인 평가를 받았습니다.',
      thumb: image(PUBG_THUMB_EMART, 1490, 1168),
      offsetX: -1,
      info: { date: '2025.04', period: '1일', contribution: '100%', tools: ['Photoshop', 'Illustrator', '이미지 생성 AI'], ai: '캐릭터 포즈 변경' },
      // 썸네일에는 02가 그려져 있지만 시안은 01을 첫 장(첫 점 활성)으로 보여 준다
      carousel: {
        slides: [
          { images: [rect(new URL('../../archive/06_배틀그라운드/5_이마트_01.png', import.meta.url).href, 0, 203, 1445, 814)], page: 0 },
          { images: [rect(new URL('../../archive/06_배틀그라운드/5_이마트_02.png', import.meta.url).href, 0, 203, 1445, 814)], page: 0 },
        ],
        area: { x: 0, y: 203, w: 1445, h: 814 },
        arrows: { left: { src: PUBG_ARROW_LEFT, x: 38, y: 576 }, right: { src: PUBG_ARROW_RIGHT, x: 1336, y: 576 } },
        dots: {
          x: 709, y: 987, w: 28, h: 9,
          centers: [4, 23],
          cy: 4,
          active: { src: PUBG_THUMB_EMART, cx: 713, cy: 990.5, size: 6, imgW: 1490, imgH: 1168 },
          inactive: { src: PUBG_DOTS_2, cx: 4, cy: 4.5, size: 8, imgW: 28, imgH: 9 },
        },
      },
      pages: [],
    },
  ],
};

/** 헤더 순서. archive가 없는 프로젝트는 아직 이동할 수 없다 */
export const ARCHIVE_NAV = [
  { id: 'tales-runner', label: '01 테일즈런너', hit: [0, 162] },
  { id: 'lineage-remastered', label: '02 리니지 리마스터', hit: [222, 452] },
  { id: 'chaos-zero-nightmare', label: '03 카오스 제로 나이트메어', hit: [512, 826] },
  { id: 'alkeron', label: '04 알케론', hit: [886, 1006] },
  { id: 'sinwol-donghaeng', label: '05 신월동행', hit: [1066, 1212] },
  { id: 'battlegrounds', label: '06 배틀그라운드', hit: [1271, 1468] },
];

/** 헤더 텍스트 이미지. 프로젝트별 활성 이미지가 생기면 여기에 추가 */
export const HEADER_TEXT = {
  'tales-runner': new URL('../../archive/헤더TXT_01on.png', import.meta.url).href,
  'lineage-remastered': new URL('../../archive/헤더TXT_02on.png', import.meta.url).href,
  'chaos-zero-nightmare': new URL('../../archive/헤더TXT_03on.png', import.meta.url).href,
  alkeron: new URL('../../archive/헤더TXT_04on.png', import.meta.url).href,
  'sinwol-donghaeng': new URL('../../archive/헤더TXT_05on.png', import.meta.url).href,
  battlegrounds: new URL('../../archive/헤더TXT_06on.png', import.meta.url).href,
};

export const ARCHIVES = {
  'tales-runner': TALES_RUNNER,
  'lineage-remastered': LINEAGE_REMASTERED,
  'chaos-zero-nightmare': CHAOS_ZERO_NIGHTMARE,
  alkeron: ALKERON,
  'sinwol-donghaeng': SINWOL_DONGHAENG,
  battlegrounds: BATTLEGROUNDS,
};

export const UI = {
  headerBox: new URL('../../archive/헤더박스.png', import.meta.url).href,
  headerBack: new URL('../../archive/헤더_뒤로가기.png', import.meta.url).href,
  buttonOff: new URL('../../archive/BTN_Off.png', import.meta.url).href,
  buttonOn: new URL('../../archive/BTN_On.png', import.meta.url).href,
  popupClose: new URL('../../archive/팝업_x.png', import.meta.url).href,
  popupArrowLeft: new URL('../../archive/팝업화살표_왼쪽.png', import.meta.url).href,
  popupArrowRight: new URL('../../archive/팝업화살표_오른쪽.png', import.meta.url).href,
  popupScrollbar: new URL('../../archive/팝업_스크롤바.png', import.meta.url).href,
  pageTop: new URL('../../archive/탑버튼.png', import.meta.url).href,
  // 마우스 오버: 보라색(#a796e5) 부분을 #f8f5ff로 바꾼 이미지
  pageTopOn: new URL('../../archive/탑버튼_on.png', import.meta.url).href,
};
