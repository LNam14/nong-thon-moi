"use client"
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getMonth, getMonthList } from "@/app/redux-store/statistical/get-30days/slice";
import { getStatistical, getStatisticalList } from "@/app/redux-store/statistical/slice";
import {
  Box,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChartComponent from "../../components/chart/chart";
import CardLineChart from "../../components/line/line";
import BaseCard from "../../components/shared/BaseCard";
import "./page.css"
interface LooseObject {
  [key: string]: any;
}
interface StatisticalItem {
  day: number;
  week: any;
  month: any;
  lastWeek: any;
  last30Days: any;
  totalCount: any;
}
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const statisticalList: StatisticalItem = useAppSelector(getStatisticalList);
  const monthlList: StatisticalItem = useAppSelector(getMonthList);
  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getStatistical());
      await dispatch(getMonth());
    };
    asyncCall();
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard>
          <div>
            <div className="card-box">
              <div className="card">
                <Typography className="card-title">Hôm nay</Typography>
                <div className="card-content">
                  <Typography className="card-number" sx={{ color: "#00933D" }}>{statisticalList?.day}</Typography>
                  <Typography className="card-access">Bài viết</Typography>
                </div>
              </div>
              <div className="card">
                <Typography className="card-title" >Tuần này</Typography>
                <div className="card-content">
                  <Typography className="card-number" sx={{ color: "#D9281C" }}> {statisticalList?.week}</Typography>
                  <Typography className="card-access">Bài viết</Typography>
                </div>
              </div>
              <div className="card">
                <Typography className="card-title">Tháng này</Typography>
                <div className="card-content">
                  <Typography className="card-number" sx={{ color: "#03C0A7" }}> {statisticalList?.last30Days}</Typography>
                  <Typography className="card-access">Bài viết</Typography>
                </div>
              </div>
              <div className="card">
                <Typography className="card-title">Tổng</Typography>

                <div className="card-content">
                  <Typography className="card-number" sx={{ color: "#FF7900" }}>
                    {statisticalList?.totalCount}
                  </Typography>
                  <Typography className="card-access">Bài viết</Typography>
                </div>

              </div>
            </div>
            <div className="container">
              <div className="article-section ">
                <div className="card-view-content">
                  <Typography className="card-view-content">Bài viết trong 7 ngày qua</Typography>
                  <ChartComponent data={statisticalList?.lastWeek} />
                </div>
              </div>
              <div className="sidebar">
                <div className="line">
                  <div className="card-view-content">
                    <Typography className="card-view-content">Bài viết trong 12 tháng gần nhất</Typography>
                    <CardLineChart data={statisticalList?.month} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </Grid>
    </Grid >
  );
};

export default Dashboard;
