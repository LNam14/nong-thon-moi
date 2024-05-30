"use client";
import { getAllBanner, getBannerList } from "@/app/redux-store/banner/slice";
import { getCategory, getCategoryList } from "@/app/redux-store/category/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getAllLogo, getLogoList } from "@/app/redux-store/logo/slice";
import { getNewsByCategory, getNewsList } from "@/app/redux-store/news/slice";
import { getNewsRight, getRightList } from "@/app/redux-store/right/slice";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import "./filesx/bootstrap.css";
import "./filesx/colorstyle1.css";
import "./filesx/jquerynice-select.css";
import "./filesx/portal-congtinh.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateNewsView } from "@/app/redux-store/update-view/slice";
import { getMenu, getMenuList } from "@/app/redux-store/menu/slice";
interface HomeItem {
  TenDanhMuc: number;

  news?: {
    ID: number;
    TenDanhMuc: string;
    createBy: string;
    createDate: string;
    TieuDeChinh: string;
    TieuDePhu: string;
    TrangThai: string;
    NoiDung: string;
    LuotXem: number;
  };
}
interface NewItem {
  ID: number;
  TenDanhMuc: string;
  createBy: string;
  createDate: string;
  TieuDeChinh: string;
  TieuDePhu: string;
  TrangThai: string;
  NoiDung: string;
  LuotXem: number;
  HinhAnh: string;
}
interface LogoItem {
  ID: number;
  image: string;
}

interface BannerItem {
  ID: number;
  image: string;
}

