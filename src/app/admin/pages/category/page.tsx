"use client";

import {
  deleteCategory,
  getCategory,
  getCategoryList,
} from "@/app/redux-store/category/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  IconEdit,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CreateCategory from "../../components/form/CreateCategory";
import UpdateCategory from "../../components/form/UpdateCategory";
import BaseCard from "../../components/shared/BaseCard";
interface CategoryItem {
  ID: number;
  TenDanhMuc: string;
  CreateBy: string;
  CreateDate: string;
  LastUpdate: string;
}
interface LooseObject {
  [key: string]: any;
}
const Category = () => {
  const dispatch = useAppDispatch();
  const categoryList: CategoryItem[] = useAppSelector(getCategoryList);
  const [categoryListState, setCategoryListState] = useState<CategoryItem[]>(
    []
  );

  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    ID: 0,
  });
  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getCategory());
    };
    asyncCall();
  }, []);
  useEffect(() => {
    if (categoryList) {
      setCategoryListState(categoryList);
    }
  }, [categoryList]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null
  );

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const openFormCreate = () => {
    setIsOpenCreate(true);
  };
  const closeFormCreate = () => {
    setIsOpenCreate(false);
  };
  const openFormUpdate = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsOpenUpdate(true);
  };
  const closeFormUpdate = () => {
    setIsOpenUpdate(false);
  };

  const handleDelete = async (category: any) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa danh mục này không!"
    );

    if (isConfirmed) {
      const ID = category;
      await dispatch(deleteCategory({ ID }));
      await dispatch(getCategory());
    }
  };
  const [isSearch, setIsSearch] = useState(false);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm.length > 0) {
      const filteredList = categoryList.filter((category) =>
        category.TenDanhMuc.toLowerCase().includes(searchTerm)
      );

      setCategoryListState(filteredList);
    } else {
      setCategoryListState(categoryList);
    }
  };
  const handleCloseSearch = () => {
    setIsSearch(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categoryListArray = Array.isArray(categoryListState)
    ? categoryListState
    : [];

  const totalPageCount = Math.ceil(categoryListArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategoryList = categoryListArray.slice(startIndex, endIndex);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Quản Lý Danh Mục">
          <TableContainer
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
              },
            }}
          >
            <Box>
              {isSearch && (
                <TextField
                  sx={{ width: 220 }}
                  id="standard-basic"
                  size="small"
                  label="Tìm kiếm theo danh mục"
                  variant="standard"
                  color="info"
                  onChange={handleSearch}
                />
              )}
              <IconButton
                aria-label="toggle search"
                color="inherit"
                aria-controls="search-menu"
                aria-haspopup="true"
                onClick={() =>
                  isSearch ? handleCloseSearch() : setIsSearch(true)
                }
                size="large"
              >
                {isSearch ? (
                  <IconX height="20" width="20" strokeWidth="1.5" />
                ) : (
                  <IconSearch height="20" width="20" strokeWidth="1.5" />
                )}
              </IconButton>
            </Box>
            <Box display={"flex"} justifyContent={"right"}>
              <Button
                variant="contained"
                color="success"
                aria-label="Reload"
                onClick={() => {
                  dispatch(getCategory());
                }}
              >
                Reload danh sách <IconReload style={{ marginLeft: 5 }} />
              </Button>
              <Button
                sx={{
                  marginLeft: 1,
                }}
                variant="contained"
                color="success"
                aria-label="delete"
                onClick={openFormCreate}
              >
                Thêm mới danh mục <IconPlus style={{ marginLeft: 5 }} />
              </Button>
            </Box>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 3,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      ID
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      Tên danh mục
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      Được thêm bởi
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      Ngày tạo
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      Lần cập nhật cuối
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {Array.isArray(currentCategoryList) &&
                currentCategoryList.length > 0 ? (
                <TableBody>
                  {currentCategoryList.map(
                    (category: CategoryItem, i: number) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {category.ID}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {category.TenDanhMuc}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {category.CreateBy}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {category.CreateDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {category.LastUpdate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            <Box display={"flex"} justifyContent={"right"}>
                              <Button
                                variant="contained"
                                color="success"
                                aria-label="edit"
                                onClick={() => openFormUpdate(category)}
                              >
                                Chỉnh sửa <IconEdit style={{ marginLeft: 5 }} />
                              </Button>
                              <Button
                                sx={{
                                  marginLeft: 1,
                                }}
                                variant="contained"
                                color="success"
                                aria-label="delete"
                                onClick={() => {
                                  handleDelete(category.ID);
                                }}
                              >
                                Xóa <IconTrash style={{ marginLeft: 5 }} />
                              </Button>
                            </Box>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              ) : null}
            </Table>
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPageCount}
                shape="rounded"
                variant="outlined"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </TableContainer>
        </BaseCard>
      </Grid>
      <CreateCategory
        open={isOpenCreate}
        closeForm={closeFormCreate}
        categoryList={categoryList}
      />
      <UpdateCategory
        open={isOpenUpdate}
        closeForm={closeFormUpdate}
        category={selectedCategory}
      />
    </Grid>
  );
};

export default Category;
