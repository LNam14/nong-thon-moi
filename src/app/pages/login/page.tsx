"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { loginAsync } from "@/app/redux-store/login/slice";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import "./page.css";
interface LooseObject {
  [key: string]: any;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const token: any = getCookie("token");
  const [data, setData] = useState<LooseObject>({
    UserName: "",
    PasswordHash: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    if (token) {
      window.location.replace("/admin/pages/dashboard");
    }
  }, [token]);

  const handleLogin = async () => {
    const res = await dispatch(loginAsync({ data: data }));
    if (res.meta.requestStatus === "rejected") {
      setLoginFailed(true);
      alert("Vui lòng kiểm tra lại thông tin đăng nhập!");
    }
    if (res.meta.requestStatus === "fulfilled") {
      setCookie("username", data.UserName);
      window.location.replace("/admin/pages/dashboard");
    }
  };

  if (token) {
    return null;
  }
  return (
    <body
      className="login"
      style={{
        backgroundImage: 'url("/images/logo/trongdong.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 51%",
      }}
    >
      <div className="login-right">
        <div className="wrap">
          <div
            className="login-header"
            style={{
              backgroundColor: "#ff0000",
              backgroundImage: "url(/images/logo/logo1.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
            }}
          >
            <div
              className="logoLog"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              ĐẢNG CỘNG SẢN VIỆT NAM
            </div>
            <div
              className="logon logon2"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              HUYỆN ỦY KRÔNG ANA
            </div>
          </div>
          <div id="login_box" className="loginBox">
            <div className="thongtin-coquan">
              <h2
                style={{
                  backgroundImage: "url(/images/logo/VPDT.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center top",
                  textIndent: "-9999px",
                  lineHeight: "40px",
                }}
              >
                VĂN PHÒNG ĐIỆN TỬ
              </h2>

              <h4
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "550",
                }}
              >
                Mời đăng nhập hệ thống
              </h4>
            </div>
            <div className="thongtin-dangnhap">
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
              />
              <div className="inputBox input-group">
                <span className="input-group-addon">
                  <i className="material-symbols-outlined">person</i>
                </span>
                <input
                  type="text"
                  className={`form-control${loginFailed ? " input-failed" : ""
                    }`}
                  placeholder="Tên tài khoản"
                  value={data.UserName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      UserName: e.target.value,
                    })
                  }
                  onSelect={() => setLoginFailed(false)}
                />
              </div>
              &nbsp;
              <div className="inputBox input-group">
                <span className="input-group-addon">
                  <i className="material-symbols-outlined">lock</i>
                </span>
                <input
                  type="password"
                  className={`form-control${loginFailed ? " input-failed" : ""
                    }`}
                  placeholder="Mật khẩu"
                  value={data.PasswordHash}
                  onChange={(e) =>
                    setData({
                      ...data,
                      PasswordHash: e.target.value,
                    })
                  }
                  onSelect={() => setLoginFailed(false)}
                />
              </div>
              <div className="forgot-password">
                <a href="#">Quên mật khẩu?</a>
              </div>
              &nbsp;
            </div>
            <div className="mar-center clearfix">
              <div className="btnLog">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer panel-footer">
          <div className="Group-1 fGroup">
            <div>
              <strong>Cơ quan chủ quản:</strong>
              <span> Văn phòng Huyện ủy Krông Ana</span>
            </div>
            {/* <div>
              <strong>Địa chỉ:</strong>
              <span>
                {" "}
                UBND huyện Krông Ana - 94 Nguyễn Tất Thành, Thị trấn Buôn Trấp, huyện Krông Ana, tỉnh Đắk Lắk
              </span>
            </div>
            <div>
              <strong>Điện thoại:</strong>
              <span> 0262 3637026 , số Fax: (0262)-3522-267</span>
            </div> */}
          </div>
          {/* <div className="Group-2 fGroup">
            <div>
              <strong>Đơn vị quản lý:</strong>
              <span> Huyện ủy Krông Ana</span>
            </div>
            <div>
              <strong>Điện thoại:</strong>
              <span> 0262 3637026 </span>
            </div>
          </div> */}
          <div className="Group-3 fGroup">
            <div>
              <strong>Bản quyền © 2024 Văn phòng Huyện ủy Krông Ana</strong>
            </div>
            <div>
              <strong>Thiết kế và phát triển:</strong> Công ty Công nghệ
              Takatech{" "}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
