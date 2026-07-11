import React, { useState } from 'react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="relative py-24 bg-[#F0F2F5] overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 z-[-1]">
        <img src="/images/shape1.svg" alt="" />
        <img src="/images/dark_shape.svg" alt="" />
      </div>
      <div className="absolute top-0 right-5 z-[-1]">
        <img src="/images/shape2.svg" alt="" />
        <img src="/images/dark_shape1.svg" alt="" className="opacity-50" />
      </div>
      <div className="absolute bottom-0 right-[327px] z-[-1]">
        <img src="/images/shape3.svg" alt="" />
        <img src="/images/dark_shape2.svg" alt="" className="opacity-50" />
      </div>

      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Left Image */}
          <div className="hidden lg:block lg:w-2/3">
            <img src="/images/login.png" alt="Login" className="max-w-[633px]" />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-12 rounded-[6px]">
              {/* Logo */}
              <div className="mb-7 flex justify-center">
                <img src="/images/logo.svg" alt="Logo" className="max-w-[161px]" />
              </div>

              <p className="text-center mb-2 font-normal">Welcome back</p>
              <h4 className="text-center text-2xl font-medium mb-12 text-[#312000]">Login to your account</h4>

              {/* Google Button */}
              <button className="w-full border border-[#F0F2F5] bg-white py-3 px-15 rounded-[6px] flex items-center justify-center mb-10 hover:shadow-lg transition-shadow">
                <img src="/images/google.svg" alt="Google" className="max-w-5 mr-2" />
                <span className="font-medium text-base text-[#312000]">Or sign-in with google</span>
              </button>

              {/* Divider */}
              <div className="relative mb-10 text-center">
                <span className="text-gray-400 font-normal">Or</span>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-27 h-0.5 border border-[#DFDFDF] rounded-[6px]"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-27 h-0.5 border border-[#DFDFDF] rounded-[6px]"></div>
              </div>

              {/* Form */}
              <form>
                <div className="mb-3.5">
                  <label className="block mb-2 font-medium text-base text-[#4A5568]">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-[#E8E8E8] rounded-[6px] h-12 px-4 py-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3.5">
                  <label className="block mb-2 font-medium text-base text-[#4A5568]">Password</label>
                  <input
                    type="password"
                    className="w-full bg-white border border-[#E8E8E8] rounded-[6px] h-12 px-4 py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center">
                    <input type="radio" name="remember" id="remember" className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300" defaultChecked />
                    <label htmlFor="remember" className="ml-2 text-sm font-normal text-gray-700">Remember me</label>
                  </div>
                  <div>
                    <p className="text-sm text-[#1890FF]">Forgot password?</p>
                  </div>
                </div>

                <div className="mb-15">
                  <button
                    type="button"
                    className="w-full bg-[#1890FF] text-white font-medium text-base py-3 px-29 rounded-[6px] border border-transparent hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow"
                    onClick={() => onNavigate('feed')}
                  >
                    Login now
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm">
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }} className="text-[#1890FF]">Create New Account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
