'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import CapabilityRadar from '@/components/resume/CapabilityRadar';
import { capabilities, experiences, portfolioProjects } from '@/data/resume';
import type { PersonalDetails } from '@/types/resume';

type ResumePageProps = { privateBuild: boolean; personalDetails: PersonalDetails | null };

const portraitTags = ['LLM', 'Diffusion', 'Agent', 'Python', 'TypeScript', 'Node.js', 'CSharp'];
function renderCapabilityDescription(description: string) {
  return description.split(/(\*\*[^*]+\*\*|\n)/g).map((part, index) =>
    part === '\n' ? (
      <br key={`line-break-${index}`} />
    ) : part.startsWith('**') && part.endsWith('**') ? (
      <strong className="capability-keyword" key={`keyword-${index}`}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

const timelineStart = 2020 * 12 + 9;
const timelineEnd = 2026 * 12;
const timelineLength = timelineEnd - timelineStart;

function timelinePosition(year: number, month: number) {
  return (((year * 12 + month - 1) - timelineStart) / timelineLength) * 100;
}

function formatTimelineDate([year, month]: readonly [number, number]) {
  return `${year}.${String(month).padStart(2, '0')}`;
}

export default function ResumePage({ privateBuild, personalDetails }: ResumePageProps) {
  const [showPrivate, setShowPrivate] = useState(privateBuild);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [previewProjectIndex, setPreviewProjectIndex] = useState<number | null>(null);
  const [switcherPosition, setSwitcherPosition] = useState<{ x: number; y: number } | null>(null);
  const [copyNotice, setCopyNotice] = useState('');
  const switcherDragOffset = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const copyNoticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const privateVisible = privateBuild && showPrivate && personalDetails !== null;
  const activeProject = portfolioProjects[activeProjectIndex];
  const previewProject =
    previewProjectIndex === null ? null : portfolioProjects[previewProjectIndex];
  const printResume = () => window.print();
  const showPreviousProject = () =>
    setActiveProjectIndex(
      index => (index - 1 + portfolioProjects.length) % portfolioProjects.length
    );
  const showNextProject = () =>
    setActiveProjectIndex(index => (index + 1) % portfolioProjects.length);
  const copyContact = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    setCopyNotice(`${label}已复制`);
    if (copyNoticeTimer.current) clearTimeout(copyNoticeTimer.current);
    copyNoticeTimer.current = setTimeout(() => setCopyNotice(''), 1800);
  };
  const startSwitcherDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const switcher = event.currentTarget.parentElement;
    if (!switcher) return;
    const rect = switcher.getBoundingClientRect();
    switcherDragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveSwitcher = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const offset = switcherDragOffset.current;
    setSwitcherPosition({
      x: Math.min(
        Math.max(8, event.clientX - offset.x),
        Math.max(8, window.innerWidth - offset.width - 8)
      ),
      y: Math.min(
        Math.max(8, event.clientY - offset.y),
        Math.max(8, window.innerHeight - offset.height - 8)
      ),
    });
  };
  const stopSwitcherDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    if (previewProjectIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewProjectIndex(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [previewProjectIndex]);

  useEffect(
    () => () => {
      if (copyNoticeTimer.current) clearTimeout(copyNoticeTimer.current);
    },
    []
  );

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="页面导航">
        <a className="wordmark" href="#top" aria-label="返回顶部">
          <span>E</span>
          <strong>EVILS&apos; PORTFOLIO</strong>
        </a>
        <div className="nav-links">
          <a href="#top">关于</a>
          <a href="#skills">能力</a>
          <a href="#project">项目</a>
          <a href="#experience">经历</a>
          <button
            className="round-action"
            type="button"
            onClick={printResume}
            aria-label="保存为 PDF"
          >
            ↗
          </button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="portrait-card">
          <img src="/portrait-coder.png" alt="刘纯涛黑白肖像" />
          <div className="portrait-gradient" aria-hidden="true" />
          <p className="portrait-hello">HELLO.</p>
          <p className="portrait-name">
            I&apos;M
            <br />
            CHUNTAO.
          </p>
          <div className="portrait-tags" aria-label="技术关键词">
            {portraitTags.map((tag, index) => (
              <span className={`tag tag-${index + 1}`} key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <span className="portrait-index">PROFILE / 01</span>
        </div>

        <div className="hero-content">
          <p className="eyebrow">01 / PROFILE</p>
          <h1>
            把复杂系统，
            <br />
            <span>做成自然体验。</span>
          </h1>
          <div className="intro-card">
            <span className="quote-mark">“</span>
            <p>
              我是刘纯涛，一名 Coder。
              <br />
              拥抱时代，拥抱产品，拥抱技术，拥抱未来。
              <br />
              会一点AI，会一点全栈，会一点游戏，会一点产品。
            </p>
          </div>

          {privateVisible && personalDetails && (
            <section className="contact-area" aria-label="私人联系方式">
              <div className="contact-heading">
                <span>PRIVATE / CONTACT</span>
              </div>
              <div className="contact-grid">
                <button
                  className="contact-card contact-email"
                  type="button"
                  onClick={() => copyContact('邮箱', personalDetails.email)}
                  aria-label="复制邮箱地址"
                >
                  <img className="contact-icon" src="/email.png" alt="" aria-hidden="true" />
                  <small>EMAIL</small>
                  <strong>{personalDetails.email}</strong>
                  <span className="contact-arrow">复制</span>
                </button>
                <button
                  className="contact-card contact-wechat"
                  type="button"
                  onClick={() => copyContact('微信', personalDetails.wechat)}
                  aria-label="复制微信号"
                >
                  <img className="contact-icon" src="/wechat.png" alt="" aria-hidden="true" />
                  <small>WECHAT</small>
                  <strong>{personalDetails.wechat}</strong>
                  <span className="contact-arrow">复制</span>
                </button>
              </div>
            </section>
          )}
        </div>

        <a className="scroll-cue" href="#skills" aria-label="向下滚动至技术能力">
          <span>↓</span>
        </a>
      </section>

      <section className="capability-section" id="skills">
        <header className="board-heading">
          <div>
            <p>02 / CAPABILITY</p>
            <h2>技术能力</h2>
          </div>
          <p className="capability-subtitle">
            用研究理解趋势，用架构组织复杂，用产品意识判断价值。
          </p>
        </header>

        <div className="capability-board">
          <article className="radar-card">
            <div className="card-label">
              <span>五维能力图谱</span>
            </div>
            <CapabilityRadar capabilities={capabilities} />
          </article>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <article className="capability-card" key={capability.title}>
                <div className="capability-number">0{index + 1}</div>
                <div>
                  <div className="capability-title-row">
                    <h3>{capability.title}</h3>
                  </div>
                  <p>{renderCapabilityDescription(capability.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section" id="project">
        <header className="project-header">
          <p>03 / PROJECT</p>
          <div className="project-focus-heading" aria-live="polite">
            <div>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.summary}</p>
            </div>
            <div className="carousel-controls" aria-label="项目轮播控制">
              <button type="button" onClick={showPreviousProject} aria-label="上一个项目">
                ←
              </button>
              <span>
                0{activeProjectIndex + 1} / 0{portfolioProjects.length}
              </span>
              <button type="button" onClick={showNextProject} aria-label="下一个项目">
                →
              </button>
            </div>
          </div>
        </header>

        <div className="project-carousel">
          {portfolioProjects.map((project, index) => (
            <article
              className={`project-slide${index === activeProjectIndex ? ' is-active' : ''}`}
              key={project.id}
              onMouseEnter={() => setActiveProjectIndex(index)}
              onFocusCapture={() => setActiveProjectIndex(index)}
            >
              <button
                className="project-media"
                type="button"
                onClick={() => {
                  setActiveProjectIndex(index);
                  setPreviewProjectIndex(index);
                }}
                aria-label={`预览项目图片：${project.title}`}
                aria-pressed={index === activeProjectIndex}
              >
                <img
                  className="project-media-backdrop"
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                />
                <img className="project-media-image" src={project.image} alt={project.imageAlt} />
                <span className="project-media-overlay" />
                <span className="project-slide-index">0{index + 1}</span>
                <strong>{project.title}</strong>
              </button>
              <div className="project-detail" aria-hidden={index !== activeProjectIndex}>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul>
                  {project.highlights.map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.links && (
                  <div className="project-links">
                    {project.links.map(link => (
                      <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience">
        <header className="board-heading light-heading">
          <div>
            <p>04 / EXPERIENCE</p>
            <h2>工作 / 教育经历</h2>
          </div>
        </header>

        <div className="experience-list">
          {experiences.map((entry, index) => {
            const left = timelinePosition(...entry.start);
            const right = timelinePosition(...entry.end);
            const rangeWidth = Math.max(right - left, 2.5);
            const compactRange = rangeWidth < 12;
            const metaLabel = entry.kind === '教育'
              ? '教育'
              : `${entry.kind}${entry.location ? ` · ${entry.location}` : ''}`;

            return (
              <article className="experience-card" key={entry.id}>
                <div className="experience-heading">
                  <span className="experience-index">0{index + 1}</span>
                  <h3>{entry.title}</h3>
                  <strong className="experience-kind">{metaLabel}</strong>
                </div>
                <div className="experience-tech">
                  <div className="mono-tags">
                    {entry.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ul>
                  {entry.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div
                  className={`experience-timeline${compactRange ? ' is-compact' : ''}`}
                  aria-label={`${entry.title}，${entry.period}，位于2020年10月至2026年1月时间轴中的区间`}
                >
                  <div className="timeline-rail" aria-hidden="true">
                    <span
                      className={`timeline-range timeline-range-${entry.kind}`}
                      style={{ left: `${left}%`, width: `${rangeWidth}%` }}
                    />
                  </div>
                  {compactRange ? (
                    <span
                      className="timeline-date timeline-date-compact"
                      style={{ left: `${left + rangeWidth / 2}%` }}
                    >
                      {formatTimelineDate(entry.start)} — {formatTimelineDate(entry.end)}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`timeline-date timeline-date-start${left < 6 ? ' is-edge' : ''}`}
                        style={{ left: `${left}%` }}
                      >
                        {formatTimelineDate(entry.start)}
                      </span>
                      <span
                        className={`timeline-date timeline-date-end${right > 94 ? ' is-edge' : ''}`}
                        style={{ left: `${right}%` }}
                      >
                        {formatTimelineDate(entry.end)}
                      </span>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer>
        <span>刘纯涛 · CODER</span>
        <button type="button" onClick={printResume}>
          SAVE AS PDF ↗
        </button>
      </footer>

      {previewProject && (
        <div
          className="project-preview-mask"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} 产品图预览`}
        >
          <button
            className="project-preview-backdrop"
            type="button"
            onClick={() => setPreviewProjectIndex(null)}
            aria-label="关闭产品图预览"
          />
          <button
            className="project-preview-close"
            type="button"
            onClick={() => setPreviewProjectIndex(null)}
            aria-label="关闭产品图预览"
          >
            ×
          </button>
          <figure>
            <img src={previewProject.image} alt={previewProject.imageAlt} />
            <figcaption>
              <span>{previewProject.category}</span>
              <strong>{previewProject.title}</strong>
            </figcaption>
          </figure>
        </div>
      )}

      {privateBuild && (
        <aside
          className="view-switcher"
          aria-label="简历视图切换"
          style={
            switcherPosition
              ? {
                  left: switcherPosition.x,
                  top: switcherPosition.y,
                  right: 'auto',
                  bottom: 'auto',
                }
              : undefined
          }
        >
          <div
            className="switcher-drag-handle"
            title="拖拽移动"
            onPointerDown={startSwitcherDrag}
            onPointerMove={moveSwitcher}
            onPointerUp={stopSwitcherDrag}
            onPointerCancel={stopSwitcherDrag}
          >
            <span>当前视图</span>
            <strong>{showPrivate ? '私有' : '访客预览'}</strong>
          </div>
          <button
            type="button"
            aria-pressed={showPrivate}
            onClick={() => setShowPrivate(value => !value)}
          >
            切换到{showPrivate ? '访客' : '私有'}
          </button>
        </aside>
      )}

      <div
        className={`copy-toast${copyNotice ? ' is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {copyNotice}
      </div>
    </main>
  );
}
