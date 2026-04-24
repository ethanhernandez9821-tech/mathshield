"use client";

import { useEffect, useState } from "react";
import GameProgressCard from "@/components/GameProgressCard";
import TopBar from "@/components/TopBar";

type ImportedGamePageProps = {
  badge: string;
  title: string;
  description: string;
  src: string;
  license: string;
  slug: string;
  howToPlay: string;
  tags: string[];
  sourceNote: string;
  crosshair?: boolean;
  openHref?: string;
  restartLabel?: string;
  deferLoad?: boolean;
  previewImage?: string;
  loadLabel?: string;
  mobileControls?: string[];
  mobileSupportNote?: string;
};

export default function ImportedGamePage({
  badge,
  title,
  description,
  src,
  license,
  slug,
  howToPlay,
  tags,
  sourceNote,
  crosshair = false,
  openHref,
  restartLabel = "Restart",
  deferLoad = false,
  previewImage,
  loadLabel = "Load game",
  mobileControls = [],
  mobileSupportNote,
}: ImportedGamePageProps) {
  const [frameKey, setFrameKey] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(!deferLoad);
  const [isMobileClient, setIsMobileClient] = useState(false);

  useEffect(() => {
    const updateTouchState = () => {
      if (typeof window === "undefined") return;

      const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
      const smallScreen = window.innerWidth <= 1024;
      const touchPoints = navigator.maxTouchPoints > 0;
      setIsMobileClient((coarsePointer || touchPoints) && smallScreen);
    };

    updateTouchState();
    window.addEventListener("resize", updateTouchState);
    return () => window.removeEventListener("resize", updateTouchState);
  }, []);

  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero">
        <div>
          <p className="section-kicker">{badge}</p>
          <h1 className="arcade-title">{title}</h1>
          <p className="arcade-copy">{description}</p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-frame">
          <div className="game-frame-top">
            <div className="game-frame-meta">
              <span className="poster-chip">{license}</span>
              <span className="frame-status">{hasLoaded ? "Live" : "Ready"}</span>
            </div>
            <div className="game-frame-actions">
              {hasLoaded ? (
                <button
                  type="button"
                  className="ui-button ui-button--ghost ui-button--small"
                  onClick={() => setFrameKey((value) => value + 1)}
                >
                  {restartLabel}
                </button>
              ) : (
                <button
                  type="button"
                  className="ui-button ui-button--ghost ui-button--small"
                  onClick={() => setHasLoaded(true)}
                >
                  {loadLabel}
                </button>
              )}
              <a
                href={openHref ?? src}
                target="_blank"
                rel="noreferrer"
                className="ui-button ui-button--ghost ui-button--small"
              >
                Open tab
              </a>
            </div>
          </div>
          {hasLoaded ? (
            <iframe
              key={frameKey}
              src={src}
              title={title}
              className={`game-embed${crosshair ? " game-embed--crosshair" : ""}`}
              allow="fullscreen; gamepad; accelerometer; gyroscope"
              allowFullScreen
            />
          ) : (
            <div className="game-launch">
              {previewImage ? (
                <div
                  className="game-launch-media"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10, 12, 16, 0.12), rgba(10, 12, 16, 0.7)), url(${previewImage})`,
                  }}
                />
              ) : null}
              <div className="game-launch-copy">
                <h2>Load when ready</h2>
                <p>This one is heavier, so it waits until you press play.</p>
                <div className="game-frame-actions">
                  <button type="button" className="ui-button" onClick={() => setHasLoaded(true)}>
                    {loadLabel}
                  </button>
                  <a href={openHref ?? src} target="_blank" rel="noreferrer" className="ui-button ui-button--ghost">
                    Open tab
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="note-card">
          <p className="section-kicker">Controls</p>
          <h2>How to play</h2>
          <p>{howToPlay}</p>
          {isMobileClient ? (
            mobileControls.length > 0 ? (
              <div className="mobile-controls-card">
                <p className="section-kicker">Mobile Controls</p>
                <h3>Touch layout</h3>
                <div className="tag-row">
                  {mobileControls.map((control) => (
                    <span key={control} className="tag">
                      {control}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mobile-support-note">
                {mobileSupportNote ?? "This imported build is desktop-first and does not ship with on-screen touch controls yet."}
              </p>
            )
          ) : null}
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <GameProgressCard slug={slug} active={hasLoaded} />
          <p className="challenge-copy">
            <strong>Source.</strong> {sourceNote}
          </p>
        </aside>
      </section>
    </main>
  );
}
