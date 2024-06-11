import Input from "@/components/common/Input";
import Password from "@/components/common/Input/Password";
import { auth } from "@/libs/firebase/firebase.config";
import { IonPage } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  return (
    <IonPage>
      <div className="w-full min-h-[100vh] flex items-center justify-center p-[48px] bg-blue bg-opacity-20">
        <div className="rounded-3xl w-full md:w-[50%] shadow-lg bg-white">
          <div className="w-full p-8 flex flex-col gap-8 items-center">
            <p className="text-xl font-bold uppercase">Đăng nhập</p>

            <div className="w-full flex flex-col gap-3">
              <Input
                value={userName}
                type="email"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tên đăng nhập"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className={` text-center bg-blue hover:bg-opacity-90 text-white text-[18px] py-4 font-bold rounded-full w-full `}
              onClick={() => {
                if (!userName || !password) {
                  toast.error("Vui lòng nhập đủ thông tin!");
                  return;
                }
                signInWithEmailAndPassword(auth, userName, password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);

                    history.push("/");
                  })
                  .catch(() => {
                    // const errorMessage = error.message;
                    toast.error(
                      "Tài khoản không hợp lệ! Tài khoản không hợp lệ! Tài khoản không hợp lệ!"
                    );
                    setPassword("");
                  });
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;
