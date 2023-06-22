import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'; // เพิ่ม import นี้

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

      const checkdayData = {
        check_day_id: `005${randomID}`,
        check_day_name: '...',
        coin: 0,
        diary_id: `006${randomID}`
      };
      
      const checkdayRef = await addDoc(collection(db, 'user', userRef.id, 'wallet', walletRef.id, 'check_day'), checkdayData);
      console.log('เพิ่มข้อมูล checkday เรียบร้อยแล้ว', checkdayRef.id);
      
      const coinData = {
        coin:0
      };
      
      const coinRef = await addDoc(collection(db, 'user', userRef.id, 'wallet', walletRef.id, 'coin'), coinData);
      console.log('เพิ่มข้อมูล checkday เรียบร้อยแล้ว', coinRef.id);
  
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
    <div className="bg-white w-96 rounded-md p-6">
      <h2 className="text-xl font-medium mb-4">เข้าสู่ระบบ</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email">อีเมล:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEmailLogin}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
      <p className="text-center text-sm mt-4">
        หรือเข้าสู่ระบบด้วย:
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="btn btn-primary"
          onClick={handleGoogleLogin}
        >
          Google
        </button>
        <button
          className="btn btn-primary"
          onClick={handleFacebookLogin}
        >
          Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;

