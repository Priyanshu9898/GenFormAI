import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-2xl px-4 py-32 lg:flex lg:h-screen ">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Generate Custom Forms
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                In Seconds not in hours.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Say goodbye to tedious form creation. Leverage our AI-powered tool
              to create customized forms in seconds, enhancing your productivity
              and efficiency.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none  active:bg-purple-700 sm:w-auto"
                href="/login"
              >
                + Create AI form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
