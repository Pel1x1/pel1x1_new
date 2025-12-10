import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import Technologies from "@/pages/Technologies";
import Prices from "@/pages/Prices";
import NotFound from "@/pages/NotFound";

import PixelBlast from "@/components/PixelBlast";
import Ballpit from "@/components/Ballpit";
import Particles from "@/components/Particles";
import FaultyTerminal from "@/components/FaultyTerminal";
import LiquidEther from '@/components/LiquidEther';
import Antigravity from '@/components/Antigravity';

const variants = ["faulty", "antigravity", "particles", "ballpit", "pixel", "liquidether"] as const;
type BackgroundKey = (typeof variants)[number];

const getInitialBackground = (): BackgroundKey => {
  const idx = Math.floor(Math.random() * variants.length);
  return variants[idx];
};

const BackgroundLayer: React.FC<{ variant: BackgroundKey }> = ({ variant }) => {
  switch (variant) {
    case "faulty":
      return (
        <FaultyTerminal
          scale={3.5}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.3}
          pause={false}
          scanlineIntensity={0.1}
          glitchAmount={0}
          flickerAmount={1}
          noiseAmp={0.9}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#ffd3ff"
          mouseReact
          mouseStrength={0.2}
          pageLoadAnimation={false}
          brightness={0.8}
        />
      );
    case "pixel":
      return (
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#fa57fa"
          patternScale={3}
          patternDensity={1.3}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.05}
          rippleIntensityScale={0.25}
          liquid={false}
          speed={1}
          edgeFade={0.1}
          transparent
          className="w-full h-full"
        />
      );
    case "ballpit":
      return (
        <Ballpit
          count={100}
          gravity={0.1}
          friction={0.995}
          wallBounce={0.95}
          followCursor
          colors={["#692699", "#692699", "#000000", "#000000"]}
        />
      );
    case "particles":
      return (
        <Particles
          particleColors={["#ffd3ff", "#ffffff"]}
          particleCount={600}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover = {true}
          alphaParticles={false}
          disableRotation
          
        />
      );
  case "liquidether":
        return (
          <LiquidEther
              colors={[ '#ffd3ff', '#ffd3ff', '#ffd3ff' ]}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
          />
        );

    case "antigravity":
        return (
          <Antigravity
            count={300}
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color={'#ffd3ff'}
            autoAnimate={true}
            particleVariance={1}
          />
        );


    default:
      return null;
  }
};

const AppLayout: React.FC = () => {
  const [bg] = useState<BackgroundKey>(() => getInitialBackground());

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* фон */}
      <div className="absolute inset-0 -z-10">
        <BackgroundLayer variant={bg} />
      </div>

      {/* сами страницы */}
      <div className="relative z-10 pointer-events-none">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
