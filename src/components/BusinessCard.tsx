import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedLink from "./AnimatedLink";

const BusinessCard = () => {
  return (
    <Card className="
    w-[320px] h-[340px] p-5
    sm:w-[380px] sm:h-[350px] sm:p-8
    md:w-[450px] md:h-[350px] md:p-10
    lg:w-[500px] lg:h-[350px] lg:p-10
    bg-card border-2 border-card-border shadow-2xl absolute
  ">
      <div className="h-full flex flex-col justify-between ">
        {/* Company Name */}
        <div>
          <h1 
            className="text-2xl
              text-[#ffd3ff]
              sm:text-3xl
              md:text-4xl
              font-bold text-card-foreground mb-2">
            K <span className="text-xl">&</span> K
          </h1>
          <div className="w-20 h-px  mb-6 bg-[#ffd3ff]"></div>
          <p 
          className="text-xs
            sm:text-sm
            md:text-base
            text-card-foreground uppercase tracking-wider mb-4">
            Web решения для бизнеса.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center">
          < AnimatedLink/>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <a 
                href="https://t.me/k_k0stya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-card-foreground hover:text-muted-foreground transition-colors"
              >
                <MessageCircle size={16} color="#ffd3ff"/>
                @k_k0stya
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-muted-foreground" color="#ffd3ff"/>
            <a href="mailto:k.konstantin2212@gmail.com" 
            className="tracking-wider relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 
            after:bg-card-border after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"> 
              <span className="text-sm text-card-foreground font-mono">k.konstantin2212@gmail.com</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-muted-foreground" color="#ffd3ff" />
            <a href="mailto:k.konstantin2212@gmail.com" 
            className="tracking-wider relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 
            after:bg-card-border after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"> 
              <span className="text-sm text-card-foreground font-mono">+7 (977) 860-90-72</span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BusinessCard;