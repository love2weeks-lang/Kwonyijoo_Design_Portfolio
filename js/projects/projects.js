import card01 from '../../project/카드01_ff1ed4.png';
import card02 from '../../project/카드02_ff2d2d.png';
import card03 from '../../project/카드03_ae02ff.png';
import card04 from '../../project/카드04_00c5a6.png';
import card05 from '../../project/카드05_ff6a27.png';
import card06 from '../../project/카드06_ff9700.png';
import info01 from '../../project/카드01_설명글.png';
import info02 from '../../project/카드02_설명글.png';
import info03 from '../../project/카드03_설명글.png';
import info04 from '../../project/카드04_설명글.png';
import info05 from '../../project/카드05_설명글.png';
import info06 from '../../project/카드06_설명글.png';

/**
 * color:       글로우 컬러. 카드 이미지 파일명의 컬러값
 * info:        정보 패널 이미지 (라벨·프로젝트명·연도·회사 + 담당 업무·설명이 한 장에 있음)
 * infoSplitX:  좁은 화면에서 왼쪽 블록만 잘라 쓸 때의 x 좌표
 * archiveUrl:  아카이브 상세 페이지 주소(#/archive/<id>). 아카이브가 아직 없으면 null (버튼 비활성)
 */
export const PROJECTS = [
  {
    id: 'tales-runner',
    number: '01',
    title: '테일즈런너',
    year: '2026',
    company: 'Blomics',
    color: '#ff1ed4',
    card: card01,
    info: info01,
    infoSize: [988, 129],
    infoSplitX: 320,
    heading: '이벤트 · 랜딩페이지 디자인',
    description: [
      '테일즈런너 이벤트 · 랜딩페이지의 메인 비주얼 기획 및 디자인을 담당했습니다.',
      '콘텐츠 제작과 디자인팀 내 작업 일정 관리를 병행하며 게임 운영에 기여했습니다.',
    ],
    archiveUrl: '#/archive/tales-runner',
  },
  {
    id: 'lineage-remastered',
    number: '02',
    title: '리니지 리마스터',
    year: '2024 ~ 2026',
    company: 'Theplayer',
    color: '#ff2d2d',
    card: card02,
    info: info02,
    infoSize: [1274, 132],
    infoSplitX: 440,
    heading: '광고 캠페인 · 업데이트 콘텐츠 제작',
    description: [
      '광고 캠페인 제안부터 집행까지 참여하며 업데이트 노트의 메인 디자인을 담당했습니다.',
      '분기별 디자인 가이드를 구축하여 제작 효율을 높이고, 광고주 호평과 1분기 계약 연장에 기여했습니다.',
    ],
    archiveUrl: '#/archive/lineage-remastered',
  },
  {
    id: 'chaos-zero-nightmare',
    number: '03',
    title: '카오스 제로 나이트메어',
    year: '2024 ~ 2025',
    company: 'Theplayer',
    color: '#ae02ff',
    card: card03,
    info: info03,
    infoSize: [1354, 129],
    infoSplitX: 590,
    heading: '런칭 광고 캠페인 · 인포그래픽 제작',
    description: [
      '런칭 배너 제안으로 캠페인 수주에 기여하고, 사전예약 및 런칭 광고 소재를 제작했습니다.',
      '출시 30일 기념 인포그래픽을 제작해 언론 기사에 게재되며 게임의 주요 성과를 전달했습니다.',
    ],
    archiveUrl: '#/archive/chaos-zero-nightmare',
  },
  {
    id: 'alkeron',
    number: '04',
    title: '알케론',
    year: '2025 ~ 2026',
    company: 'Theplayer',
    color: '#00c5a6',
    card: card04,
    info: info04,
    infoSize: [1094, 129],
    infoSplitX: 290,
    heading: '런칭 광고 캠페인 · 이벤트 페이지 제작',
    description: [
      '런칭 키비주얼 제안으로 캠페인 수주에 기여하고, 런칭 광고 배너와 이벤트 페이지를 제작했습니다.',
      '브랜드 가이드를 준수하며 매체별 특성과 콘텐츠의 목적에 맞춰 비주얼을 구성했습니다.',
    ],
    archiveUrl: '#/archive/alkeron',
  },
  {
    id: 'sinwol-donghaeng',
    number: '05',
    title: '신월동행',
    year: '2024 ~ 2025',
    company: 'Theplayer',
    color: '#ff6a27',
    card: card05,
    info: info05,
    infoSize: [1175, 129],
    infoSplitX: 290,
    heading: '런칭 광고 캠페인 · 광고 소재 제작',
    description: [
      '런칭 광고 배너 제안으로 캠페인 수주에 기여했으며, 해당 시안은 실제 광고 소재로 채택되어 집행되었습니다.',
      '수주 이후에도 게임의 비주얼 콘셉트와 캠페인 목적에 맞춘 추가 런칭 배너를 제작했습니다.',
    ],
    archiveUrl: '#/archive/sinwol-donghaeng',
  },
  {
    id: 'battlegrounds',
    number: '06',
    title: '배틀그라운드',
    year: '2024 ~ 2025',
    company: 'Theplayer',
    color: '#ff9700',
    card: card06,
    info: info06,
    infoSize: [1202, 129],
    infoSplitX: 375,
    heading: '업데이트 프로모션 · 광고 소재 제작',
    description: [
      '업데이트 프로모션을 위한 인게임 화면 이미지, 광고 배너 및 캐러셀을 제작했습니다.',
      '게임 고유의 비주얼 톤앤매너를 반영해 업데이트 정보를 효과적으로 전달하는 소재를 디자인했습니다.',
    ],
    archiveUrl: '#/archive/battlegrounds',
  },
];
