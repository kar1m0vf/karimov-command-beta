import { useEffect, useState } from 'react';

const getSectionId = (href: string) => href.replace('#', '');

export function useActiveSection(hrefs: string[]) {
  const [activeHash, setActiveHash] = useState(hrefs[0] ?? '#intro');

  useEffect(() => {
    if (!hrefs.length) return undefined;

    let frame = 0;
    const sectionIds = hrefs.map(getSectionId);

    const readActiveSection = () => {
      const anchor = window.scrollY + Math.min(460, window.innerHeight * 0.5);
      let activeId = sectionIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (let index = 0; index < sectionIds.length; index += 1) {
        const id = sectionIds[index];
        const section = document.getElementById(id);
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (anchor >= top && anchor < bottom) {
          activeId = id;
          break;
        }

        const distance = Math.abs(anchor - top);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeId = id;
        }
      }

      setActiveHash((current) => (current === `#${activeId}` ? current : `#${activeId}`));
    };

    const scheduleRead = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(readActiveSection);
    };

    scheduleRead();
    window.addEventListener('scroll', scheduleRead, { passive: true });
    window.addEventListener('resize', scheduleRead);
    window.addEventListener('hashchange', scheduleRead);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleRead);
      window.removeEventListener('resize', scheduleRead);
      window.removeEventListener('hashchange', scheduleRead);
    };
  }, [hrefs]);

  return activeHash;
}
