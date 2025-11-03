import BusinessCard from "@/components/BusinessCard";
import PixelBlast from "@/components/PixelBlast";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";


const Index = () => {
  return (
    <>
      <div className="h-screen bg-background flex flex-col items-center justify-center p-4">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#dbdbdb"
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
          className="h-[900px] sm:h-[100%] lg:h-[100%] xl:h-[100%]"
        />
          <BusinessCard/>
      </div>
    </>
  );
};

export default Index;
