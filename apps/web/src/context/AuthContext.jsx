import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpId, setOtpId] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      if (pb.authStore.isValid) {
        setCurrentUser(pb.authStore.model);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    checkAuth();

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      setCurrentUser(authData.record);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        fullName: name,
      });
      return await login(email, password);
    } catch (error) {
  console.log("SIGNUP ERROR:", error);
  throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    toast.success('Sesión cerrada');
  };

  const loginWithOAuth = async (provider) => {
    try {
      const authData = await pb.collection('users').authWithOAuth2({ provider });
      setCurrentUser(authData.record);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const requestOTP = async (email) => {
    try {
      // Create user if doesn't exist for passwordless flow
      try {
        const tempPassword = crypto.randomUUID();
        await pb.collection('users').create({
          email: email,
          password: tempPassword,
          passwordConfirm: tempPassword,
        });
      } catch (e) {
        // User might already exist, ignore
      }

      const result = await pb.collection('users').requestOTP(email);
      setOtpId(result.otpId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (code) => {
    if (!otpId) throw new Error('No OTP request found');
    try {
      const authData = await pb.collection('users').authWithOTP(otpId, code);
      setCurrentUser(authData.record);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithOAuth,
    requestOTP,
    verifyOTP,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};