interface LooseObject {
  [key: string]: any;
}
interface MenuItem {
  ID: number;
  TenDanhMuc: string;
  IsDanhMuc: string;
}
const FeetBack = () => {
  const dispatch = useAppDispatch();
  const newsList: NewItem[] = useAppSelector(getNewsList);
  const [newsListState, setNewsListState] = useState<NewItem[]>([]);

  const rightList: HomeItem[] = useAppSelector(getRightList);
  const [rightListState, setRightListState] = useState<HomeItem[]>([]);

  const [selectedNewsItem, setSelectedNewsItem] = useState<any>(null);
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    ID: 0,
  });

  const logoList: LogoItem[] = useAppSelector(getLogoList);
  const [logoListState, setLogoListState] = useState<LogoItem[]>([]);

  const bannerList: BannerItem[] = useAppSelector(getBannerList);
  const [bannerListState, setBannerListState] = useState<BannerItem[]>([]);


  const menuList: MenuItem[] = useAppSelector(getMenuList);
  const [menuListState, setMenuListState] = useState<MenuItem[]>([]);
  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getAllLogo());
      await dispatch(getAllBanner());
      await dispatch(getNewsRight());
      await dispatch(getMenu());
    };
    asyncCall();
  }, []);
  useEffect(() => {
    if (menuList) {
      setMenuListState(menuList);
    }
  }, [menuList]);
  useEffect(() => {
    if (rightList) {
      setRightListState(rightList);
    }
  }, [rightList]);
  useEffect(() => {
    if (bannerList) {
      setBannerListState(bannerList);
    }
  }, [bannerList]);
  useEffect(() => {
    if (logoList) {
      setLogoListState(logoList);
    }
  }, [logoList]);

  useEffect(() => {
    const storedNewsItem = localStorage.getItem("newsItems");
    if (storedNewsItem) {
      setSelectedNewsItem(JSON.parse(storedNewsItem));
    }
  }, []);

  useEffect(() => {
    if (selectedNewsItem) {
      setData((prevData) => ({
        ...prevData,
        TenDanhMuc: selectedNewsItem.TenDanhMuc,
        ID: selectedNewsItem.ID,
      }));
    }
  }, [selectedNewsItem]);

  useEffect(() => {
    const asyncCall = async () => {
      if (data.TenDanhMuc !== "") {
        await dispatch(getNewsByCategory({ data }));
      }
    };

    asyncCall();
  }, [data, dispatch]);

  useEffect(() => {
    const asyncCall = async () => {
      if (data.ID !== 0) {
        // Đảm bảo data.ID không rỗng
        try {
          await dispatch(updateNewsView(data)); // Dispatch action updateNewsView với data
        } catch (error) {
          console.error("Error updating news view:", error);
        }
      }
    };

    asyncCall();
  }, [data, dispatch]);

  useEffect(() => {
    if (newsList) {
      setNewsListState(newsList);
    }
  }, [newsList]);

  const currentDate = moment();
  const formattedDate = currentDate.format("dddd, [ngày] D/M/YYYY");
  const formattedDay = formattedDate.replace(/^./, (str) => str.toUpperCase());
  const router = useRouter();
  const handleDetailNews = (newsItems: []) => {
    localStorage.setItem("newsItems", JSON.stringify(newsItems));
    window.location.reload();
  };
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const handleCategories = (category: any) => {
    localStorage.setItem("category", JSON.stringify(category));
    localStorage.setItem("isCategory", JSON.stringify(category));
    router.push(`/pages/categories`);
  };
  const handleIsCategories = (category: any, isCategory: any) => {
    localStorage.setItem("category", JSON.stringify(category));
    localStorage.setItem("isCategory", JSON.stringify(isCategory));
    router.push(`/pages/categories`);
  };
  const handleFeetBack = () => {
    window.location.href = `/pages/feetback`;
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <html lang="en">
      <head>
        <title>CỔNG THÔNG TIN ĐIỆN TỬ NÔNG THÔN MỚI TỈNH ĐẮK LẮK</title>
      </head>
      <body className="mas-portal v2">
        <header>
          <div className="logo-reponsive">
            {logoListState &&
              logoListState.map((item: LogoItem, index: number) => (
                <img
                  className={`img-logo-hi ${index === 0 ? 'img-logo-hi-100' : 'img-logo-hi-80'}`}
                  key={index}
                  src={item.image}
                />
              ))}
          </div>
          <nav
            id="lv-navbar"
            className="navbar navbar-default lv-navbar-no-submenu"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="banner-content">
              <div className="portal-banner">
                <div className="hidden-xs">
                  <a className="logoPortal" style={{ display: "flex" }}>
                    {logoListState &&
                      logoListState.map((item: LogoItem, index: number) => (
                        <img
                          className={`img-logo-hi ${index === 0 ? 'img-logo-hi-100' : 'img-logo-hi-80'}`}
                          key={index}
                          alt=""
                          src={item.image}

                        />
                      ))}
                  </a>
                </div>
              </div>
              <div className="slide-banner">
                {bannerListState &&
                  bannerListState.map((item: LogoItem, index: number) => (
                    <div key={index}>
                      <img src={item.image} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="lv-menu-top-full">
              <button type="button" className={`navbar-toggle ${menuOpen ? '' : 'collapsed'}`} onClick={toggleMenu}>
                {menuOpen ? <div style={{ color: '#D9281C', fontSize: '24px', marginTop: -10 }} className="close-icon">X</div> : (
                  <>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </>
                )}</button>

              <div className="lv-menu-top">
                <div
                  className={`navbar-collapse collapse ${menuOpen ? 'in' : ''}`}
                  id="bs-example-navbar-collapse-1"
                >
                  <div id="ctl00_g_c5efd52c_bd0f_47a3_a92f_799f15324153">
                    <link
                      rel="stylesheet"
                      href="https://www.angiang.dcs.vn/Style%20Library/en-us/Core%20Styles/QuanTriMenu.css"
                    />
                    <div
                      id="MenuTopMain"
                      className="menu-top"
                      style={{ display: "block" }}
                    >
                      <div className="containerdiv containerdiv-LV1 nobackground hasChildren">
                        <ul className="container container-LV1">

                          <li className="menutop menutop-index-2 menutop-LV1 hasChildren hasChildrenLV1 ">
                            <div className="content content-LV1 hasChildren hasChildrenLV1 ">
                              <div className=" hasChildren hasChildrenLV1 contenticon contenticon-LV1 divnoicon noicon">
                              </div>
                              <a
                                className="contentlink contentlink-LV1 hasChildren hasChildrenLV1 "
                                href="/"
                              >
                                TRANG CHỦ
                              </a>
                            </div>
                          </li>
                          {menuListState
                            ? [...menuListState]
                              .sort((a: any, b: any) => a.ID - b.ID)
                              .map((items: any, index: number) => (
                                <li className="menutop menutop-index-3 menutop-LV1" key={index}>
                                  <div className="content content-LV1">
                                    <a
                                      style={{ cursor: "pointer" }}
                                      className="contentlink contentlink-LV1"
                                      onClick={() => {
                                        handleCategories(items.TenDanhMuc);
                                      }}
                                    >
                                      {items.TenDanhMuc}
                                    </a>
                                  </div>
                                  <div className="containerdiv containerdiv-LV2 nobackground showChildren">
                                    <ul className="nav nav-pills">
                                      {items.sub
                                        .map((newsItem: any, subIndex: number) => (
                                          <li className="dropdown" key={subIndex}>
                                            <a
                                              style={{ cursor: "pointer" }}
                                              className="dropdown-toggle"
                                              role="button"
                                              onClick={() => {
                                                handleIsCategories(
                                                  newsItem.TenDanhMuc,
                                                  items.TenDanhMuc
                                                );
                                              }}
                                            >
                                              {newsItem.TenDanhMuc}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                </li>
                              ))
                            : null}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </nav>
          <div className="search-tool">
            <div className="row">
              <div className="col-md-3 search1">
                <div id="currentdate" className="time">
                  {formattedDay}
                </div>
              </div>
              <div className="col-md-6 search2">
                <Marquee className="customText_Blue" pauseOnHover speed={40}>
                  Chào mừng quý vị đến với &nbsp;
                  <strong>CỔNG THÔNG TIN ĐIỆN TỬ CHƯƠNG TRÌNH NÔNG THÔN MỚI TỈNH ĐẮK LẮK</strong>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                </Marquee>
              </div>
              <div className="col-md-3 search3" style={{ display: "flex" }}>
                <input type="text" style={{ height: 30 }} />
              </div>
            </div>
          </div>
        </header>

        <div className="portalMain homeMain">
          <div className="portal-left">
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                borderBottom: "2px solid #d9d9d9",
                marginBottom: 1,
                marginLeft: 0.2,
                color: "#000",
                lineHeight: 2,
                fontFamily: "Roboto, sans-serif",
                cursor: "pointer",
              }}
              onClick={() => {
                handleCategories(selectedNewsItem.TenDanhMuc);
              }}
            >
              GÓP Ý
            </Typography>

            <Box className="input-feetback-1">
              <input className="input-1" placeholder={"Cơ quan/ Đơn vị/ Tổ chức, doanh nghiệp, người dân"} />
              <input className="input-1" placeholder={"Email"} />
            </Box>
            <Box className="input-feetback-1">
              <input className="input-1" placeholder={"Số điện thoại"} />
              <input className="input-1" placeholder={"Địa chỉ"} />
            </Box>
            <Box className="input-feetback-2">
              <input className="input-2" placeholder={"Tiêu đề"} />
              <textarea className="input-3" placeholder="Nội dung" rows={3}></textarea>
            </Box>
            <Box>
              <Button variant="outlined" color="error" className="btn-feetback">Gửi góp Ý</Button>
            </Box>
          </div>
          <div className="portal-right">
            {rightListState.map((items: any, index: number) => (
              <div className="right1" key={index}>
                <div className="ms-webpart-zone ms-fullWidth">
                  <div id="MSOZoneCell_WebPartWPQ12" className="s4-wpcell-plain ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth ">
                    <div className="ms-webpart-chrome ms-webpart-chrome-vertical ms-webpart-chrome-fullWidth ">
                      <div id="WebPartWPQ12" style={{ width: "100%" }} className="ms-WPBody ">
                        <div className="ms-rtestate-field">
                          <div className="post-category-slide ng-scope" id="CapUy" ng-controller="CapUy">
                            <div className="lv-category">
                              <a>{items.TenDanhMuc}</a>
                            </div>
                            {items.news.length > 1 ? (
                              <Slider
                                ref={sliderRef}
                                className="nbs-flexisel-container"
                                dots={false}
                                infinite={true}
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                              >
                                {items.news.map((newsItem: any, newsIndex: number) => (
                                  <div key={newsIndex} className={`nbs-flexisel-item ${newsIndex > 0 ? "slide" : ""}`}
                                    onClick={() => { handleDetailNews(newsItem); }}
                                  >
                                    <a>
                                      <div className="divimg">
                                        <img className="img-responsive" src={newsItem.HinhAnh} alt={`Image ${newsIndex}`} />
                                      </div>
                                    </a>
                                    <div style={{ textAlign: "center", padding: 10 }}>
                                      <span>{newsItem.TieuDeChinh}</span>
                                    </div>
                                  </div>
                                ))}
                              </Slider>
                            ) : (
                              // Render single news item without slider
                              items.news.map((newsItem: any, newsIndex: number) => (
                                <div key={newsIndex} className="single-news-item"
                                  onClick={() => { handleDetailNews(newsItem); }}
                                >
                                  <a>
                                    <div className="divimg">
                                      <img className="img-responsive" src={newsItem.HinhAnh} alt={`Image ${newsIndex}`} />
                                    </div>
                                  </a>
                                  <div style={{ textAlign: "center", padding: 10 }}>
                                    <span>{newsItem.TieuDeChinh}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}


            <div className="right4">
              <div className="ms-webpart-zone ms-fullWidth">
                <div
                  id="MSOZoneCell_WebPartWPQ16"
                  className="s4-wpcell-plain ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth "
                >
                  <div className="ms-webpart-chrome ms-webpart-chrome-vertical ms-webpart-chrome-fullWidth ">
                    <div
                      id="WebPartWPQ16"
                      style={{ width: "100%" }}
                      className="ms-WPBody "
                    >
                      <div className="ms-rtestate-field">
                        <div
                          className="banner-group group1 ng-scope"
                          id="BannerRight3"
                          ng-controller="BannerRight3"
                        >
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a target="_blank">
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/Cuoc-thi-tren-VCnet.png"
                                src="./filesx/Cuoc-thi-tren-VCnet.png"
                              />
                            </a>
                          </div>
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a >
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/home-cen-2.png"
                                src="./filesx/home-cen-2.png"
                              />
                            </a>
                          </div>
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a target="_parent">
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/home-cen-3.png"
                                src="./filesx/home-cen-3.png"
                              />
                            </a>
                          </div>
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a target="_blank">
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/Banner-thi-dua-yeu-nuoc.jpg"
                                src="./filesx/Banner-thi-dua-yeu-nuoc.jpg"
                              />
                            </a>
                          </div>
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a href="pages/login" target="_blank">
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/home-bot-3.png"
                                src="./filesx/home-bot-3.png"
                              />
                            </a>
                          </div>
                          <div
                            className="banner-img ng-scope"
                            ng-repeat="dataItem in DataHtml track by $index"
                          >
                            <a target="_blank">
                              <img
                                className="img-responsive"
                                alt=""
                                ng-src="KhoHinhAnhBanner/banner-ht.jpg"
                                src="./filesx/banner-ht.jpg"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="ms-clear"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-content row" style={{ width: "75%" }}>
            <div id="ctl00_g_91ea13ce_902e_4f6e_b075_5bed268b3192">
              <div>
                <strong style={{ fontFamily: "tahoma" }}>
                  CỔNG THÔNG TIN ĐIỆN TỬ NÔNG THÔN MỚI TỈNH ĐẮK LẮK
                </strong>
              </div>
              <div>
                VĂN PHÒNG ĐIỀU PHỐI CHƯƠNG TRÌNH XÂY DỰNG NÔNG THÔN MỚI TỈNH ĐẮK LẮK
              </div>
              <div>
                <strong>Trụ sở&#58;</strong>&#160;số 47 Nguyễn Tất Thành, thành phố Buôn Ma Thuột, tỉnh Đắk Lắk.
                <br />
                <strong>Điện thoại&#58;</strong>0262.3955787&#160;&#160; - <strong>Fax&#58;</strong>0262.3957449
                <strong>
                  <br />
                </strong>
              </div>
              <div>
                <strong>Email&#58;</strong>vpdpntm@daklak.gov.vn <b>hoặc</b> vpdpntmdaklak@gmail.com
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
};
export default FeetBack;
