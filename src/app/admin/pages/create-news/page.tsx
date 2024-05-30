"use client";

import { useState } from "react";
import { Grid, Tab, Tabs, Box, Button } from "@mui/material";
import BaseCard from "../../components/shared/BaseCard";
import Approval from "../../components/tabs/Approve/page";
import WaitForApproval from "../../components/tabs/Wait-for-approval/page";
import Refuse from "../../components/tabs/Refuse/page";
import { IconPlus } from "@tabler/icons-react";
import CreateNews from "../../components/form/CreateNews";
import Remove from "../../components/tabs/Remove/page";
import Publishing from "../../components/tabs/Publishing/page";

const News = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(false);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard
          title="Soạn tin"
          date={
            <Box>
              <Button
                variant="contained"
                color="success"
                size="small"
                aria-label="edit"
                title="Xem"
                onClick={openForm}
              >
                Thêm bản tin mới
                <IconPlus style={{ marginLeft: 5 }} />
              </Button>
            </Box>
          }
        >
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Chờ phê duyệt" />
              <Tab label="Đã duyệt" />
              <Tab label="Đã xuất bản" />
              <Tab label="Bị từ chối" />
              <Tab label="Đã gỡ" />
            </Tabs>

            <TabPanel value={value} index={0}>
              <WaitForApproval />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Approval />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Publishing />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Refuse />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Remove />
            </TabPanel>
          </div>
        </BaseCard>
      </Grid>
      <CreateNews open={isOpen} closeForm={closeForm} />
    </Grid>
  );
};

function TabPanel({ children, value, index }: any) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default News;
