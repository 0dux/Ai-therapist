"use client";

import { Ripple } from "@/components/ui/ripple";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const emotions = [
    { value: 0, label: "😔 Down", color: "from-gray-500/50" }, // muted, dull for sadness
    { value: 25, label: "😊 Content", color: "from-green-400/50" }, // calm green, balance
    { value: 50, label: "😌 Peaceful", color: "from-blue-400/50" }, // soft blue, tranquility
    { value: 75, label: "🤗 Happy", color: "from-yellow-400/50" }, // bright yellow, joy
    { value: 100, label: "✨ Excited", color: "from-pink-500/50" }, // vibrant pink, excitement
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // we are going to use this to track if all the components have mounted and only then we'll start the animations.
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return (
    <div className="flex flex-col overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[91.5vh] mt-16 flex flex-col items-center justify-center py-12 px-4">
        {/* Enhanced background elements */}
        <div className=" absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] lg:top-30 rounded-full blur-3xl top-40 -left-20 transition-all duration-1000 ease-in-out
            bg-gradient-to-r ${currentEmotion.color} to-transparent`}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/30 blur-3xl bottom-0 right-0 animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-background/65 backdrop-blur-3xl" />
        </div>
        <Ripple className={`opacity-55 fixed`} mainCircleSize={400} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative space-y-10 text-center max-w-3xl"
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-primary/50 bg-primary/10 backdrop-blur-md hover:border-primary/80 transition-all duration-300 hover:scale-101 mb-10">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Your AI Agent Mental Health Companion
            </span>
          </div>

          {/* main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
              Find Peace
            </span>
            <br />
            <span className="inline-block mt-2">of Mind</span>
          </h1>

          {/* description */}
          <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Experience a new way of emotional support. Our AI companion is here
            to listen, understand, and guide you through life's journey.
          </p>
          {/* Emotion slider section */}
          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground/80 font-medium">
                Whatever you're feeling, we're here to listen
              </p>
              <div className="flex justify-between items-center px-2">
                {emotions.map((em) => (
                  <div
                    key={em.value}
                    className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                      Math.abs(emotion - em.value) < 15
                        ? "opacity-100 scale-110 transform-gpu"
                        : "opacity-50 scale-100"
                    }`}
                    onClick={() => setEmotion(em.value)}
                  >
                    <div className="text-2xl transform-gpu">
                      {em.label.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-medium">
                      {em.label.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* slider */}
            <div className="relative px-2">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
              />
              <Slider
                value={[emotion]}
                onValueChange={(value) => setEmotion(value[0])}
                min={0}
                max={100}
                step={1}
                className="py-4"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground animate-pulse">
                Slide to express how you're feeling today
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default page;
