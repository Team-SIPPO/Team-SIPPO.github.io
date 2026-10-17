import { useEffect, useRef, useState } from 'react';
import { asset } from '../../lib/asset';

/**
 * トップのヒーロー用：動画を1回再生し、終わったら静止画に切り替えて絵を残す。
 *
 * - 再生が終わったら静止画(top-image.png)に差し替える。動画の最後のコマと同じ絵なので切り替えは見えない
 * - 自動再生がブロックされた場合(iPhoneの低電力モード、データセーバー等)や、
 *   読み込みに失敗・時間がかかりすぎた場合は、最初から静止画を出す
 * - 「視差効果を減らす」(prefers-reduced-motion)の人には動画を使わず静止画だけを出す
 * - 静止画は hidden で常に DOM に置いて先読みし、切り替え時に読み込み待ちが出ないようにする
 */
const VIDEO_SRC = asset('top-hero.mp4');
const STILL_SRC = asset('top-image.png');
const ALT = 'コーヒーを飲みながらアイデアを考える人物';
const START_TIMEOUT_MS = 2500; // この時間内に再生が始まらなければ静止画にする

export function HeroMotion({ className = '' }) {
  const videoRef = useRef(null);
  // 'pending' = 再生開始待ち / 'playing' = 動画再生中 / 'still' = 静止画
  const [mode, setMode] = useState('pending');

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const video = videoRef.current;
    if (reduce || !video) {
      setMode('still');
      return undefined;
    }

    let started = false;
    const toStill = () => setMode('still');
    const onPlaying = () => {
      started = true;
      setMode('playing');
    };
    const timer = window.setTimeout(() => {
      if (!started) toStill();
    }, START_TIMEOUT_MS);

    video.addEventListener('playing', onPlaying);
    video.addEventListener('ended', toStill);
    video.addEventListener('error', toStill);

    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(toStill); // 自動再生ブロック

    return () => {
      window.clearTimeout(timer);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('ended', toStill);
      video.removeEventListener('error', toStill);
    };
  }, []);

  const isStill = mode === 'still';

  return (
    <>
      {!isStill && (
        <video
          ref={videoRef}
          className={className}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-label={ALT}
          width="1157"
          height="747"
        />
      )}
      <img className={className} src={STILL_SRC} alt={ALT} width="1157" height="747" hidden={!isStill} />
    </>
  );
}
