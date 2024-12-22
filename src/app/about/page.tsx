import React from 'react';
import Wrapper from '../../components/Wrapper';
export const revalidate=0;
const About = () => {
  return (
    <Wrapper title={"About"}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-neutral-100">About This App</h1>
        <p className="text-neutral-300 mb-2">
          Welcome to the server control application! This app provides an easy interface to manage Apache and MySQL services.Built with
          electronjs and reactjs
        </p>
        <p className="text-neutral-300">
          Created with passion by <strong>Tachera Sasi</strong>.
        </p>
      </div>
    </Wrapper>
  );
};

export default About;
