import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import { BsGoogle, BsFacebook, BsX, BsEye, BsEyeSlash } from 'react-icons/bs';

function Register({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Do something after registering with email and password
      onClose();
    } catch (error) {
      console.error('Error registering with email and password:', error);
    }
  };

  return (
    <div className="bg-white w-96 rounded-[16px] p-8 pb-4 relative">
      <button className='absolute top-3 right-3 text-[32px]' onClick={onClose}><BsX /></button>
      <h2 className="text-[36px] text-center text-[#151515] font-medium mb-2 fontMitr ">ลงทะเบียน</h2>
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
            className="fontMitr w-full border border-gray-300 rounded-md px-3 py-2 bg-[#fff] text-[#151515]"
          />
        </div>
        <input type="checkbox" className='' /><label className='fontMitr'> ฉันยอมรับ <a className='hover:text-[#EC7966]' target='_blank' href='https://www.google.com'>เงื่อนไขการให้บริการ</a></label>

        <div className="flex justify-end">
          <button
            type="button"
            className="fontMitr font-medium w-full btn bg-[#EC7966] text-[#fff] hover:bg-[#F2A194]"
            onClick={handleEmailRegistration}
          >
            ลงทะเบียน
          </button>
        </div>
      </form>
      <div className='mt-4 h-[0.5px] bg-[#E0E0E0]'></div>
      <p className='text-center fontMitr mt-4'>มีบัญชีอยู่แล้ว? <a className='hover:text-[#EC7966]' target='_blank' href='https://www.google.com'>เข้าสู่ระบบ</a></p>
    </div>
  );
}

export default Register;
