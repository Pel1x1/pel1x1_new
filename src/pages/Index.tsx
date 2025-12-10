import BusinessCard from "@/components/BusinessCard";
import PixelBlast from "@/components/PixelBlast";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Ballpit from '@/components/Ballpit.js'
import Particles from '@/components/Particles';
import FaultyTerminal from '@/components/FaultyTerminal';


const Index = () => {
  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center p-4 pointer-events-auto" >
      
      <BusinessCard />
    </div>        
    
    {/*
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
    mouseReact={true}
    mouseStrength={0.2}
    pageLoadAnimation={false}
    brightness={0.8}
  />

        
         <Particles
          particleColors={['#ffd3ff', '#ffffff']}
          particleCount={600}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
        />

        
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
          liquid = {false}
          speed={1}
          edgeFade={0.1}
          transparent
          className="h-[900px] sm:h-[100%] lg:h-[100%] xl:h-[100%]"
        />
        
        <Ballpit
          count={100}
          gravity={0.1}
          friction={0.995}
          wallBounce={0.95}
          followCursor={true}
          colors = {["#692699", "#692699", "#000000", "#000000"]}
        />*/}
    </>
  );
};

export default Index;
