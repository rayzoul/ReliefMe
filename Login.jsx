import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import this line

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

      const checkDayData = {
        check_day_id: 1, // Replace with the desired check day ID
        check_day_name: 'Monday', // Replace with the desired check day name
        coin_id: '...', // Replace with the desired coin ID
        diary_id: '...' // Replace with the desired diary ID
      };

      const checkDayRef = await addDoc(collection(db, 'user', userRef.id, 'wallet', walletRef.id, 'Check_day'), checkDayData);
      console.log('เพิ่มข้อมูล Check_day เรียบร้อยแล้ว', checkDayRef.id);

      const coinData = {
        coin_id: `040${randomID}`,
        coin_num: 0 // Replace with the desired coin number
      };

      const coinRef = await addDoc(collection(db, 'user', userRef.id, 'wallet', walletRef.id, 'Check_day', checkDayRef.id, 'coin'), coinData);
      console.log('เพิ่มข้อมูล coin เรียบร้อยแล้ว', coinRef.id);


      const selttestData = {
        self_test_id: `005${randomID}`,
        selt_test_name: '...',
        selt_test_level: 0,
        selt_test_status: '...',
        user_id: `001${randomID}`

      };


      const selttestRef = await addDoc(collection(db, 'user', userRef.id, 'selt_test'), selttestData);
      console.log('เพิ่มข้อมูล selttest เรียบร้อยแล้ว', selttestRef.id);

      const heal_articleData = {
        heal_article_id: `006${randomID}`,
        heal_article_title: '...',
        heal_article_img: '...',
        heal_article_link: '...',
        subject_id: `007${randomID}`,
        type_id: `008${randomID}`,
        user_id: `001${randomID}`,
        admin_id: `001${randomID}`

      };

      const heal_articleRef = await addDoc(collection(db, 'user', userRef.id, 'heal_article'), heal_articleData);
      console.log('เพิ่มข้อมูล heal_article เรียบร้อยแล้ว', heal_articleRef.id);


      const heal_testData = {
        heal_test_id: `009${randomID}`,
        heal_title_title: '...',
        heal_title_img: '...',
        heal_title_link: '...',
        subject_id: `007${randomID}`,
        type_id: `008${randomID}`,
        user_id: `001${randomID}`,
        admin_id: `001${randomID}`

      };

      const heal_testRef = await addDoc(collection(db, 'user', userRef.id, 'heal_test'), heal_testData);
      console.log('เพิ่มข้อมูล heal_test เรียบร้อยแล้ว', heal_testRef.id);



      const diyData = {
        diy_id: `010${randomID}`,
        diy_date_post: Timestamp.now(), // Use Timestamp from firestore
        diy_img: '...',
        diy_text: '...',
        user_id: `001${randomID}`,
        subject_id: `007${randomID}`,
        admin_id: `001${randomID}`
      };

      const diyRef = await addDoc(collection(db, 'user', userRef.id, 'diy'), diyData);
      console.log('เพิ่มข้อมูล diy เรียบร้อยแล้ว', diyRef.id);

      const diaryData = {
        dairy_id: `010${randomID}`,
        dairy_date_write: Timestamp.now(), // Use Timestamp from firestore
        dairy_img: '...',
        text_diary_id: '...',
        user_id: `001${randomID}`,
      };

      const diaryRef = await addDoc(collection(db, 'user', userRef.id, 'diary'), diaryData);
      console.log('เพิ่มข้อมูล diary เรียบร้อยแล้ว', diaryRef.id);

      const resultData = {
        result_id: `011${randomID}`,
        result_name: '...',
        dairy_id: `010${randomID}`,
      };

      const resultRef = await addDoc(collection(db, 'user', userRef.id, 'diary', diaryRef.id, 'result'), resultData);
      console.log('เพิ่มข้อมูล result เรียบร้อยแล้ว', resultRef.id);

      const highvalueData = {
        high_value_id: `011${randomID}`,
        high_value_name: '...',
        result_id: `011${randomID}`,
        period_id: `012${randomID}`
      };

      const highvalueRef = await addDoc(collection(db, 'user', userRef.id, 'diary', diaryRef.id, 'result', resultRef.id, 'high_value'), highvalueData);
      console.log('เพิ่มข้อมูล highvalue เรียบร้อยแล้ว', highvalueRef.id);

      const periodData = {
        period_id: `012${randomID}`,
        period_name: '...'
      };

      const periodRef = await addDoc(collection(db, 'user', userRef.id, 'diary', diaryRef.id, 'result', resultRef.id, 'period'), periodData);
      console.log('เพิ่มข้อมูล highvalue เรียบร้อยแล้ว', periodRef.id);

      const adviceData = {
        advice_id: `012${randomID}`,
        advice_name: '...',
        advice_description: '...',
        period_id: `012${randomID}`
      };

      const adviceRef = await addDoc(collection(db, 'user', userRef.id, 'diary', diaryRef.id, 'result', resultRef.id, 'high_value', highvalueRef.id, 'advice'), adviceData);
      console.log('เพิ่มข้อมูล advice เรียบร้อยแล้ว', adviceRef.id);

      const conclusionData = {
        conclusion_id: `013${randomID}`,
        conclusion_name: '...',
        advice_id: `012${randomID}`,
        self_test_id: `005${randomID}`,
        heal_article_id: `006${randomID}`,
        heal_test_id: `009${randomID}`,
        diy_id: `010${randomID}`
      };
      
      // เพิ่มเอกสาร "conclusion" ในเอกสาร "selt_test"
      const conclusionRefInSeltTest = await addDoc(collection(db, 'user', userRef.id, 'selt_test', selttestRef.id, 'conclusion'), conclusionData);
      console.log('เพิ่มข้อมูล conclusion เรียบร้อยแล้ว', conclusionRefInSeltTest.id);
      
      // เพิ่มเอกสาร "conclusion" ในเอกสาร "advice"
      const conclusionRefInAdvice = await addDoc(collection(db, 'user', userRef.id, 'diary', diaryRef.id, 'result', resultRef.id, 'high_value', highvalueRef.id, 'advice', adviceRef.id, 'conclusion'), conclusionData);
      console.log('เพิ่มข้อมูล conclusion เรียบร้อยแล้ว', conclusionRefInAdvice.id);

      // เพิ่มเอกสาร "conclusion" ในเอกสาร "heal_article"
      const conclusionRefInHealarticle = await addDoc(collection(db, 'user', userRef.id, 'heal_article', heal_articleRef.id, 'conclusion'), conclusionData);
      console.log('เพิ่มข้อมูล conclusion เรียบร้อยแล้ว', conclusionRefInHealarticle.id);

      // เพิ่มเอกสาร "conclusion" ในเอกสาร "heal_test"
      const conclusionRefInHealTest = await addDoc(collection(db, 'user', userRef.id, 'heal_test', heal_testRef.id, 'conclusion'), conclusionData);
      console.log('เพิ่มข้อมูล conclusion เรียบร้อยแล้ว', conclusionRefInHealTest.id);
      
      // เพิ่มเอกสาร "conclusion" ในเอกสาร "diy"
      const conclusionRefInDiy = await addDoc(collection(db, 'user', userRef.id, 'diy', diyRef.id, 'conclusion'), conclusionData);
      console.log('เพิ่มข้อมูล conclusion เรียบร้อยแล้ว', conclusionRefInDiy.id);



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

