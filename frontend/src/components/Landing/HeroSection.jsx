import { MaskContainer } from "@/components/ui/svg-mask-effect";
import hero2 from "@/assets/hero2.svg";
import hero1 from "@/assets/hero1.svg";

export default function HeroSection() {
  return (
    <div className="max-h-[80vh] w-full overflow-hidden border-b-2 bg-indigo-200">
      <MaskContainer
        revealText={
          <div className="flex flex-col items-center justify-center space-y-10 lg:flex-row lg:space-x-20">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-slate-800 md:text-3xl lg:mb-4 lg:text-4xl">
                Share Ideas, Inspire Minds – Welcome to
                <span className="text-indigo-600"> Blogify!</span>
              </h1>
              <p className="text-slate-700 lg:text-lg">
                Publish your thoughts, explore inspiring stories, and connect with readers
                worldwide.
              </p>
            </div>
            <img src={hero1} alt="hero1" className="h-40 md:h-60 lg:h-80" />
          </div>
        }
        className="rounded-md border text-white dark:text-black"
      >
        <div className="space-x-30 mb-10 flex items-center justify-center">
          <img src={hero2} alt="hero2" className="h-50" />
          <div>
            <h1 className="mb-2 lg:mb-4">
              <span className="text-indigo-500">Blogging</span> made super easy!
            </h1>
            <p className="text-base font-normal lg:text-lg">
              Create, publish, and share in minutes.
            </p>
          </div>
        </div>
      </MaskContainer>
    </div>
  );
}
