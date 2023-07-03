import PictureComponent from "../components/picture";
import SectionComponent from "../components/sections";
import DateComponent from "../components/date";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="flex flex-col w-full lg:flex-row">
            <PictureComponent></PictureComponent>
            <div className="px-5 max-w-md">
              <h1 className="text-5xl font-bold">Hello there.</h1>
              <h2 className="font-bold">
                It's currently
                <span className="text-green-500">
                  <DateComponent></DateComponent>
                </span>
              </h2>
              <div className="flex flex-col w-full lg:flex-row">
                <SectionComponent></SectionComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
