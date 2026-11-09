import { PROJECTS } from './projects.js';
import { useCarousel } from './useCarousel.js';

import bgImage from '../../project/BG.png';
import barImage from '../../project/상단박스.png';
import marqueeImage from '../../project/select projects.png';
import arrowLeft from '../../project/화살표_왼쪽.png';
import arrowRight from '../../project/화살표_오른쪽.png';
import barOff from '../../project/SELECT BAR_off.png';
import barOn from '../../project/SELECT BAR_on.png';
import infoBox from '../../project/설명글_box.png';
import buttonOff from '../../project/BTN_Off.png';
import buttonOn from '../../project/BTN_On.png';

function Marquee() {
  return (
    <div className="projects-marquee" role="img" aria-label="SELECT PROJECTS">
      <img className="projects-marquee-bar" src={barImage} alt="" />
      <div className="projects-marquee-track">
        {[0, 1, 2].map((key) => <img key={key} src={marqueeImage} alt="" />)}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isActive, cardRef }) {
  const mask = `url("${project.card}")`;
  return (
    <div
      className="project-card"
      ref={cardRef}
      data-index={index}
      role="group"
      aria-roledescription="slide"
      aria-label={`${project.number} ${project.title}`}
      aria-hidden={!isActive}
    >
      <img src={project.card} alt={`${project.title} 대표 이미지`} draggable={false} />
      {/* 카드 형태대로만 어둡게 처리하는 오버레이. 마지막 자식이어야 함 (useCarousel) */}
      <span className="project-card-dim" style={{ WebkitMaskImage: mask, maskImage: mask }} />
    </div>
  );
}

function Pagination({ active, onSelect }) {
  return (
    <div className="projects-pagination" role="group" aria-label="프로젝트 선택">
      {PROJECTS.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className={index === active ? 'is-active' : ''}
          aria-label={`${project.number} ${project.title}`}
          aria-current={index === active ? 'true' : undefined}
          onClick={() => onSelect(index)}
        >
          <img className="bar-off" src={barOff} alt="" />
          <img className="bar-on" src={barOn} alt="" />
        </button>
      ))}
    </div>
  );
}

function ProjectInfoItem({ project, isActive }) {
  const [width, height] = project.infoSize;
  return (
    <article className={`project-info-item${isActive ? ' is-active' : ''}`} aria-hidden={!isActive}>
      {/* 데스크톱: 시안 이미지 그대로 */}
      <img
        className="project-info-image"
        src={project.info}
        style={{ '--w': width }}
        alt={`${project.title}, ${project.year}, ${project.company}. ${project.heading}. ${project.description.join(' ')}`}
      />
      {/* 좁은 화면: 왼쪽 블록만 잘라 쓰고, 설명은 읽을 수 있는 크기의 텍스트로 표시 */}
      <div className="project-info-compact">
        <div
          className="project-info-crop"
          style={{ '--split': project.infoSplitX, aspectRatio: `${project.infoSplitX} / ${height}` }}
        >
          <img
            src={project.info}
            style={{ width: `${(width / project.infoSplitX) * 100}%` }}
            alt={`${project.title}, ${project.year}, ${project.company}`}
          />
        </div>
        <h3>{project.heading}</h3>
        <p>{project.description[0]}</p>
        <p>{project.description[1]}</p>
      </div>
    </article>
  );
}

function ArchiveButton({ project }) {
  const images = (
    <>
      <img className="btn-off" src={buttonOff} alt="" />
      <img className="btn-on" src={buttonOn} alt="" />
    </>
  );

  if (project.archiveUrl) {
    return (
      <a className="project-archive" href={project.archiveUrl} aria-label={`VIEW ARCHIVE: ${project.title}`}>
        {images}
      </a>
    );
  }
  return (
    <button
      className="project-archive"
      type="button"
      aria-disabled="true"
      aria-label={`VIEW ARCHIVE: ${project.title} (준비 중)`}
    >
      {images}
    </button>
  );
}

export function SelectProjects() {
  const { active, stageRef, setCardRef, step, goTo, stageHandlers } = useCarousel(PROJECTS);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') step(-1);
    else if (event.key === 'ArrowRight') step(1);
    else return;
    event.preventDefault();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="projects-board" onKeyDown={onKeyDown}>
      <img className="projects-bg" src={bgImage} alt="" />
      <Marquee />

      <div
        className="projects-stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="프로젝트 카드. 좌우 방향키로 이동"
        {...stageHandlers}
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === active}
            cardRef={setCardRef(index)}
          />
        ))}
      </div>

      <button className="projects-arrow is-left" type="button" aria-label="이전 프로젝트" onClick={() => step(-1)}>
        <img src={arrowLeft} alt="" />
      </button>
      <button className="projects-arrow is-right" type="button" aria-label="다음 프로젝트" onClick={() => step(1)}>
        <img src={arrowRight} alt="" />
      </button>

      <Pagination active={active} onSelect={goTo} />

      <div className="project-info" aria-live="polite">
        <img className="project-info-box" src={infoBox} alt="" />
        <div className="project-info-stack">
          {PROJECTS.map((project, index) => (
            <ProjectInfoItem key={project.id} project={project} isActive={index === active} />
          ))}
        </div>
        <ArchiveButton project={PROJECTS[active]} />
      </div>
    </div>
  );
}
