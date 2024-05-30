import React from "react";
// MUI imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  Collapse,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: NavGroup[];
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const [open, setOpen] = React.useState(false);

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "8px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: "#e8e8e8",
        color: "#570000",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#570000",
        "&:hover": {
          backgroundColor: "#450101",
          color: "white",
        },
      },
    },
  }));

  const handleItemClick = () => {
    setOpen(!open);
    localStorage.setItem('title', item.title || '');
  };

  return (
    <>
      <List component="div" disablePadding key={item.id}>
        <ListItemStyled>
          <ListItemButton
            component={Link}
            href={item.href}
            disabled={item.disabled}
            selected={pathDirect === item.href}
            target={item.external ? "_blank" : ""}
            onClick={handleItemClick}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              <>{item.title}</>
            </ListItemText>
            {item.children && (
              <ListItemIcon
                sx={{
                  minWidth: "36px",
                  p: "3px 0",
                  color: "inherit",
                }}
              >
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItemStyled>
      </List>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                level={level + 1}
                pathDirect={pathDirect}
                onClick={onClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavItem;
