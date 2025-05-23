import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, setError, googleAuthInitiate } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setError(null);
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(`Login failed: ${errorParam.replace(/_/g, ' ')}`);
    }
    const signupParam = searchParams.get('signup');
    if (signupParam === 'success') {
    }
  }, [setError, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left side - Image and Text */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 text-white px-12 max-w-lg">
          <h1 className="text-4xl font-bold mb-6">AI-Powered Experience</h1>
          <p className="text-lg opacity-90 mb-8">
            Access your intelligent assistant and unlock the power of advanced AI.
            Let our cutting-edge algorithms transform your workflow and elevate your
            productivity to unprecedented levels.
          </p>
          <div className="flex items-center space-x-3">
            <p className="text-sm uppercase font-bold">Intelligent Solutions</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-16 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all bg-gray-50"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium shadow-sm transition-all duration-200 transform hover:translate-y-[-2px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="mx-4 text-sm text-gray-500">or</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="">
              <button
                type="button"
                onClick={googleAuthInitiate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
              >
                <FcGoogle size={20} />
                Sign in with Google
              </button>
            </div>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
