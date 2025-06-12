// 'use client'
import Image from "next/image";
import Intro from '@/components/intro';
import Marquee from '@/components/marquee';
import Recentposts from '@/components/recent-posts';
import RecentProjects from '@/components/recent-projects';


export default function Home() {


  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Intro />
          <div className="mb-12">
            <Marquee />
          </div>
        <Recentposts/>

        <RecentProjects/>

      </div>
    </section>
  );
}
