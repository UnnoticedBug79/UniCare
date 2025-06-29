import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/UNICARE_backend";

const network = process.env.DFX_NETWORK;
const identityProvider = "https://identity.ic0.app";

const Home = () => {
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const initAuth = async () => {
    const authClient = await AuthClient.create();
    setState((prev) => ({
      ...prev,
      authClient
    }));
    await updateActor(authClient);
  };
  initAuth();
  // eslint-disable-next-line
}, []);

const updateActor = async (authClientParam) => {
  const authClient = authClientParam || state.authClient;
  if (!authClient) return;
  const identity = authClient.getIdentity();
  const actor = createActor(canisterId, { agentOptions: { identity } });
  const isAuthenticated = await authClient.isAuthenticated();
  setState((prev) => ({
    ...prev,
    actor,
    isAuthenticated
  }));
};

  const login = async () => {
  if (!state.authClient) return;
  setLoading(true);
  await state.authClient.login({
    identityProvider,
    onSuccess: async () => {
      await updateActor(); // pastikan updateActor selesai sebelum loading=false
      setLoading(false);
    }
  });
};

const logout = async () => {
  if (!state.authClient) return;
  setLoading(true);
  await state.authClient.logout();
  await updateActor(); // pastikan updateActor selesai sebelum loading=false
  setLoading(false);
};

  const whoami = async () => {
    setState((prev) => ({
      ...prev,
      principal: "Loading..."
    }));
    if (!state.actor) return;
    const result = await state.actor.whoami();
    const principal = result.toString();
    setState((prev) => ({
      ...prev,
      principal
    }));
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-pink-400">
      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Welcome */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-green-700 via-blue-600 to-pink-500 p-10 text-white relative">
          <div>
            <div className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="inline-block w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" fillOpacity=".2"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              UniCare Portal
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome Page</h2>
            <p className="mb-8 text-lg opacity-90">Sign in to continue access</p>
          </div>
          <div className="text-sm opacity-70">www.unicare.com</div>
          {/* Bubble effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-400 opacity-30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-0 w-24 h-24 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
        </div>
        {/* Right: Login */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
          <div className="space-y-5">
            {!state.isAuthenticated ? (
              <button
                onClick={login}
                className="w-full py-3 rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow hover:from-blue-500 hover:to-green-500 transition text-lg"
                disabled={loading || !state.authClient}
              >
                {loading ? "Loading..." : "Login dengan Internet Identity"}
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full py-3 rounded bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition text-lg"
                disabled={loading}
              >
                Logout
              </button>
            )}
            <button
              onClick={whoami}
              className="w-full py-3 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-lg"
              disabled={loading}
            >
              Whoami
            </button>
          </div>
          <div className="mt-8 bg-gray-100 rounded-lg p-4 text-center shadow-inner">
            <div className="font-semibold mb-2 text-gray-700">Principal ID Anda:</div>
            <div className="font-mono break-all text-blue-800">{state.principal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home; 


