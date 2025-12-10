import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/technologies", label: "Technologies" },
  { to: "/prices", label: "Prices" },
];

export default function AnimatedLink() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let stopped = false;
    let idx = 0;
    const loop = () => {
      if (stopped) return;
      setActive(idx);
      setTimeout(() => {
        setActive(-1);
        if (idx === links.length - 1) {
          setTimeout(() => {
            if (stopped) return;
            idx = 0;
            loop();
          }, 5000); // пауза между циклами
        } else {
          idx += 0.5;
          loop();
        }
      }, 1000); // 700мс — длительность underline (равна transition duration)
    };
    loop();
    return () => { stopped = true; setActive(-1); };
  }, []);

  const base =
    "text-xs sm:text-sm md:text-base text-card-foreground uppercase tracking-wider relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ffd3ff] after:origin-bottom-right after:transition-transform after:duration-700 hover:after:scale-x-100 hover:after:origin-bottom-left";
  const anim = "after:scale-x-100 after:origin-bottom-left";

  return (
    <>
      {links.map((link, i) => (
        <Link
          key={link.to}
          to={link.to}
          className={active === i ? `${base} ${anim}` : base}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
