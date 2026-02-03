import BusinessCard from "@/components/BusinessCard";
import PixelBlast from "@/components/PixelBlast";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Ballpit from '@/components/Ballpit.js'
import Particles from '@/components/Particles';
import FaultyTerminal from '@/components/FaultyTerminal';
import { Analytics } from "@vercel/analytics/react"
const Index = () => {
  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center p-4 pointer-events-auto" >
      <Analytics/>
      <BusinessCard />
    </div>        
  
    </>
  );
};

export default Index;
