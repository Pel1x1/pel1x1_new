import BusinessCard from "@/components/BusinessCard";
import PixelBlast from "@/components/PixelBlast";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";


const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#969696"
          patternScale={2.5}
          patternDensity={0.5}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.05}
          rippleIntensityScale={0.25}
          liquid = {false}
          speed={1}
          edgeFade={0.1}
          transparent
        />
          <BusinessCard/>
      </div>
    </>
  );
};

export default Index;
