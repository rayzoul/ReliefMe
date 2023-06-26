import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'; // เพิ่ม import นี้

import { BsGoogle, BsFacebook, BsX, BsEye, BsEyeSlash } from "react-icons/bs";

function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userCount, setUserCount] = useState(0);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Do something after logging in with email and password
      createUserData(userCredential.user);
      onClose();
    } catch (error) {
      console.error('Error logging in with email and password:', error);
    }
  };

  const createUserData = async (user) => {
    try {
      const randomID = Math.floor(Math.random() * 1000000); // สุ่มตัวเลขระหว่าง 0-999999

      const userData = {
        admin_id: `001${randomID}`,
        user_email: user.email,
        user_fullname: '...',
        user_id: `001${randomID}`,
      };

      const userRef = await addDoc(collection(db, 'user'), userData);
      console.log('เพิ่มข้อมูลผู้ใช้งานเรียบร้อยแล้ว', userRef.id);

      const avatarData = {
        avatar_id: `002${randomID}`,
        avatar_url: '...',
        user_id: `001${randomID}`
        // เพิ่มข้อมูลอื่น ๆ เกี่ยวกับ avatar ตามต้องการ
      };

      const avatarRef = await addDoc(collection(db, 'user', userRef.id, 'avatar'), avatarData);
      console.log('เพิ่มข้อมูล avatar เรียบร้อยแล้ว', avatarRef.id);

      const frameData = {
        frame_id: `003${randomID}`,
        frame: '...',
        user_id: `001${randomID}`
        // เพิ่มข้อมูลอื่น ๆ เกี่ยวกับ frame ตามต้องการ
      };

      const frameRef = await addDoc(collection(db, 'user', userRef.id, 'frame'), frameData);
      console.log('เพิ่มข้อมูล frame เรียบร้อยแล้ว', frameRef.id);

      const walletData = {
        wallet_id: `004${randomID}`,
        wallet_sum: 0,
        check_day_id: 0
        // เพิ่มข้อมูลอื่น ๆ เกี่ยวกับ wallet ตามต้องการ
      };

      const walletRef = await addDoc(collection(db, 'user', userRef.id, 'wallet'), walletData);
      console.log('เพิ่มข้อมูล wallet เรียบร้อยแล้ว', walletRef.id);


    } catch (error) {
      console.error('Error creating user data:', error);
    }
  };







  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // Do something after logging in with Google
      createUserData(userCredential.user);
      onClose();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // Do something after logging in with Facebook
      createUserData(userCredential.user);
      onClose();
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
    }
  };


  return (
    <div className="bg-white w-96 rounded-[16px] p-8 relative">
      <button className='absolute top-3 right-3 text-[32px]' onClick={onClose}><BsX /></button>
      <h2 className="text-[36px] text-center text-[#151515] font-medium mb-2 fontMitr ">เข้าสู่ระบบ</h2>
      <p className='text-center font-light text-[#808080] mb-4 fontMitr'>เข้าสู่ระบบของคุณด้วยอีเมล</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className='fontMitr'>อีเมล:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="fontMitr w-full border border-gray-300 rounded-md px-3 py-2 bg-[#fff] text-[#151515]"
          />
        </div>
        <div>
          <label htmlFor="password" className='fontMitr'>รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" fontMitr w-full border border-gray-300 rounded-md px-3 py-2 bg-[#fff] text-[#151515]"
          />

        </div>
        <div className="flex  justify-center">
          <button
            type="button"
            className="fontMitr font-medium w-full btn bg-[#EC7966] text-[#fff] hover:bg-[#F2A194]"
            onClick={handleEmailLogin}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
      <div className='mt-4 h-[0.5px] bg-[#E0E0E0]'></div>
      <p className="text-[#808080] fontMitr text-center text-sm mt-4">
        หรือเข้าสู่ระบบด้วย
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="btn fontMitr font-medium bg-[#F2F2F3] text-[#151515] hover:bg-[#B9B9B9] rounded-full"
          onClick={handleGoogleLogin}
        >
          <BsGoogle /> Google
        </button>
        <button
          className="btn fontMitr font-medium bg-[#F2F2F3] text-[#151515] hover:bg-[#B9B9B9] rounded-full"
          onClick={handleFacebookLogin}
        >
          <BsFacebook /> Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;

